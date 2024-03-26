import { Page } from "puppeteer-extra-plugin/dist/puppeteer";

import {
  cityInputSelector,
  confirmEmailInputSelector,
  continueToPaymentButonSelector,
  emailInputSelector,
  flatInputSelector,
  fullNameInputSelector,
  guestUser,
  phoneNumberInputSelector,
  postalCodeInputSelector,
  streetAddressInputSelector,
} from "../constants";
import { randomIntFromInterval } from "../utils";

export async function handleContinueToPayment(page: Page) {
  console.log("Processing continue to payment.");

  try {
    const email = await page.$(emailInputSelector);
    await email?.type(guestUser.email, { delay: randomIntFromInterval(100, 250) });
    await email?.dispose();

    const emailConfirm = await page.$(confirmEmailInputSelector);
    await emailConfirm?.type(guestUser.email, { delay: randomIntFromInterval(100, 250) });
    await emailConfirm?.dispose();

    const fullName = await page.$(fullNameInputSelector);
    await fullName?.type(guestUser.fullName, { delay: randomIntFromInterval(100, 250) });
    await fullName?.dispose();

    const streetAddress = await page.$(streetAddressInputSelector);
    await streetAddress?.type(guestUser.streetAddress, { delay: randomIntFromInterval(100, 250) });
    await streetAddress?.dispose();

    if (guestUser.flat) {
      const flat = await page.$(flatInputSelector);
      await flat?.type(guestUser.flat, { delay: randomIntFromInterval(100, 250) });
      await flat?.dispose();
    }

    if (guestUser.postalCode) {
      const postalCode = await page.$(postalCodeInputSelector);
      await postalCode?.type(guestUser.postalCode, { delay: randomIntFromInterval(100, 250) });
      await postalCode?.dispose();
    }

    const city = await page.$(cityInputSelector);
    await city?.type(guestUser.city, { delay: randomIntFromInterval(100, 250) });
    await city?.dispose();

    if (guestUser.phoneNumber) {
      const phoneNumber = await page.$(phoneNumberInputSelector);
      await phoneNumber?.type(guestUser.phoneNumber, { delay: randomIntFromInterval(100, 250) });
      await phoneNumber?.dispose();
    }

    const continueToPaymentButton = await page.$(continueToPaymentButonSelector);
    continueToPaymentButton?.click();
    await continueToPaymentButton?.dispose();

    await page.waitForNavigation();
  } catch (error) {
    console.error("Error handling continue to payment.", error);
  }
}
