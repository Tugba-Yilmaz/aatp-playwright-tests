import { expect, Locator } from '@playwright/test';
import { BasePage } from './Base.page';
import { HeaderComponent } from '../components/header.component';
import { FooterComponet } from '../components/footer.component';

export class CommerceBasePage extends BasePage {
  header = new HeaderComponent(this.page)
  footer = new FooterComponet(this.page);

  async logout() {
    await this.header.logOutButton.click();
    await expect(this.header.logOutButton).toBeHidden();
  }
}