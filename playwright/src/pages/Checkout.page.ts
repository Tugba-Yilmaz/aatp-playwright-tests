import { CommerceBasePage } from "./CommerceBase.page";

type ShippingInfo = {
  name: string;
  address: string;
  zipcode: string;
  city: string;
  phone: string;
};

export class CheckoutPage extends CommerceBasePage{
   readonly _url = '/checkout'

   
   nameInput = this.page.locator('[data-test-id="name-input"]');
   addressInput = this.page.locator('[data-test-id="address-input"]');
   zipCodeInput = this.page.locator('[data-test-id="zip-input"]');
   cityInput = this.page.locator('[data-test-id="city-input"]');
   phoneInput = this.page.locator('[data-test-id="phone-input"]');
   cancelButton = this.page.locator('[data-test-id="cancel-checkout-button"]');
   placeOrderButton = this.page.locator('[data-test-id="place-order-button"]');
   modalCancelButton = this.page.locator('[data-test-id="modal-confirm-cancel-button"]');


   async fillShippingInfo({name,address,zipcode,city,phone}:ShippingInfo){
    await this.nameInput.fill(name);
    await this.addressInput.fill(address);
    await this.zipCodeInput.fill(zipcode);
    await this.cityInput.fill(city);
    await this.phoneInput.fill(phone);
   }

   async placeOrder(){
    await this.placeOrderButton.click();
   }



}