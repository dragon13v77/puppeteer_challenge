import { ElementHandle } from "puppeteer";
import { Page } from "puppeteer-extra-plugin/dist/puppeteer";

import {
  descriptionSelector,
  imageUrlSelector,
  itemOptionsElementSelector,
  itemVariationSelector,
  optionsElementSelector,
  priceAmountSelector,
  priceCurrencySelector,
  titleSelector,
} from "../constants";
import { ProductItem, VariationOption } from "../types";
import { saveProductDetails, sleep } from "../utils";

export async function handlePageDetails(data: ProductItem[], page: Page) {
  console.log("Processing page details: ");
  try {
    let index = 0;
    for (const item of data) {
      console.log("Processing product item ", index + 1);
      await sleep(3000);
      await page.goto(item.link);
      await sleep(4000);
      const pageDetails = await extractPageDetails(page);
      await saveProductDetails(data, pageDetails, index);
      index++;
    }
  } catch (error) {
    console.error("Error handling page details", error);
  }
}

async function getItemOptions(page: Page) {
  const itemOptionsElement = await getItemOptionsElement(page);
  const optionsElements = await getOptionsElements(itemOptionsElement);
  await itemOptionsElement.dispose();

  return optionsElements;
}

async function getItemOptionsElement(page: Page) {
  try {
    const elementHandle = await page.$(itemOptionsElementSelector);

    return elementHandle;
  } catch (error) {
    console.error("Error retrieving item options element", error);
  }
}

async function getOptionsElements(elementHandle: ElementHandle<Element>) {
  try {
    const childrens = await elementHandle.$$(optionsElementSelector);

    return childrens;
  } catch (error) {
    console.error("Error retrieving item options elements", error);
  }
}

async function extractItemVariations(page: Page) {
  const options: VariationOption[][] = [];

  try {
    console.log("Extracting variation options.");
    const optionsElements = await getItemOptions(page);

    for (let i = 0; i < optionsElements.length; i++) {
      const variationOptions: VariationOption[] = await optionsElements[i].$$eval(`${itemVariationSelector}${i} option`, (el) =>
        el.map((option) => {
          return {
            id: option.value,
            value: option.innerText.replace(/\\n/g, "").trim(),
          };
        })
      );
      options.push(variationOptions);
      await optionsElements[i].dispose();
    }

    return options;
  } catch (error) {
    console.error("Error extracting item variations", error);
  }
}

async function extractPageDetails(page: Page): Promise<ProductItem> {
  try {
    const title = await page.$eval(titleSelector, (el) => el.content);
    const description = await page.$eval(descriptionSelector, (el) => el.content);
    const priceAmount = await page.$eval(priceAmountSelector, (el) => el.content);
    const priceCurrency = await page.$eval(priceCurrencySelector, (el) => el.content);
    const imageUrl = await page.$eval(imageUrlSelector, (el) => el.content);
    const itemOptions = await extractItemVariations(page);

    const pageDetails = {
      title,
      description,
      priceAmount,
      priceCurrency,
      imageUrl,
      options: itemOptions,
    } as ProductItem;

    return pageDetails;
  } catch (error) {
    console.error("Error extracting page details", error);
  }
}
