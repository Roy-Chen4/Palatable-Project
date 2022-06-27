import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createTheme} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './Drawer.css'

export default function CollapsableDrawer() {
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
				<Button theme={theme}
					variant="contained"
					onClick={handleClickOpen}
				>
					Register or log in
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
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
			<React.Fragment key={'left'}>
				<div className='menu-icon'>
					<Button onClick={toggleDrawer(true)}>
						<MenuIcon />
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