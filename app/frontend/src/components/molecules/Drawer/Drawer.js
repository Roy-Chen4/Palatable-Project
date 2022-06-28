import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { createTheme} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './Drawer.css'

export default function CollapsableDrawer() {
  const [registerDetails, setRegisterDetails] = React.useState({
    email: "", 
    password:""
  });
  
  const handleRegisterChange = event => {
    const { name, value } = event.target;
    setRegisterDetails( {
      ...registerDetails,
      [name]: value,
    })
  }

	
	const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => () => {
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }

    setState(open);
  };

	const [regOpen, setRegOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setRegOpen(true);
  };

  const handleClose = () => {
    setRegOpen(false);
  };

  const [confOpen, setConfOpen] = React.useState(false); 

  const handleRegisterSubmit = () => {
	axios
      .post("/register/", registerDetails)
      .then(() => this.setRegOpen(false))
      .catch((err) => console.log(err));
    
  }

  const handleCloseConf = () => {
	setConfOpen(false);
  }

  const handleCloseConfreg = () => {
	setConfOpen(false);
	setRegOpen(false);
  }

  const [logOpen, setLogOpen] = React.useState(false); 

  const handleClickOpenLog = () => {
	setLogOpen(true);
  }

  const handleCloseLog = () => {
	setLogOpen(false);
  }

  const handleCloseRegLog = () => {
	setLogOpen(false);
	setRegOpen(false);
  }
  

  const ptheme = createTheme({
    palette: {
      primary: {
        main: '#df7b84',
      },
    },
    // typography: {
    //   // fontFamily: [
    //   //   'Comic Sans MS, Comic Sans',
    //   // ],
		// 	color: '#df7b84',
    // },
  });

  const btheme = createTheme({
    palette: {
      primary: {
        main: '#E8E8E8',
      },
    },
    // typography: {
    //   // fontFamily: [
    //   //   'Comic Sans MS, Comic Sans',
    //   // ],
		// 	color: 'white',
    // },
  });

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(false)}
    >
      <List>
			<IconButton className='close-icon' onClick={toggleDrawer(false)}>
				<ChevronLeftIcon />
			</IconButton>
			<div className="login_reg_button">
				<Button theme={ptheme}
					variant="contained"
					onClick={handleClickOpen}
					sx={{color:"white"}} 
				>
					Register/Login
				</Button>
			</div>

			<Dialog open={regOpen} onClose={handleClose} fullScreen>
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
							/*
							label="First Name"
							*/
							placeholder='First Name'
							sx={{width:"37%", paddingLeft: "10vmin"}}
						/>
						<TextField
							margin="normal"
							/*
							label="Last Name"
							*/
							placeholder='Last Name'
							sx={{width:"37%", paddingLeft: "3vmin"}}
						/>
						<TextField
							autoFocus
							margin="normal"
							id="name"
							/*
							label="Email Address"
							*/
              value={registerDetails.email}
              onChange={handleRegisterChange}
							type="email"
							// variant="standard"
							placeholder="Email Address"
							sx={{width:"77%", paddingLeft: "10vmin"}}
						/>
						<TextField 
							margin="normal"
							/*
							label="Password"
							*/
              value={registerDetails.password}
              onChange={handleRegisterChange}
							placeholder='Enter password'
							sx={{width:"77%", paddingLeft: "10vmin"}}
						/>
						<TextField
							margin="normal"
							/*
							label="Confirm Password"
							*/
							placeholder='Confirm password'
							sx={{width:"77%", paddingLeft: "10vmin"}}
						/>
				</DialogContent>
						</div>
				<DialogActions>
					<Button onClick={handleClickOpenLog}>Already have an account?</Button>
					<Button theme={btheme} sx={{width:"100px"}} variant="contained" onClick={handleClose}>Cancel</Button>
					<Button theme={ptheme} sx={{width:"100px",color:"white"}} variant="contained" onClick={handleRegisterSubmit}>Register</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={confOpen} onClose={handleCloseConf} fullWidth='true' maxWidth='md'>
				<div className="confirmation_ui">
				<DialogTitle>
					<p1 className='conf_heading'>
						Account Confirmation
					</p1>
				</DialogTitle>
				<DialogContent>
				<DialogContentText>
					Please enter the five letter code that was emailed to you.
				</DialogContentText>
				<TextField
					margin="normal"
					placeholder='AAAAA'
					sx={{width:"70%"}}
				/>
				</DialogContent>
				</div>
				<DialogActions>
					<Button 
					onClick={handleCloseConf}
					variant="contained"
					theme={btheme}
					> 
					Close 
						</Button>
					<Button 
					onClick={handleCloseConfreg}
					variant="contained"
					theme={ptheme}
					sx={{color:"white"}}
					> 
					Submit 
						</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={logOpen} onClose={handleCloseConf} fullWidth='true' maxWidth='md'>
				<div className="confirmation_ui">
				<DialogTitle>
					<p1 className='conf_heading'>
						Log In
					</p1>
				</DialogTitle>
				<DialogContent>
				<TextField
					margin="normal"
					placeholder='Email Address'
					sx={{width:"70%"}}
				/>
				<TextField
					margin="normal"
					placeholder='Password'
					sx={{width:"70%"}}
				/>
				</DialogContent>
				</div>
				<DialogActions>
					<Button 
						onClick={handleCloseLog}
						variant="contained"
						theme={btheme}
						> 
						Close 
					</Button>
					<Button 
					onClick={handleCloseRegLog}
					variant="contained"
					theme={ptheme}
					sx={{color:"white"}}
					> 
						Log In 
					</Button>
				</DialogActions>
			</Dialog>
				 <ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<FavoriteBorderOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary={'Saved Recipes'} />
					</ListItemButton>
				 </ListItem>
				 <ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<ForumOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary={'Feed'} />
					</ListItemButton>
				 </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
			<React.Fragment key={'left'}>
				<div className='menu-icon'>
					<Button onClick={toggleDrawer(true)}>
						<MenuIcon sx={{color:'#df7b84'}}/>
					</Button>
				</div>
				<Drawer
					anchor={'left'}
					open={state}
					onClose={toggleDrawer(false)}
					BackdropProps={{style:{opacity:0}}}
				>
					{list('left')}
				</Drawer>
			</React.Fragment>
    </div>
  );
}