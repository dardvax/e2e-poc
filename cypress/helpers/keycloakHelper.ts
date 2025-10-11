import { CONFIG } from '../config/constants';

export function getKeycloakToken() {
  const { url, realm, clientId } = CONFIG.keycloak;
  const baseUrl = `${url}/realms/${realm}/protocol/openid-connect`;
  const redirectUri = Cypress.config().baseUrl;
  
  // Step 1: Get Keycloak login form
  return cy.request({
    url: `${baseUrl}/auth`,
    qs: {
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'openid',
      state: crypto.randomUUID(),
      nonce: crypto.randomUUID(),
      response_type: 'code',
      response_mode: 'fragment',
    },
    failOnStatusCode: false,
  }).then(authResp => {
    // Step 2: Parse login form and submit credentials
    const formAction = Cypress.$(authResp.body).find('form').attr('action');
    
    return cy.request({
      method: 'POST',
      url: formAction,
      form: true,
      followRedirect: false,
      body: {
        username: Cypress.env('keycloak').username,
        password: Cypress.env('keycloak').password,
      },
      failOnStatusCode: false,
    });
  }).then(formResp => {
    // Debug: Log the response to see what's happening
    cy.log('Form Response Status:', formResp.status);
    cy.log('Form Response Headers:', JSON.stringify(formResp.headers));
    cy.log('Username being used:', Cypress.env('keycloak').username);
    cy.log('Password length:', Cypress.env('keycloak').password?.length || 'undefined');
    
    // Step 3: Extract auth code and exchange for token
    const location = Array.isArray(formResp.headers.location) 
      ? formResp.headers.location[0] 
      : formResp.headers.location;
    
    if (!location) {
      throw new Error('No location header found in authentication response');
    }
    
    const code = new URLSearchParams(location.split('#')[1]).get('code');
    
    return cy.request({
      method: 'POST',
      url: `${baseUrl}/token`,
      form: true,
      body: {
        grant_type: 'authorization_code',
        client_id: clientId,
        redirect_uri: redirectUri,
        code,
      },
    });
  }).then(response => response.body.access_token);
}
