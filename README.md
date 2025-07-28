# 🧪 Testing with Playwright for AATP E-Commerce

## Overview

This project uses **Playwright** with **TypeScript** to perform end-to-end testing of the [AATP e-commerce application](https://aatp.vercel.app/).

It includes:

- Page Object Model (POM) test architecture
- ESLint and Prettier integration
- Detailed test coverage: login, product browsing, cart, checkout, and menu navigation

---

## Prerequisites

- Node.js (v18 or above)
- npm

---

## Installation

Install project dependencies:

```sh
npm install
```

Install Playwright browsers:

```sh
npx playwright install
```

---

## Running Tests

Run all tests:

```sh
npx playwright test
```

Run tests with Playwright UI:

```sh
npx playwright test --ui
```

---

## Generate Report

View Playwright HTML report:

```sh
npx playwright show-report
```

Optional Allure support (if configured):

```sh
allure serve allure-results
```

---

## Linting

Check code quality:

```sh
npm run lint
```

Auto-fix issues:

```sh
npm run lint:fix
```

---

## Formatting

Format code with Prettier:

```sh
npm run format
```

---

## Project Structure

- **playwright/tests**: Contains the Playwright test spec files (e.g. login, cart, checkout).
- **playwright/src/pages**: Page Object Models (POM) for different pages.
- **playwright/src/components**: Shared UI components like Header, Footer, etc.
- **playwright-report**: Automatically generated HTML test reports.
- **test-results**: Raw test output for further analysis or reporting.
- **.eslintrc.js**: ESLint configuration.
- **.prettierrc**: Prettier configuration.
- **package.json**: Project metadata and scripts.
- **playwright.config.ts**: Main Playwright configuration file.
- **README.md**: Project documentation.

---

## Test Coverage Summary

### 🔐 User Login

- Valid login → redirect to products page
- Invalid login → shows error (data-driven)
- Logout → returns to login

### 🛍️ Product Browsing

- View product list
- View product details

### 🛒 Cart Functionality

- Add single product
- Add/update multiple products
- Remove all products

### 💳 Checkout Process

- Complete checkout with order ID
- Cancel order → cart cleared

### 📂 Menu Navigation

- “Home” → redirects to login
- “About” → opens AA page in new tab
