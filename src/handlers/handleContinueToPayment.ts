import { Page } from "puppeteer-extra-plugin/dist/puppeteer";

import { guestUser } from "../constants";
import { randomIntFromInterval } from "../utils";

export async function handleContinueToPayment(page: Page) {
  console.log("Processing continue to payment.");

  try {
    const email = await page.$('input[name="email_address"]');
    await email?.type(guestUser.email, { delay: randomIntFromInterval(100, 250) });

    const emailConfirm = await page.$('input[name="email_address_confirmation"]');
    await emailConfirm?.type(guestUser.email, { delay: randomIntFromInterval(100, 250) });

    const fullName = await page.$('input[name="name"]');
    await fullName?.type(guestUser.fullName, { delay: randomIntFromInterval(100, 250) });

    const streetAddress = await page.$('input[name="first_line"]');
    await streetAddress?.type(guestUser.streetAddress, { delay: randomIntFromInterval(100, 250) });

    if (guestUser.flat) {
      const flat = await page.$('input[name="second_line"]');
      await flat?.type(guestUser.flat, { delay: randomIntFromInterval(100, 250) });
    }

    if (guestUser.postalCode) {
      const postalCode = await page.$('input[name="zip"]');
      await postalCode?.type(guestUser.postalCode, { delay: randomIntFromInterval(100, 250) });
    }

    const city = await page.$('input[name="city"]');
    await city?.type(guestUser.city, { delay: randomIntFromInterval(100, 250) });

    if (guestUser.phoneNumber) {
      const phoneNumber = await page.$('input[name="phone"]');
      await phoneNumber?.type(guestUser.phoneNumber, { delay: randomIntFromInterval(100, 250) });
    }

    const continueToPaymentButton = await page.$("#shipping-address-form button[data-selector-save-btn]");
    continueToPaymentButton?.click({ delay: randomIntFromInterval(600, 1000) });

    await page.waitForNavigation();
  } catch (error) {
    console.error("Error handling continue to paymane.", error);
  }
}
