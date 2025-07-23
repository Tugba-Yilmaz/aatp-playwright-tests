import { expect } from "@playwright/test";
import { CommerceBasePage } from "./CommerceBase.page";

export class SuccessPage extends CommerceBasePage{
    orderId = this.page.locator('[data-test-id="success-order-id"]');
    returnToProductButton = this.page.locator('[data-test-id="success-return-button"]');


    async verifyorderId(){
        await expect(this.orderId).toBeVisible();
         
    }

    async returnProducts(){
        await this.returnToProductButton.click();
        await this.page.waitForURL('https://aatp.vercel.app/dashboard');
    }

}