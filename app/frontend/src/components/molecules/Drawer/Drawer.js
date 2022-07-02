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
import LoginRegisterModal from '../Modal/LoginRegModal';
import SettingsModal from '../Modal/SettingsModal';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../reducers/isLogged';
import './Drawer.css'

export default function CollapsableDrawer() {
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.user.value.isLogged);

  const [settingsOpen, setSettingsOpen] = React.useState(false);
	
	const [state, setState] = React.useState(false);
  
	const [regOpen, setRegOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setState(open);
  };

  const handleClickOpen = () => {
    setRegOpen(true);
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
	};
  
  const ptheme = createTheme({
    palette: {
      primary: {
        main: '#df7b84',
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

        <LoginRegisterModal open={regOpen} onClose={() => setRegOpen(false)} onToggle={() => setRegOpen(true)}></LoginRegisterModal>

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

        <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)}></SettingsModal>

        <ListItem 
          disablePadding
          sx= {{
            display:
              loggedIn ? "flex" : "none",
          }}
          onClick={() => {
            dispatch(logout());
          }}
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