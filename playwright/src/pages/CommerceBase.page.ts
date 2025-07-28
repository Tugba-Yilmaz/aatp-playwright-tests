import { Page, expect } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
import { FooterComponet } from '../components/footer.component';

export class CommerceBasePage {
  _url = '/';
  header: HeaderComponent;
  footer: FooterComponet;

  constructor(readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponet(page);
  }

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

  async logout() {
    await this.header.logOutButton.click();
    await expect(this.header.logOutButton).toBeHidden();
  }
}
