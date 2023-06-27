exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.login_button = page.locator('[data-test="login-button"]');
    this.error_message = page.locator('[data-test="error"]');
  }

  async gotoURL() {
    await this.page.goto("https://qa-challenge.codesubmit.io/");
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.login_button.click();
  }
};
