import { GuestUser } from "../types";
import { randomIntFromInterval } from "../utils";

export const siteUrl = "https://www.etsy.com";
export const itemsCount = 10;
export const searchPhrase = "mans shoes size " + randomIntFromInterval(5, 50);
export const jsonFilePath = "./storage/productsData/data.json";
export const imagesFilePath = "./storage/images/";
export const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

export const searchInputElementSelector = "#global-enhancements-search-query";
export const resultsContainerAttribute = "data-results-grid-container";
export const itemOptionsElementSelector = '[data-selector="listing-page-variations"]';
export const optionsElementSelector = '[data-selector="listing-page-variation"]';
export const itemVariationSelector = "#variation-selector-";
export const titleSelector = "head > meta[property='og:title']";
export const descriptionSelector = "head > meta[property='og:description']";
export const priceAmountSelector = "head > meta[property='product:price:amount']";
export const priceCurrencySelector = "head > meta[property='product:price:currency']";
export const imageUrlSelector = "head > meta[property='og:image']";

export const guestUser: GuestUser = {
  email: "guest_user@test.com",
  country: {
    id: 189,
    name: "Serbia",
  },
  fullName: "Pera Peric",
  streetAddress: "Ulica Nova",
  city: "Novi Sad",
  postalCode: "21000",
  phoneNumber: "+381444555666",
};
