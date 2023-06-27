exports.CheckOutCompletePage = class CheckOutCompletePage {
  constructor(page) {
    this.page = page;
    this.back_to_product_button = page.locator('[data-test="back-to-products"]');
  }

  async back_to_inventory_page() {
    await this.back_to_product_button.click();
  }
};
