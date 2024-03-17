import { ProductItem } from "../types";
import { itemsCount, resultsContainerAttribute } from "../constants";
import { saveProductItems, sleep } from "../utils";
import { Page } from "puppeteer-extra-plugin/dist/puppeteer";

export async function handleResultItems(page: Page) {
  console.log("Processing search item results.");

  const data: ProductItem[] = [];

  try {
    await sleep(2000);
    const elementHandle = await page.$(`[${resultsContainerAttribute}]`);
    await sleep(2000);
    const childrens = await elementHandle?.$$("li");

    if (childrens) {
      const count = childrens.length >= itemsCount ? itemsCount : childrens.length;
      await elementHandle?.dispose();

      for (let i = 0; i < count; i++) {
        const title = await childrens[i].$eval("[data-listing-card-listing-image]", (el) => el.getAttribute("alt"));
        const priceCurrency = await childrens[i].$eval(".currency-symbol", (el) => (el as HTMLElement).innerText);
        const priceAmount = await childrens[i].$eval(".currency-value", (el) => (el as HTMLElement).innerText);
        const link = await childrens[i].$eval(".listing-link", (el) => (el as HTMLAnchorElement).href);
        await childrens[i].dispose();
        data.push({
          title: title ?? "",
          priceCurrency,
          priceAmount,
          link,
        });
      }
    }
  } catch (error) {
    console.error("ERROR FOUNDING CHILDREN", error);
  } finally {
    await saveProductItems(data);

    return data;
  }
}
