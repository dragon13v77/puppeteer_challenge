import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

// Another way to initialise page and browser via singleton.
// const {page, browser} = await (await BrowserPageFactory).getInstance();
export const BrowserPageFactory = (async function () {
  class BrowserPageClass {
    browser: Browser;
    page: Page;

    constructor(browser: Browser, page: Page) {
      this.browser = browser;
      this.page = page;
    }
  }

  let instance: BrowserPageClass;

  return {
    getInstance: async function () {
      if (instance == null) {
        puppeteer.use(StealthPlugin());
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        instance = new BrowserPageClass(browser, page);
        instance.constructor = null;
      }
      return instance;
    },
  };
})();
