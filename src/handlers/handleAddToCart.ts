import { Page } from "puppeteer-extra-plugin/dist/puppeteer";

import { itemOptionsElementSelector, itemVariationSelector, optionsElementSelector } from "../constants";
import { ProductItem } from "../types";
import { getRandomProductItem, getRandomProductItemOption, randomIntFromInterval, sleep } from "../utils";

export async function handleAddToCart(page: Page) {
  const randomProductItem = await getRandomProductItem();
  await sleep(3000);
  await goToProductPage(randomProductItem, page);
  await sleep(3000);
  await selectOptions(randomProductItem, page);
  await sleep(3000);
  await handleAddTobasket(page);
  await sleep(5000);
  await handleProceedToCheckout(page);
}

async function getItemOptions(page: Page) {
  const itemOptionsElement = await page.$(itemOptionsElementSelector);
  const optionsElements = await itemOptionsElement.$$(optionsElementSelector);
  await itemOptionsElement.dispose();

  return optionsElements;
}

async function selectOptions(productItem: ProductItem, page: Page) {
  try {
    const itemOptions = await getItemOptions(page);
    for (let index = 0; index < itemOptions.length; index++) {
      const itemToSelect = getRandomProductItemOption(productItem, index);
      await sleep(3000);
      const selectElement = await page.$(`${itemVariationSelector}${index}`);
      const valueToSelect = productItem.options[index][itemToSelect].id;
      await selectElement.click({ delay: randomIntFromInterval(600, 1000) });
      await selectElement.select(valueToSelect);
      await selectElement.dispose();
    }
  } catch (error) {
    console.error("Error selecting option", error);
  }
}

async function goToProductPage(productItem: ProductItem, page: Page) {
  try {
    await page.goto(productItem.link);
  } catch (error) {
    console.error("Error navigating to product page", error);
  }
}

async function handleAddTobasket(page: Page) {
  try {
    const addToBasketButton = await page.$("[data-add-to-cart-button] button");
    await addToBasketButton.click({ delay: randomIntFromInterval(600, 1000) });
  } catch (error) {
    console.error("Error handling add to basket", error);
  }
}

async function handleProceedToCheckout(page: Page) {
  try {
    console.log("processing add to cart.");

    const proceedToCheckoutButton = await page.$("button.proceed-to-checkout");
    await proceedToCheckoutButton.click({ delay: randomIntFromInterval(600, 1000) });
    await sleep(4000);

    const continueAsGuestButton = await page.$("#join-neu-continue-as-guest button");
    await continueAsGuestButton.click({ delay: randomIntFromInterval(600, 1000) });
    await page.waitForNavigation();
    await sleep(1000);
  } catch (error) {
    console.error("Error handling proceed to checkout", error);
  }
}
