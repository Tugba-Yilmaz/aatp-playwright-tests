import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/Login.page';
import { ProductsPage } from '../src/pages/Products.page';
import { CartPage } from '../src/pages/Cart.page';


test.describe('Product Browsing and Details Viewing', () => {

  let loginPage: LoginPage;
  let cartPage: CartPage;
  let productPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    productPage = new ProductsPage(page);
  

    await test.step('GIVEN: The user logged in and on the products page', async () => {
      await loginPage.open();
      await loginPage.login('test@test.com', 'test');
      await expect(page).toHaveURL('/dashboard');
      await expect(page.locator('[data-test-id="dashboard-container"]')).toBeVisible();
    });
  });

  test('Add single product to cart', async()=>{
     await test.step('WHEN: I  add the first product to the cart', async () => {
      await productPage.addProductToCart(0);
    });

    await test.step('THEN: the cart badge shows the updated count', async () => {
       const count = await cartPage.getCartItemCount();
      expect(count).toBe(1);
    });

  })

  test(' Add and update products in cart', async ()=>{
     await test.step('WHEN:  I add two different products and add more of the first', async () => {
        await productPage.addMultipleProducts([0,0,2,4]);
    });

     await test.step('THEN:the cart badge reflects the correct total count', async () => {
       const count = await cartPage.getCartItemCount();
      expect(count).toBe(4);
    });
  })

  test('Remove products from cart' , async({ page})=>{
    await test.step('GIVEN: the user has multiple items in the cart',async()=>{
      await productPage.addMultipleProducts([0,1,2,3]);
      const  count = await cartPage.getCartItemCount();
      expect(count).toBe(4);
    })
    await test.step('WHEN :I remove all products ', async()=>{
      await cartPage.openCart();
      await cartPage.removeAllItems();
    })
    await test.step('THEN: the cart is empty',async()=>{
      const count = await cartPage.getCartItemCount();
      expect(count).toBe(0);
    })
  })




});



