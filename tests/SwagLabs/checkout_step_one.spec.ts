import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { InventoryPage } from "../../pages/inventory";
import { CartPage } from "../../pages/cart";
import { CheckOutStepOnePage } from "../../pages/checkout_step_one";
import { filters } from "../../utils/filters";
import user_checkout_information from "../../fixtures/user-checkout-information.json";

filters.validAccounts.forEach((data) => {
  test.describe(`checkout step one verification - - ${data.username}`, () => {
    let login;
    let inventoryPage;
    let cartPage;
    let checkOutStepOnePage;

    test.beforeEach(async ({ page }) => {
      login = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);
      checkOutStepOnePage = new CheckOutStepOnePage(page);

      await login.gotoURL();
      await login.login(data.username, data.password);
      await inventoryPage.add_to_cart();
      await inventoryPage.goes_to_cart();
      await cartPage.goes_to_checkout_step_one_page();
    });

    test("cancel", async ({ page }) => {
      await checkOutStepOnePage.cancel();
      await expect(page).toHaveURL(/.*cart/);
    });

    test.describe("continue with valid checkout information", () => {
      test("input valid firstname, lastname and zipcode", async ({ page }) => {
        await checkOutStepOnePage.filled_checkout_information(
          user_checkout_information.firstname,
          user_checkout_information.lastname,
          user_checkout_information.zipcode
        );
        await expect(page).toHaveURL(/.*checkout-step-two/);
      });
    });

    test.describe("continue with invalid checkout information", () => {
      test("input empty firstname", async ({ page }) => {
        await checkOutStepOnePage.filled_checkout_information(
          "",
          user_checkout_information.lastname,
          user_checkout_information.zipcode
        );
        const error_message = checkOutStepOnePage.error_message;
        await expect(error_message).toContainText("First Name is required");
      });

      test("input empty lastname", async ({ page }) => {
        await checkOutStepOnePage.filled_checkout_information(
          user_checkout_information.firstname,
          "",
          user_checkout_information.zipcode
        );
        const error_message = checkOutStepOnePage.error_message;
        await expect(error_message).toContainText("Last Name is required");
      });

      test("input empty zipcode", async ({ page }) => {
        await checkOutStepOnePage.filled_checkout_information(
          user_checkout_information.firstname,
          user_checkout_information.lastname,
          ""
        );
        const error_message = checkOutStepOnePage.error_message;
        await expect(error_message).toContainText("Postal Code is required");
      });
    });
  });
});
