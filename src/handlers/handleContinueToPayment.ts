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

    const emailConfirm = await page.$(confirmEmailInputSelector);
    await emailConfirm?.type(guestUser.email, { delay: randomIntFromInterval(100, 250) });

    const fullName = await page.$(fullNameInputSelector);
    await fullName?.type(guestUser.fullName, { delay: randomIntFromInterval(100, 250) });

    const streetAddress = await page.$(streetAddressInputSelector);
    await streetAddress?.type(guestUser.streetAddress, { delay: randomIntFromInterval(100, 250) });

    if (guestUser.flat) {
      const flat = await page.$(flatInputSelector);
      await flat?.type(guestUser.flat, { delay: randomIntFromInterval(100, 250) });
    }

    if (guestUser.postalCode) {
      const postalCode = await page.$(postalCodeInputSelector);
      await postalCode?.type(guestUser.postalCode, { delay: randomIntFromInterval(100, 250) });
    }

    const city = await page.$(cityInputSelector);
    await city?.type(guestUser.city, { delay: randomIntFromInterval(100, 250) });

    if (guestUser.phoneNumber) {
      const phoneNumber = await page.$(phoneNumberInputSelector);
      await phoneNumber?.type(guestUser.phoneNumber, { delay: randomIntFromInterval(100, 250) });
    }

    const continueToPaymentButton = await page.$(continueToPaymentButonSelector);
    continueToPaymentButton?.click({ delay: randomIntFromInterval(600, 1000) });

    await page.waitForNavigation();
  } catch (error) {
    console.error("Error handling continue to paymane.", error);
  }
}
