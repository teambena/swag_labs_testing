import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { InventoryPage } from "../../pages/inventory";
import { filters } from "../../utils/filters";

filters.validAccounts.forEach((data) => {
  test.describe(`inventory verification - ${data.username}`, () => {
    let login;
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
      login = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      await login.gotoURL();
      await login.login(data.username, data.password);
    });

    test("add to cart", async ({ page }) => {
      await inventoryPage.add_to_cart();
      const cart_icon_badge = inventoryPage.cart_icon_badge;
      await expect(cart_icon_badge).toContainText("1");
    });

    test("remove from cart", async ({ page }) => {
      await inventoryPage.add_to_cart();
      await inventoryPage.remove_from_cart();
      const add_to_cart_button = inventoryPage.add_to_cart_button;
      await expect(add_to_cart_button).toContainText("Add to cart");
    });

    test("goes to cart", async ({ page }) => {
      await inventoryPage.goes_to_cart();
      await expect(page).toHaveURL(/.*cart/);
    });

    test("goes to inventory item", async ({ page }) => {
      await inventoryPage.goes_to_inventory_item();
      await expect(page).toHaveURL(
        "https://qa-challenge.codesubmit.io/inventory-item.html?id=4"
      );
    });

    test("logout", async ({ page }) => {
      await inventoryPage.logout();
      await expect(page).toHaveURL("https://qa-challenge.codesubmit.io/");
    });
  });
});
