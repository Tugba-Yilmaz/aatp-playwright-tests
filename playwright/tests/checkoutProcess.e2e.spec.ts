import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/Login.page';
import { ProductsPage } from '../src/pages/Products.page';
import { CartPage } from '../src/pages/Cart.page';
import { CheckoutPage } from '../src/pages/Checkout.page';
import { ConfirmPage } from '../src/pages/Confirm.page';
import { SuccessPage } from '../src/pages/Success.page';

test.describe('Checkout process',()=>{

     let loginPage: LoginPage;
     let productPage: ProductsPage;
     let cartPage: CartPage;
     let checkoutPage: CheckoutPage;
     let confirmPage: ConfirmPage;
     let successPage: SuccessPage;

  test.beforeEach(async ({ page }) => {
     loginPage = new LoginPage(page);
     cartPage = new CartPage(page);
     checkoutPage = new CheckoutPage(page);
     confirmPage = new ConfirmPage(page);
     successPage = new SuccessPage(page);
     productPage = new ProductsPage(page);

     await page.goto('/dashboard');

     await test.step('GIVEN: The user has added products to teh cart', async()=>{
        await productPage.addProductToCart(0);
        await cartPage.openCart(),
        await cartPage.goToCheckout();
     });
    });

    test(' Successful checkout',async()=>{
        await test.step('WHEN:  I complete the checkout process with valid info',async()=>{
             await checkoutPage.fillShippingInfo({
               name: 'Tugba YILMAZ',
               address: 'Pirrou 29_31',
               zipcode: '11632',
               city: 'Athina',
               phone: '6974432788'
        });
            await checkoutPage.placeOrder();
            await confirmPage.confirmOrder();
      });
       await test.step('THEN: a confirmation popup with an order ID is shown',async()=>{
             await successPage.verifyorderId();
       });
       await test.step('AND: the user is redirected to the products page', async()=>{
             await successPage.returnProducts();
             await productPage.verifyProductListVisible();
       });
       await test.step('AND: the cart is emptied', async()=>{
             await expect(cartPage.cartCount).toHaveCount(0);
        
       });
       
});

test(' Cancel order during checkout', async()=>{
    await test.step('WHEN: I choose to cancel the order from the checkout page',async()=>{
        await checkoutPage.cancelButton.click();
        await expect(checkoutPage.modalCancelButton).toBeVisible();
        await checkoutPage.modalCancelButton.click();
    });

    await test.step('THEN:  The user redirected to the products page',async()=>{
        await productPage.verifyProductListVisible();
    });
      await test.step('AND: The cart is emptied', async () => {
        await expect(cartPage.cartCount).toHaveCount(0);
    });
})



});


