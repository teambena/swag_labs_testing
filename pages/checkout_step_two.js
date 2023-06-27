exports.CheckOutStepTwoPage = class CheckOutStepTwoPage {
  constructor(page) {
    this.page = page;
    this.cancel_button = page.locator('[data-test="cancel"]');
    this.finish_button = page.locator('[data-test="finish"]');
  }

  async cancel() {
    await this.cancel_button.click();
  }

  async finish() {
    await this.finish_button.click();
  }
};
