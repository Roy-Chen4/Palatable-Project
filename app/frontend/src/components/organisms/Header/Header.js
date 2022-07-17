import logo from '../../atoms/Logo/logo.png'
import * as React from 'react';
import CollapsableDrawer from '../Drawer/Drawer';
import { Box } from '@mui/system';
import { Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { useDispatch } from 'react-redux';
import { login } from '../../../reducers/isLogged';
import './Header.css';


function Header() {
  const dispatch = useDispatch();
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
          <div className='app-logo' onClick={()=> dispatch(login({ isLogged: true, email: '', diet: ''}))}>
            <img src={logo} className="App-logo" alt="logo"/>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;