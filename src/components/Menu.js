import React from 'react';
import './Menu.css';
import Logout from './Logout';

function Menu() {
  return (
    <div className="Menu">
      <header className="Menu-container">
        <Logout />        
      </header>        
    </div>
  );
}

export default Menu;