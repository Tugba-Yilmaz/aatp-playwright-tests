import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/Login.page';
import { CommerceBasePage } from '../src/pages/CommerceBase.page';

test.describe('Menu button navigation', () => {
  let loginPage: LoginPage;
  let commerceBasePage: CommerceBasePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    commerceBasePage = new CommerceBasePage(page);

    await test.step('GIVEN: The user is logged in', async () => {
      await loginPage.open();
      await loginPage.login('test@test.com', 'test');
      await expect(page).toHaveURL('https://aatp.vercel.app/dashboard');
    });
  });

  test('WHEN user clicks Home, THEN redirected to login page', async ({ page }) => {
    await test.step('WHEN: The user clicks the Home button', async () => {
      await commerceBasePage.footer.clickHome();
    });

    await test.step('THEN: The use redirected to the login page', async () => {
      await expect(page).toHaveURL('/');
    });
  });

  test('WHEN user clicks About, THEN Agile Actors page opens in new tab', async ({
    page,
    context,
  }) => {
    let newTab;

    await test.step('WHEN: The user clicks the About button', async () => {
      const [popup] = await Promise.all([
        context.waitForEvent('page'),
        commerceBasePage.footer.clickAbout(),
      ]);
      newTab = popup;
    });

    await test.step('THEN: a new tab opens to AA’s page', async () => {
      await newTab.waitForLoadState();
      await expect(newTab).toHaveURL('https://www.agileactors.com/');
      await newTab.close();
    });
  });
});
