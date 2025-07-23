import { expect } from '@playwright/test';
import { CommerceBasePage } from "./CommerceBase.page";
import { FooterComponet } from '../components/footer.component';

export class ProductsPage extends CommerceBasePage {
addToCartButton = this.page.locator('[data-test-id="add-to-cart-button"]');
productCards = this.page.locator('[data-test-id^="product-card"]'); 

async addProductToCart(index: number){
    await this.addToCartButton.nth(index).click();

}

 async addMultipleProducts(indexes: number[]){
   for(const i of indexes){
    await this.addProductToCart(i);
   }
 }
  async verifyProductListVisible() {
    await expect(this.productCards.first()).toBeVisible();
  }

}



















/* async addSameProductMultipleTimes(index: number, times:number){
    for(let i = 0; i< times; i++){
        await this.addToCartButton.nth(index).click();
    }
 }
*/