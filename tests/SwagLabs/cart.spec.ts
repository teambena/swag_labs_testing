import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { InventoryPage } from "../../pages/inventory";
import { CartPage } from "../../pages/cart";
import { filters } from "../../utils/filters";

filters.validAccounts.forEach((data) => {
  test.describe(`cart verification - ${data.username}`, () => {
    let login;
    let inventoryPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {
      login = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);
      await login.gotoURL();
      await login.login(data.username, data.password);
      await inventoryPage.add_to_cart();
      await inventoryPage.goes_to_cart();
    });

    test("continue shopping", async ({ page }) => {
      await cartPage.goes_to_inventory_page();
      await expect(page).toHaveURL(/.*inventory/);
    });

    test("checkout", async ({ page }) => {
      await cartPage.goes_to_checkout_step_one_page();
      await expect(page).toHaveURL(/.*checkout-step-one/);
    });

    test("remove item", async ({ page }) => {
      await cartPage.remove_from_cart();
      const cart_list = cartPage.cart_list;
      expect(cart_list).not.toBeNull
    });
  });
});
