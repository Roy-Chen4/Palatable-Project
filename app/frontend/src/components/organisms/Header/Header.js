// import logo from '../atoms/Logo/logo.png';
import logo from '../../atoms/Logo/logo.png'
import * as React from 'react';
import './Header.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme} from '@mui/material/styles';

function Header() {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#C976F6',
      },
    },
    typography: {
      fontFamily: [
        'Comic Sans MS, Comic Sans, cursive',
      ],
    },
  });
  
  return (
        <header className="App-header">
  
          <img src={logo} className="App-logo" alt="logo" />
          <div className="login_reg_button">
            <Button theme={theme}
              variant="contained"
              onClick={handleClickOpen}
            >
              Register or log in
            </Button>
          </div>

          {/* 
          needs to be moved into menu component
          move first into ingredient page container
          then move into menu component
          add menu component to header
          add header to pages
          set menu component to open by default on ingredient page
          set men component to closed by default on the recipe page
          */}
          <Dialog open={open} onClose={handleClose} fullScreen>
            <div class = "banner">
                <img src="https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" className="register_banner" alt="loginbanner"/>
              </div>
            <div className='register_ui'>
              <DialogTitle>
                <p className='rego_heading'>
                Become Palatable
                </p>
                </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter the required details below. Upon successful 
                  registration you will have full access to recipe exploration and contribution!
                </DialogContentText>
                <TextField
                  margin="normal"
                  label="First Name"
                  placeholder='John'
                  sx={{width:"37%", paddingLeft: "10vmin"}}
                />
                <TextField
                  margin="normal"
                  label="Last Name"
                  placeholder='Smith'
                  sx={{width:"37%", paddingLeft: "3vmin"}}
                />
                <TextField
                  autoFocus
                  margin="normal"
                  id="name"
                  label="Email Address"
                  type="email"
                  // variant="standard"
                  placeholder="example@gmail.com"
                  sx={{width:"77%", paddingLeft: "10vmin"}}
                />
                <TextField 
                  margin="normal"
                  label="Password"
                  placeholder='Enter password'
                  sx={{width:"77%", paddingLeft: "10vmin"}}
                />
                <TextField
                  margin="normal"
                  label="Confirm Password"
                  placeholder='Enter password'
                  sx={{width:"77%", paddingLeft: "10vmin"}}
                />
            </DialogContent>
                </div>
            <DialogActions>
              <Button sx={{width:"100px"}} variant="contained" onClick={handleClose}>Cancel</Button>
              <Button theme={theme} sx={{width:"100px",color:"white"}} variant="contained" onClick={handleClose}>Register</Button>
            </DialogActions>
          </Dialog>
        </header>
    )
}

export default Header;