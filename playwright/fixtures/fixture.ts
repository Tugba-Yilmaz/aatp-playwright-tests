import { test as base } from '@playwright/test';
import { LoginPage } from '../src/pages/Login.page';
import { ProductsPage } from '../src/pages/Products.page';
import { CartPage } from '../src/pages/Cart.page';
import { BasePage } from '../src/pages/Base.page';
import { CommerceBasePage } from '../src/pages/CommerceBase.page';

export const test = base.extend<{
    login: LoginPage
    products: ProductsPage
    cartPage: CartPage
    basePage: BasePage
    commerceBasePage: CommerceBasePage
    

}>({

  

})