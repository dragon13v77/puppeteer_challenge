import { randomIntFromInterval, sleep } from "../utils";
import { searchInputElementSelector, searchPhrase } from "../constants";
import { Page } from "puppeteer-extra-plugin/dist/puppeteer";

export async function handleSearchInput(page: Page) {
  try {
    const elementHandle = await page.waitForSelector(searchInputElementSelector);
    await sleep(2000);
    await elementHandle.type(searchPhrase, { delay: randomIntFromInterval(150, 400) });
    await elementHandle.press("Enter", { delay: randomIntFromInterval(400, 800) });
    await elementHandle.dispose();
    await page.waitForNavigation();
  } catch (error) {
    console.error("Error handling search input", error);
  }
}
