exports.CheckOutStepOnePage = class CheckOutStepOnePage {
  constructor(page) {
    this.page = page;
    this.firstname = page.locator('[data-test="firstName"]');
    this.lastname = page.locator('[data-test="lastName"]');
    this.zipcode = page.locator('[data-test="postalCode"]');
    this.continue = page.locator('[data-test="continue"]');
    this.cancel_button = page.locator('[data-test="cancel"]');
    this.error_message = page.locator('[data-test="error"]');
  }

  async cancel() {
    await this.cancel_button.click();
  }

  async filled_checkout_information(firstname, lastname, zipcode) {
    await this.firstname.fill(firstname);
    await this.lastname.fill(lastname);
    await this.zipcode.fill(zipcode);
    await this.continue.click();
  }
};
