import logo from '../../atoms/Logo/logo.png'
import * as React from 'react';
import './Header.css';
import CollapsableDrawer from '../../molecules/Drawer/Drawer';

function Header() {
  return (
        <header className="App-header">
  
          <img src={logo} className="App-logo" alt="logo" />
          <CollapsableDrawer />
          
        </header>
    )
}

export default Header;