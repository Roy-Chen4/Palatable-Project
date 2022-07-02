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
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { createTheme} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './Drawer.css'
import RegisterModal from '../Modal/LoginRegModal';

export default function CollapsableDrawer() {
  // eslint-disable-next-line no-unused-vars
  // const [errorMessage, setErrorMessage] = React.useState("")

  const [settingsOpen, setSettingsOpen] = React.useState(false);

  // const [hasError, setHasError] = React.useState(false);
	
  const [loggedIn, setLoggedIn] = React.useState(false);  
  
	const [state, setState] = React.useState(false);
  
	const [regOpen, setRegOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setState(open);
  };

  const handleClickOpen = () => {
    setRegOpen(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  }

  const handleSettingsOpen = () => {
		setSettingsOpen(true);
	};

	const handleSettingsClose = () => {
		setSettingsOpen(false);
	};
  
  const ptheme = createTheme({
    palette: {
      primary: {
        main: '#df7b84',
      },
    },
  });

  const btheme = createTheme({
    palette: {
      primary: {
        main: '#E8E8E8',
      },
    },
  });

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    >
      <List>
        <IconButton className='close-icon' onClick={toggleDrawer(false)}>
          <ChevronLeftIcon />
        </IconButton>
        <div className="login_reg_button">
          <Button theme={ptheme}
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              color:"white",
              display:
                loggedIn ? "none" : "flex",
            }} 
          >
            Register/Login
          </Button>
        </div>
        <RegisterModal open={regOpen} onClose={() => setRegOpen(false)} onToggle={() => setRegOpen(true)}></RegisterModal>

        <ListItem 
          disablePadding
          sx= {{
            display:
              loggedIn ? "flex" : "none",
          }}
        >
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
        <ListItem 
          disablePadding
          sx= {{
            display:
              loggedIn ? "flex" : "none",
          }}
          onClick={() => handleSettingsOpen()}
        >
          <ListItemButton>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Settings'} />
          </ListItemButton>
        </ListItem>

        <Dialog open={settingsOpen} onClose={handleSettingsClose} fullWidth='true' maxWidth='md'>
          <div className="confirmation_ui">
          <DialogTitle>
            <p1 className='conf_heading'>
              User Settings
            </p1>
          </DialogTitle>
          <DialogContent>
          <TextField
            margin="normal"
            placeholder='Email'
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
              onClick={handleSettingsClose}
              variant="contained"
              theme={btheme}
              > 
              Close 
            </Button>
            <Button 
            onClick={handleSettingsClose}
            variant="contained"
            theme={ptheme}
            sx={{color:"white"}}
            > 
              Save
            </Button>
          </DialogActions>
        </Dialog>



        <ListItem 
          disablePadding
          sx= {{
            display:
              loggedIn ? "flex" : "none",
          }}
          onClick={() => handleLogout()}
        >
          <ListItemButton>
            <ListItemIcon>
              <ExitToAppOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Sign Out'} />
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
						<MenuIcon sx={[{color:'#df7b84'}, {
              '&:hover': {
                color: 'white',
                // backgroundColor: 'white',
              },
            },]}/>
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