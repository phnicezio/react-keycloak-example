
import React from 'react';
import { keycloak } from '../keycloak';

const Logout = () => {
    const logout = () => (
      keycloak?.logout()
    );
  
    return (
      <button onClick={() =>logout()}>
        Logout
      </button>
    );
};

export default Logout;