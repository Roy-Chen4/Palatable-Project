import logo from '../../atoms/Logo/logo.png'
import * as React from 'react';
import CollapsableDrawer from '../Drawer/Drawer';
import { Box } from '@mui/system';
import { Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import './Header.css';
import { NavLink } from 'react-router-dom';

/** 
* Header component
*/
function Header() {
  return ( 
    <Box sx={{"&&":{ flexGrow: 1 }}}>
      <AppBar position="static" sx={{ "&&": {bgcolor: '#282c34'}}}>
        <Toolbar>
          <CollapsableDrawer 
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ "&&": { mr: 2 }}}
          />
          <div 
            className='app-logo'
          >
            <NavLink to="/">        
                <img src={logo} className="App-logo" alt="logo"/>
            </NavLink>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;