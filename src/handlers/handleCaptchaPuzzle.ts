import { Page } from "puppeteer-extra-plugin/dist/puppeteer";
import { Frame } from "puppeteer";
import Jimp from "jimp";
import pixelmatch from "pixelmatch";
import { cv } from "opencv-wasm";

import { sleep } from "../utils";
import { captchaSliderSelector, imagesFilePath } from "../constants";
import { CaptchaImages } from "../types";

export async function handleCaptcha(page: Page) {
  try {
    console.log("Processing captcha");
    const frame = await page.waitForSelector("iframe");
    const frameContent = await frame?.contentFrame();

    if (!frameContent) {
      throw new Error("No frame content.");
    }

    const images = await getCaptchaImages(frameContent);
    await images.captcha.writeAsync(`${imagesFilePath}captcha.png`);
    await images.original.writeAsync(`${imagesFilePath}original.png`);
    await sleep(1000);
    console.log("Captcha images found");

    console.log("Create merged image");
    const mergedImage = await createMergedImage();
    console.log("Merged image returned");
    await mergedImage.writeAsync(`${imagesFilePath}mergedImage.png`);
    console.log("Merged image saved");

    const diffImages = {
      original: mergedImage,
      captcha: images.captcha,
    } as CaptchaImages;

    // get diff image
    const diffImage = await getDiffImage(diffImages);
    await diffImage.writeAsync(`${imagesFilePath}diff.png`);
    console.log("Diff image created");

    await frameContent.waitForSelector(captchaSliderSelector, { timeout: 5000 });
    const slider = await frameContent.$(captchaSliderSelector);
    await sleep(500);
    let bounding_box = await slider?.boundingBox();
    if (bounding_box) {
      let x = bounding_box.x + bounding_box.width / 2;
      let y = bounding_box.y + bounding_box.height / 2;
      await page.mouse.move(x, y, { steps: 25 });
      await page.mouse.down();
      await sleep(250);
      await page.mouse.move(x + 150, y, { steps: 25 });
      await sleep(250);
      await page.mouse.up();
      await sleep(250);
    }

    await frame?.dispose();
    await slider?.dispose();
  } catch (error) {
    console.error("Captcha not found, continuing regularry.", error);
  }
}

// extract the images
async function getCaptchaImages(frameContent: Frame) {
  const images = await frameContent.$$eval("#captcha__puzzle canvas", (canvases) => {
    return canvases.map((canvas) => {
      // This will get the base64 image data from the html canvas. The replace function simply strip the "data:image" prefix.
      return canvas.toDataURL().replace(/^data:image\/\w+;base64,/, "");
    });
  });

  // For each base64 string create a Javascript buffer.
  const buffers = images.map((img) => Buffer.from(img, "base64"));

  // And read each buffer into a Jimp image.
  return {
    captcha: await Jimp.read(buffers[0]),
    original: await Jimp.read(buffers[1]),
  };
}

async function getDiffImage(images: CaptchaImages) {
  console.log("Creating diff image");
  const { width, height } = images.original.bitmap;

  // Use the pixelmatch package to create an image diff
  const diffImage = new Jimp(width, height);
  pixelmatch(images.captcha.bitmap.data, images.original.bitmap.data, diffImage.bitmap.data, width, height, {
    includeAA: true,
    threshold: 0.1,
  });

  // Use opencv to make the diff result more clear
  const src = cv.matFromImageData(diffImage.bitmap);
  const dst = new cv.Mat();
  const kernel = cv.Mat.ones(5, 5, cv.CV_8UC1);
  const anchor = new cv.Point(-1, -1);
  cv.threshold(src, dst, 127, 255, cv.THRESH_BINARY);
  cv.erode(dst, dst, kernel, anchor, 1);
  cv.dilate(dst, dst, kernel, anchor, 1);

  return new Jimp({
    width: dst.cols,
    height: dst.rows,
    data: Buffer.from(dst.data),
  });
}

async function createMergedImage() {
  console.log("Creating merged image");

  const captchaImage = await Jimp.read(`${imagesFilePath}captcha.png`);
  const originalImage = await Jimp.read(`${imagesFilePath}original.png`);
  const mergedImage = captchaImage.composite(originalImage, 0, 0);

  return mergedImage;
}
