import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { filters, finds } from "../../utils/filters";

test.describe("login verification", () => {
  let login;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.gotoURL();
  });

  test.describe("valid login account", () => {
    filters.validAccounts.forEach((data) => {
      test(`login with ${data.username}`, async ({ page }) => {
        await login.login(data.username, data.password);
        await expect(page).toHaveURL(/.*inventory/);
      });
    });
  });

  test.describe("invalid login account", () => {
    test("login with locked account", async ({ page }) => {
      await login.login(
        finds.lockedUsername?.username,
        finds.lockedUsername?.password
      );
      const error_message = login.error_message;
      await expect(error_message).toContainText(
        "Sorry, this user has been locked out."
      );
    });

    test("login with incorrect username", async ({ page }) => {
      await login.login(
        finds.incorrectedUsername?.username,
        finds.incorrectedUsername?.password
      );
      const error_message = login.error_message;
      await expect(error_message).toContainText(
        "Username and password do not match any user in this service"
      );
    });

    test("login with incorrect password", async ({ page }) => {
      await login.login(
        finds.incorrectedPassword?.username,
        finds.incorrectedPassword?.password
      );
      const error_message = login.error_message;
      await expect(error_message).toContainText(
        "Username and password do not match any user in this service"
      );
    });

    test("login with empty username", async ({ page }) => {
      await login.login(
        finds.emptyUsername?.username,
        finds.emptyUsername?.password
      );
      const error_message = login.error_message;
      await expect(error_message).toContainText("Username is required");
    });

    test("login with empty password", async ({ page }) => {
      await login.login(
        finds.emptyPassword?.username,
        finds.emptyPassword?.password
      );
      const error_message = login.error_message;
      await expect(error_message).toContainText("Password is required");
    });
  });
});
