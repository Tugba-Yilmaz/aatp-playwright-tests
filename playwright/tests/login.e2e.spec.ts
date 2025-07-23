import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/Login.page';

test.describe('User login', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    await test.step('GIVEN: I open the application', async () => {
      loginPage = new LoginPage(page)
      await loginPage.open();
    });
  });


  test('should land on Home Page, after logging in', async ({
    page,
  }) => {
    await test.step('WHEN: I attempt to login with valid credentials', async () => {
      await loginPage.login('test@test.com', 'test');
    });

    await test.step('THEN: Logout button and Cart should be visible', async () => {
      await expect(loginPage.header.logOutButton).toBeVisible()
      await expect(loginPage.header.cartButton).toBeVisible()
    });
  });


  const invalidButValidFormatCredentials = [
  { email: 'wrong@email.com', password: 'wrongpass' },
  { email: 'test@test.com', password: 'wrongpass' }
];

for (const creds of invalidButValidFormatCredentials) {
  test(`should not login with wrong credentials: ${creds.email}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(creds.email, creds.password);

    await expect(loginPage.failedLoginMessage).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });
}

const invalidInputCredentials = [
  { email: '', password: 'somepass' },
  { email: 'test@test.com', password: '' },
  { email: 'notanemail', password: 'somepass' }
];

for (const creds of invalidInputCredentials) {
  test(`should block invalid input (not submitted): ${creds.email}`, async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-test-id="email-input"]', 'notanemail');
    await page.fill('[data-test-id="password-input"]', 'somepass');
    await page.click('[data-test-id="login-button"]');

    const isValidEmail = await page.$eval(
      '[data-test-id="email-input"]',
      el => (el as HTMLInputElement).validity.valid
    );
    const isValidPassword = await page.$eval(
      '[data-test-id="password-input"]',
      el => !(el as HTMLInputElement).validity.valueMissing
    );

    expect(isValidEmail && isValidPassword).toBe(false);
  });
}



  test('Logout after login', async ({ page }) => {
   await test.step('GIVEN: the user is logged in and on the products page', async () => {
     await loginPage.login('test@test.com', 'test');
   });

   await test.step('WHEN: I click the logout button', async () => {
     await loginPage.logout();
   });
   
   await test.step('THEN: I should be  redirected back to the login page ', async () =>{
      await expect(page).toHaveURL('/');
    })
  });

    
});