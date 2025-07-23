import { CommerceBasePage } from "./CommerceBase.page";

export class ProductDetailsPage extends CommerceBasePage {
    productName = this.page.locator('[data-test-id="modal-product-name"]');
    productDescription = this.page.locator('[data-test-id="modal-product-description"]');
    productPrice =this.page.locator('[data-test-id="modal-product-price"]');
    addToCartButton = this.page.locator('[data-test-id="modal-add-to-cart-button"]');
    closeButton = this.page.locator('[data-test-id="close-modal-button"]');

    async isProductDetailsVisible(){
        //await this.productName.waitFor();//It ensures the element is present before checking its visibility, preventing timing errors.

        return(
            await this.productName.isVisible() &&
            await this.productDescription.isVisible() &&
            await this.productPrice.isVisible() &&
            await this.addToCartButton.isVisible() &&
            await this.closeButton.isVisible()
        )
    }

    async closeProductsDetailsPage(){
        await this.closeButton.click();
    }
  
}