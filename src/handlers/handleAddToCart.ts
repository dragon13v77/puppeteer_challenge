import { Page } from "puppeteer-extra-plugin/dist/puppeteer";

import {
  addToBasketButtonSelector,
  continueAsGuestButtonSelector,
  itemOptionsElementSelector,
  itemVariationSelector,
  optionsElementSelector,
  proceedToCheckoutButtonSelector,
} from "../constants";
import { getRandomProductItem, getRandomProductItemOption, randomIntFromInterval, sleep } from "../utils";
import { ProductItem } from "../types";

export async function handleAddToCart(page: Page) {
  console.log("Processing add to cart.");

  try {
    const randomProductItem = await getRandomProductItem();

    if (!randomProductItem) {
      throw new Error("Cold not get random product item");
    }
    await sleep(3000);
    await goToProductPage(randomProductItem, page);
    await sleep(3000);
    await selectOptions(randomProductItem, page);
    await sleep(3000);
    await handleAddTobasket(page);
    await sleep(5000);
    await handleProceedToCheckout(page);
  } catch (error) {
    console.error("Error handling add to cart", error);
  }
}

async function getItemOptionsCount(page: Page) {
  try {
    const itemOptionsElement = await page.$(itemOptionsElementSelector);
    const optionsElements = await itemOptionsElement?.$$(optionsElementSelector);
    const count = optionsElements?.length ?? 0;
    await itemOptionsElement?.dispose();
    if (optionsElements) {
      for (let index = 0; index < count; index++) {
        await optionsElements[index].dispose();
      }
    }

    return count;
  } catch (error) {
    console.error("Error getting item options", error);
    return 0;
  }
}

async function selectOptions(productItem: ProductItem, page: Page) {
  try {
    const itemOptionsCount = await getItemOptionsCount(page);

    if (itemOptionsCount === 0) {
      throw new Error("Item options does not exists.");
    }
    for (let index = 0; index < itemOptionsCount; index++) {
      const itemToSelect = getRandomProductItemOption(productItem, index);
      await sleep(3000);
      const selectElement = await page.$(`${itemVariationSelector}${index}`);

      const valueToSelect = productItem?.options?.[index][itemToSelect].id;

      if (!valueToSelect) throw new Error("No value to select.");

      await selectElement?.click({ delay: randomIntFromInterval(600, 1000) });
      await selectElement?.select(valueToSelect);
      await selectElement?.dispose();
    }
  } catch (error) {
    console.error("Error selecting option", error);
  }
}

async function goToProductPage(productItem: ProductItem, page: Page) {
  console.log("Navigating to random product page.");

  try {
    if (!productItem.link) {
      throw new Error("Item link does not exist.");
    }
    await page.goto(productItem.link);
  } catch (error) {
    console.error("Error navigating to product page", error);
  }
}

async function handleAddTobasket(page: Page) {
  try {
    const addToBasketButton = await page.$(addToBasketButtonSelector);
    await addToBasketButton?.click({ delay: randomIntFromInterval(600, 1000) });
  } catch (error) {
    console.error("Error handling add to basket", error);
  }
}

async function handleProceedToCheckout(page: Page) {
  try {
    const proceedToCheckoutButton = await page.$(proceedToCheckoutButtonSelector);
    await proceedToCheckoutButton?.click({ delay: randomIntFromInterval(600, 1000) });
    await sleep(4000);

    const continueAsGuestButton = await page.$(continueAsGuestButtonSelector);
    await continueAsGuestButton?.click({ delay: randomIntFromInterval(600, 1000) });
    await page.waitForNavigation();
    await sleep(1000);
  } catch (error) {
    console.error("Error handling proceed to checkout", error);
  }
}
