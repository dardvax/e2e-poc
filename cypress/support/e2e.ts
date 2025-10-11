// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('toLowerCase')) return false; // ignore cross-origin SPA errors
  if (err.message.includes('Cannot read properties of null (reading \'document\')')) return false; // ignore document null errors
  if (err.message.includes('document')) return false; // ignore other document-related errors
  if (err.message.includes('postMessage')) return false; // ignore Keycloak postMessage errors
});