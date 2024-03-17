import fs from "fs-extra";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { jsonFilePath } from "../constants";
import { ProductItem } from "../types";

export const initBrowserPage = async () => {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ["--enable-automation"],
  });
  const page = await browser.newPage();
  return { page, browser };
};

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

// min and max included
export const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const saveProductItems = async (data: ProductItem[]) => {
  try {
    const parsedData = JSON.stringify(data, null, 4);
    await fs.outputFile(jsonFilePath, parsedData);
  } catch (error) {
    console.error("Error while saving product items", error);
  }
};

export const saveProductDetails = async (data: ProductItem[], details: ProductItem, index: number) => {
  data[index].description = details.description;
  data[index].imageUrl = details.imageUrl;
  data[index].options = details.options;

  try {
    const parsedData = JSON.stringify(data, null, 4);
    await fs.outputFile(jsonFilePath, parsedData);
  } catch (error) {
    console.error("Error while saving product details", error);
  }
};

export const getRandomProductItem = async () => {
  const data: ProductItem[] = await fs.readJson(jsonFilePath);
  const productItem = data[randomIntFromInterval(0, data.length - 1)];

  return productItem;
  //return hardcodedProduct as ProductItem;
};

export const getRandomProductItemOption = (productItem: ProductItem, optionIndex: number) => {
  const itemOptionIndex = randomIntFromInterval(1, productItem.options[optionIndex].length - 1);

  return itemOptionIndex;
};
