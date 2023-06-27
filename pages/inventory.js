exports.InventoryPage = class InventoryPage {
  constructor(page) {
    this.page = page;
    this.add_to_cart_button = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.add_to_cart_icon = page.locator("xpath=//a[@class='shopping_cart_link']");
    this.add_to_cart_icon_badge = page.locator("xpath=//span[@class='shopping_cart_badge']");
    this.remove_from_cart_button = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.inventory_item = page.locator("#item_4_title_link");
    this.cart_icon_badge = page.locator("xpath=//span[@class='shopping_cart_badge']");
    this.menu_button = page.getByRole("button", { name: "Open Menu" });
    this.logout_link = page.getByRole("link", { name: "Logout" });
  }

  async add_to_cart() {
    await this.add_to_cart_button.click();
  }

  async remove_from_cart() {
    await this.remove_from_cart_button.click();
  }

  async goes_to_cart() {
    await this.add_to_cart_icon.click();
  }

  async goes_to_inventory_item() {
    await this.inventory_item.click();
  }

  async logout() {
    await this.menu_button.click();
    await this.logout_link.click();
  }
};
