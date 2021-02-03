import Keycloak from 'keycloak-js'
 
// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'

const keycloakInitConfig = {
    checkLoginIframe: false,
    onLoad: 'login-required',
    silentCheckSsoRedirectUri: 'http://localhost:3000/silent-sso.html'
}

const keycloakConfig = {
    url: 'http://localhost:8085/auth',
    realm: 'Example',
    clientId: 'react-app'
}

const keycloak = new Keycloak(keycloakConfig);

export { keycloak, keycloakInitConfig }