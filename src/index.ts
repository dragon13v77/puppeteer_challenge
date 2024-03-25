import { siteUrl } from "./constants";
import { initBrowserPage, sleep } from "./utils";
import { handleSearchInput } from "./handlers/handleSearchInput";
import { handleResultItems } from "./handlers/handleResultItems";
import { handlePageDetails } from "./handlers/handlePageDetails";
import { handleAddToCart } from "./handlers/handleAddToCart";
import { handleContinueToPayment } from "./handlers/handleContinueToPayment";
import { handleCaptcha } from "./handlers/handleCaptcha";

(async () => {
  const { page, browser } = await initBrowserPage();
  await page.goto(siteUrl, { waitUntil: "networkidle0" });
  await sleep(4000);
  await handleCaptcha(page);
  await sleep(4000);
  await handleSearchInput(page);
  const productItems = await handleResultItems(page);
  await handlePageDetails(productItems, page);
  await handleAddToCart(page);
  await handleContinueToPayment(page);
  await sleep(4000);
  await browser.close();
})();
