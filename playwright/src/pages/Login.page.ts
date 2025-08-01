import { CommerceBasePage } from './CommerceBase.page';

export class LoginPage extends CommerceBasePage {
  readonly _url = '/';

  emailInput = this.page.locator('[data-test-id="email-input"]');
  passwordInput = this.page.locator('[data-test-id="password-input"]');
  signInButton = this.page.locator('[data-test-id="login-button"]');
  failedLoginMessage = this.page.locator('[data-test-id="login-error"]');
  loginContainer = this.page.locator('[data-test-id="login-container"]');

  async login(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    return this;
  }

  async loginErrorMessage() {
    return await this.failedLoginMessage.textContent();
  }
}
