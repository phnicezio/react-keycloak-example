import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { keycloak, keycloakInitConfig } from './keycloak';

const setCookies = (tokenParsed, token) => {
    const cookies = new Cookies();
    const cookiesConfig = { path: '/' }
    cookies.set('x_access', tokenParsed, cookiesConfig);
    cookies.set('x_session', token, cookiesConfig);
}

keycloak.init({ 
        onLoad: keycloakInitConfig.onLoad,
        checkLoginIframe: keycloakInitConfig.checkLoginIframe
    }).then((authenticated) => {
    
    if (!authenticated) {        
        console.error("Not authenticated: " + keycloak.token);
        window.location.reload();
    } else {
        console.info("Authenticated: " + keycloak.token);
        console.info("tokenParsed: " + JSON.stringify(keycloak.tokenParsed));
        console.info("username: " + keycloak.tokenParsed.name);
        console.info("authenticatedUser: " + keycloak.idTokenParsed.name);
        setCookies(keycloak.tokenParsed, keycloak.token)
    }

    //React Render
    ReactDOM.render(<App />, document.getElementById('root'));

    keycloak.onTokenExpired = () => {
        console.log('token expired', keycloak.token);
        keycloak.updateToken(60).success((refreshed) => {
            if (refreshed) {                
                console.info('Token refreshed' + refreshed);
                console.info('Successfully get a new token', keycloak.token);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
            
        }).error(() => {
            console.error('Failed to refresh token');
        });
    };
}).catch(() => {
    console.error("Authenticated Failed");
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();