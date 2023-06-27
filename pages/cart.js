exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.continue_shopping_button = page.locator('[data-test="continue-shopping"]');
    this.checkout_button = page.locator('[data-test="checkout"]');
    this.remove_from_cart_button = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.cart_icon = page.locator("xpath=//a[@class='shopping_cart_link']");
    this.cart_icon_badge = page.locator("xpath=//span[@class='shopping_cart_badge']");
    this.cart_list = page.locator("xpath=//div[@class='cart_list']");
  }

  async goes_to_inventory_page() {
    await this.continue_shopping_button.click();
  }

  async goes_to_checkout_step_one_page() {
    await this.checkout_button.click();
  }

  async remove_from_cart() {
    await this.remove_from_cart_button.click();
  }
};
