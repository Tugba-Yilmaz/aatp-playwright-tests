import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  component: Locator;
  logOutButton: Locator;
  cartButton: Locator;
  cartCounter: Locator;
  headerTitle: Locator;

  constructor(readonly page: Page) {
    this.component = this.page.locator('[data-test-id="header-nav"]');
    this.logOutButton = this.component.locator('[data-test-id="logout-button"]');
    this.cartButton = this.component.locator('[data-test-id="cart-button"]');
    this.cartCounter = this.component.locator('[data-test-id="cart-count"]');
    this.headerTitle = this.component.locator('[data-test-id="header-title"]');
  }

  get() {
    return this.component;
  }
}
