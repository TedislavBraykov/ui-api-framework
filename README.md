This repository contains an end-to-end UI, API, and Visual test automation framework built with Playwright, TypeScript, and Percy.


🚀 Technologies Used

Playwright – UI & API automation

TypeScript – Type safety & maintainability

Percy – Visual regression testing

Zod – API schema validation

GitHub Actions – CI/CD

Node.js (18+)



🌐 Test Targets

UI Base URL: https://www.saucedemo.com

API Base URL: https://fakestoreapi.com


📦 Project Setup

Clone the repository:
git clone <repo-url>
cd ui-api-framework

Install dependencies:
npm install

Install Playwright browsers:
npx playwright install


🔐 Environment Variables

For visual testing with Percy, set the following variable:

export PERCY_TOKEN=your_percy_token
(For CI, this is configured as a GitHub secret.)


▶️ Running Tests
Run all tests (API + UI + Visual)
npx percy exec -- npx playwright test

Run API tests only
npx playwright test --grep @api

Run UI functional tests only
npx playwright test --grep @ui 

Run Visual tests only
npx playwright test --grep @visual


🧩 Test Tagging Strategy

Tests are tagged to enable selective execution:

Tag	Purpose
@api	API tests
@ui	UI functional tests
@visual	Visual regression tests

Example:

test('@ui @visual checkout overview snapshot', async () => {
  ...
});

🧱 Project Structure
src/
├── api/
│   ├── client/
│   │   └── apiClient.ts        # Generic API client
│   ├── schemas/
│   │   └── product.schema.ts   # Zod schemas for API validation
│   └── tests/
│       └── api.spec.ts         # API test cases
│
├── data/
│   ├── apiTestData.ts          # API test data
│   ├── users.ts                # UI test users
│   ├── products.ts             # Product data
│   └── checkout.ts             # Checkout-related data
│
├── ui/
│   ├── fixtures/
│   │   └── Fixtures.ts         # Playwright fixtures
│   ├── pages/
│   │   ├── LoginPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutDeliveryPage.ts
│   │   ├── CheckoutOverviewPage.ts
│   │   └── Header.ts
│   ├── tests/
│   │   ├── login.spec.ts
│   │   ├── products.spec.ts
│   │   └── checkout.spec.ts
│   |   └── products.visual.spec.ts
│
├── utils/
│   └── env.ts    
│
├── playwright.config.ts
└── README.md

⚙️ Continuous Integration (CI)

GitHub Actions is configured to run:

All tests on push

Manual execution with selectable scope:

API only

UI only

Visual only

Full suite

This ensures fast feedback and scalable execution. Reports are provided in the pipelines.

✅ Key Design Decisions

Page Object Model (POM) for UI maintainability

Fixtures for reusable setup logic

Central API client to avoid duplication

Schema validation for strong API assertions

Test tagging for flexible CI execution

Clear separation between UI, API, and Visual layers
