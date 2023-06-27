import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { InventoryPage } from "../../pages/inventory";
import { CartPage } from "../../pages/cart";
import { CheckOutStepOnePage } from "../../pages/checkout_step_one";
import { CheckOutStepTwoPage } from "../../pages/checkout_step_two";
import { CheckOutCompletePage } from "../../pages/checkout_complete";
import { filters } from "../../utils/filters";
import user_checkout_information from "../../fixtures/user-checkout-information.json";

filters.validAccounts.forEach((data) => {
  test.describe(`checkout complete verification -${data.username}`, () => {
    let login;
    let inventoryPage;
    let cartPage;
    let checkOutStepOnePage;
    let checkOutStepTwoPage;
    let checkOutComplete;

    test.beforeEach(async ({ page }) => {
      login = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);
      checkOutStepOnePage = new CheckOutStepOnePage(page);
      checkOutStepTwoPage = new CheckOutStepTwoPage(page);
      checkOutComplete = new CheckOutCompletePage(page);
      await login.gotoURL();
      await login.login(data.username, data.password);
      await inventoryPage.add_to_cart();
      await inventoryPage.goes_to_cart();
      await cartPage.goes_to_checkout_step_one_page();
      await checkOutStepOnePage.filled_checkout_information(
        user_checkout_information.firstname,
        user_checkout_information.lastname,
        user_checkout_information.zipcode
      );
      await checkOutStepTwoPage.finish();
    });

    test("goes to inventory page", async ({ page }) => {
      await checkOutComplete.back_to_inventory_page();
      await expect(page).toHaveURL(/.*inventory/);
    });
  });
});
