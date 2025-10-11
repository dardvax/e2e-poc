# Cypress E2E Testing Project

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your actual Keycloak credentials.

3. **Run tests:**
   ```bash
   # Interactive mode
   npx cypress open
   
   # Headless mode
   npx cypress run
   ```

Additional CLI examples (run a single spec):

```powershell
# Headless: run the login spec
npx cypress run --spec "cypress/e2e/login.cy.ts"

# Headed: open a visible browser for the login spec
npx cypress run --headed --spec "cypress/e2e/login.cy.ts"
```

## Project Structure

```
cypress/
├── config/
│   └── constants.ts          # Non-sensitive configuration
├── e2e/
│   ├── login.cy.ts          # Login tests
│   ├── warehouse.cy.ts      # Warehouse functionality tests
│   ├── map.cy.ts            # Map page tests
│   └── create-receive-from-harvest.cy.ts  # Order creation tests
├── helpers/
│   ├── keycloakHelper.ts    # Keycloak authentication logic
│   ├── apiHelper.ts         # API request helpers
│   └── playwrightHelper.ts  # Playwright utilities
├── pages/
│   ├── BasePage.ts          # Base page object class
│   ├── WarehouseReceivePage.ts      # Warehouse page object
│   └── CreateReceiveFromHarvestPage.ts  # Order creation page object
└── support/
    ├── commands.ts          # Custom Cypress commands
    └── e2e.ts              # Global test setup
```

## Key Features

- ✅ **Keycloak Authentication**: Custom authentication flow with session management
- ✅ **Page Object Model**: Organized, maintainable test structure
- ✅ **Environment Variables**: Secure credential management
- ✅ **API Integration**: Fetch test data from APIs
- ✅ **Session Caching**: Efficient authentication with `cy.session()`

## Custom Commands

- `cy.loginWithKeycloak()` - Authenticate with Keycloak (with session caching)
- `cy.loginIfNeeded()` - Login only if no active session

## Configuration

- **Keycloak settings**: `cypress/config/constants.ts`
- **Environment setup**: `cypress.config.ts`
- **Credentials**: `.env` (not included - use `.env.example`)