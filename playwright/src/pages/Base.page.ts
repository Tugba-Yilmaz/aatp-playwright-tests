import { Locator, Page, expect } from '@playwright/test';

export class BasePage {
  _url = '/';

  constructor(readonly page: Page) {}

  async waitForNetwork() {
    await this.page.waitForLoadState('networkidle');
  }

  async open() {
    await this.page.goto(this._url);
    await this.page.waitForLoadState('domcontentloaded');
    await this.waitForNetwork();
  }

  async reload() {
    await this.page.reload();
    await this.page.waitForLoadState('domcontentloaded');
    await this.waitForNetwork();
  }
}