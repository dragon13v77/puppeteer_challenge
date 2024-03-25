/**
 * @name Etsy product search
 * @desc Searches Etsy.com for a product and checks if the results show up
 */
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Browser, Page } from "puppeteer-extra-plugin/dist/puppeteer";

import {
  currenctSymbolSelector,
  currencyValueSelector,
  productCardSelector,
  productItemLinkSelector,
  resultsContainerSelector,
  searchInputElementSelector,
  searchPhrase,
  siteUrl,
} from "../constants";
import { randomIntFromInterval, sleep } from "../utils";
import { ProductItem } from "../types";

let browser: Browser;
let page: Page;

beforeAll(async () => {
  puppeteer.use(StealthPlugin());
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
});

describe("Etsy Homepage", () => {
  test("has search input", async () => {
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(siteUrl, { waitUntil: "networkidle0" });
    const searchInput = await page.$(searchInputElementSelector);
    expect(searchInput).toBeTruthy();
  });

  test("shows search results after search input", async () => {
    const elementHandle = await page.waitForSelector(searchInputElementSelector);
    await elementHandle?.type(searchPhrase, { delay: randomIntFromInterval(150, 400) });
    await elementHandle?.press("Enter", { delay: randomIntFromInterval(400, 800) });
    await elementHandle?.dispose();
    await page.waitForNavigation();
    await sleep(2000);
    const resultsContainer = await page.$(resultsContainerSelector);
    expect(resultsContainer).toBeTruthy();
  }, 20000);

  test("extract data from one product", async () => {
    const data: ProductItem[] = [];
    const resultsContainer = await page.$(resultsContainerSelector);
    const childrens = await resultsContainer?.$$("li");
    if (!childrens) {
      return data;
    }

    const count = 3;
    await resultsContainer?.dispose();

    for (let i = 0; i < count; i++) {
      const title = await childrens[i].$eval(productCardSelector, (el) => el.getAttribute("alt"));
      const priceCurrency = await childrens[i].$eval(currenctSymbolSelector, (el) => (el as HTMLElement).innerText);
      const priceAmount = await childrens[i].$eval(currencyValueSelector, (el) => (el as HTMLElement).innerText);
      const link = await childrens[i].$eval(productItemLinkSelector, (el) => (el as HTMLAnchorElement).href);
      await childrens[i].dispose();
      data.push({
        title: title ?? "",
        priceCurrency,
        priceAmount,
        link,
      });
    }

    expect(data).toHaveLength(count);
    expect(data[0]).toMatchObject(
      expect.objectContaining({
        title: expect.any(String),
        priceCurrency: expect.any(String),
        priceAmount: expect.any(String),
        link: expect.any(String),
      })
    );
  }, 20000);

  afterAll(async () => {
    await browser.close();
  });
});
