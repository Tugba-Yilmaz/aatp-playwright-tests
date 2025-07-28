import { Locator, Page } from '@playwright/test';

export class FooterComponet {
  homeButton: Locator;
  aboutButton: Locator;

  constructor(readonly page: Page) {
    this.homeButton = this.page.locator('[data-test-id="footer-home-link"]');
    this.aboutButton = this.page.locator('[data-test-id="footer-about-link"]');
  }

  async clickHome() {
    await this.homeButton.click();
  }

  async clickAbout() {
    const [newTab] = await Promise.all([this.page.waitForEvent('popup'), this.aboutButton.click()]);
    return newTab;
  }
}
