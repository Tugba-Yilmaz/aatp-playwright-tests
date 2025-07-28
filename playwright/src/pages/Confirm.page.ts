import { CommerceBasePage } from './CommerceBase.page';

export class ConfirmPage extends CommerceBasePage {
  confirmOrderButton = this.page.locator('[data-test-id="modal-confirm-button"]');
  cancelOrderButton = this.page.locator('[data-test-id="modal-cancel-button"]');
  async confirmOrder() {
    await this.confirmOrderButton.click();
  }
  async cancelOrder() {
    await this.cancelOrderButton.click();
  }
}
