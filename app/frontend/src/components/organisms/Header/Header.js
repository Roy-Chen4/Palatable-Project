import logo from '../../atoms/Logo/logo.png'
import * as React from 'react';
import './Header.css';
import CollapsableDrawer from '../../molecules/Drawer/Drawer';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';


function Header() {
  return ( 
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#282c34'}}>
        <Toolbar>
          <CollapsableDrawer 
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          />
          <div className='app-logo'>
            <img src={logo} className="App-logo" alt="logo"/>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;