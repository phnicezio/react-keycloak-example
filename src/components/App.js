import React from 'react';
import './App.css';
import Menu from './Menu';
import User from './User';

function App() {
  return (
    <div className="App">
      <Menu />
      <div className="App-container">
        <h1>React with Keycloak example</h1>
        <div>
          <User />        
        </div>        
        <a
          className="App-link"
          href="https://medium.com/keycloak"
          target="_blank"
          rel="noopener noreferrer"
        > Learn Keycloak </a>
      </div>  
    </div>
  );
}

export default App;