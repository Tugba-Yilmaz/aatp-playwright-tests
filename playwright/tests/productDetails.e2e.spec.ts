import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/Login.page';
import { ProductDetailsPage } from '../src/pages/ProductDetails.page';

test.describe('Product Browsing and Details Viewing', () => {
  let loginPage: LoginPage;
  let productDetailsPage: ProductDetailsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productDetailsPage = new ProductDetailsPage(page);

    await test.step('GIVEN: The user logged in and on the products page', async () => {
      await loginPage.open();
      await loginPage.login('test@test.com', 'test');
      await expect(page).toHaveURL('/dashboard');
      await expect(page.locator('[data-test-id="dashboard-container"]')).toBeVisible();
    });
  });

  test('should display product details when clicking on first product', async ({ page }) => {
    await test.step('WHEN: The user clicks on the first product', async () => {
      await page.locator('[data-test-id="view-details-button"]').first().click();
    });

    await test.step('THEN: all product details are displayed', async () => {
      const isVisible = await productDetailsPage.isProductDetailsVisible();
      expect(isVisible).toBeTruthy();
    });
  });
});
