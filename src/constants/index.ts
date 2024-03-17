import { GuestUser } from "../types";
import { randomIntFromInterval } from "../utils";

// config parameters
export const siteUrl = "https://www.etsy.com";
export const itemsCount = 10;
export const searchPhrase = "men's sneakers size " + randomIntFromInterval(3, 15);
export const jsonFilePath = "./storage/productsData/data.json";
export const imagesFilePath = "./storage/images/";
export const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

// selectors
export const captchaSliderSelector = ".sliderContainer div.slider";
export const searchInputElementSelector = "#global-enhancements-search-query";
export const resultsContainerSelector = "[data-results-grid-container]";
export const productCardSelector = "[data-listing-card-listing-image]";
export const currenctSymbolSelector = ".currency-symbol";
export const currencyValueSelector = ".currency-value";
export const productItemLinkSelector = ".listing-link";
export const itemOptionsElementSelector = '[data-selector="listing-page-variations"]';
export const optionsElementSelector = '[data-selector="listing-page-variation"]';
export const itemVariationSelector = "#variation-selector-";
export const titleSelector = "head > meta[property='og:title']";
export const descriptionSelector = "head > meta[property='og:description']";
export const priceAmountSelector = "head > meta[property='product:price:amount']";
export const priceCurrencySelector = "head > meta[property='product:price:currency']";
export const imageUrlSelector = "head > meta[property='og:image']";
export const addToBasketButtonSelector = "[data-add-to-cart-button] button";
export const proceedToCheckoutButtonSelector = "button.proceed-to-checkout";
export const continueAsGuestButtonSelector = "#join-neu-continue-as-guest button";
export const emailInputSelector = 'input[name="email_address"]';
export const confirmEmailInputSelector = 'input[name="email_address_confirmation"]';
export const fullNameInputSelector = 'input[name="name"]';
export const streetAddressInputSelector = 'input[name="first_line"]';
export const flatInputSelector = 'input[name="second_line"]';
export const postalCodeInputSelector = 'input[name="zip"]';
export const cityInputSelector = 'input[name="city"]';
export const phoneNumberInputSelector = 'input[name="phone"]';
export const continueToPaymentButonSelector = "#shipping-address-form button[data-selector-save-btn]";

// mocked guest user
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
