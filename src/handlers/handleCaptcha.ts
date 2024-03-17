import { Page } from "puppeteer-extra-plugin/dist/puppeteer";

import { sleep } from "../utils";
import { captchaSliderSelector } from "../constants";

export async function handleCaptcha(page: Page) {
  try {
    console.log("Processing captcha");
    const frame = await page.waitForSelector("iframe");
    const frameContent = await frame?.contentFrame();

    await frameContent?.waitForSelector(captchaSliderSelector, { timeout: 5000 });
    const slider = await frameContent?.$(captchaSliderSelector);

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
