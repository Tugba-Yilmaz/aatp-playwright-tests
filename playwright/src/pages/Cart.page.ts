import { CommerceBasePage } from "./CommerceBase.page";
import { expect } from '@playwright/test';


export class CartPage extends CommerceBasePage{
    cardButton = this.page.locator('[data-test-id="cart-button"]');
    cartCount =this.page.locator('[data-test-id="cart-count"]');
    cartItems = this.page.locator('[data-test-id="mobile-cart-count"]');
    removeButtons = this.page.locator('[data-test-id^="remove-item-"]');
    proceedToCheckoutButton  = this.page.locator('[data-test-id="checkout-button"]');
    emptyCartMessage = this.page.locator('[data-test-id="empty-cart-message"]');



  async openCart(){
    await this.cardButton.click();
  }  

  async getCartItemCount(): Promise<number> {
  if (await this.cartCount.isHidden()) {
    return 0;
  }
  const countText = await this.cartCount.textContent();
  return parseInt(countText || '0', 10);
}


 async removeAllItems() {
  while (await this.removeButtons.count() > 0) {
    await this.removeButtons.nth(0).click();
    await this.page.waitForTimeout(200); // çok hızlı olursa DOM güncellenmeyebilir
  }
 
 await expect(this.emptyCartMessage).toBeVisible({ timeout: 5000 });
 }


  async goToCheckout(){
    await this.proceedToCheckoutButton.click();
  }

}