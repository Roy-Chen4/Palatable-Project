import KitchenOutlinedIcon from '@material-ui/icons/KitchenOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Dialog } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '../../../reducers/isLogged';
import AuthModal from '../../molecules/Modal/AuthModal';
import DietModal from '../../molecules/Modal/DietModal';
import SettingsModalBody from '../../molecules/ModalBody/SettingsModalBody';
import { createTheme } from '@mui/material/styles';
import './Drawer.css';
import { makeStyles } from '@material-ui/core';

export default function CollapsableDrawer() {
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.user.value.isLogged);

  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const [dietOpen, setDietOpen] = React.useState(false);

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
  
  const primaryTheme = createTheme({
    palette: {
      primary: {
        main: '#df7b84',
      },
    },
  });

  // Secondary colour theme for buttons
  const secondaryTheme = createTheme({
    palette: {
        primary: {
            main: '#E8E8E8',
        },
    },
  });

  let navigate = useNavigate();

  function changeLocation(placeToGo){
      navigate(placeToGo, { replace: true });
      window.location.reload();
  }

  const useStyles = makeStyles(() => ({
    buttonRoot: {
      "& .MuiButtonBase-root": {
      }
    }
  }));

  const classes = useStyles();

  const list = (anchor) => (
    <Box
      sx={{"&&":{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}}
      role="presentation"
    >
      <List>
        <IconButton className='close-icon' onClick={toggleDrawer(false)}>
          <ChevronLeftIcon />
        </IconButton>

        <div className="login_reg_button">
          <Button 
            variant="contained"
            onClick={handleClickOpen}
            sx={{"&&":{
              color:"white",
              display:
              loggedIn ? "none" : "flex",
              backgroundColor: "#df7b84",
              ":hover": {
                backgroundColor: "white",
                color: "#df7b84", 
              }
              
            }}}
            theme={primaryTheme}
          >
            Register/Login
          </Button>
        </div>

        <AuthModal 
          open={regOpen} 
          onClose={() => setRegOpen(false)} 
          onToggle={() => setRegOpen(true)} 
          primaryTheme={primaryTheme} 
          secondaryTheme={secondaryTheme}
        />

        {/* <ListItem 
          disablePadding
          sx= {{"&&":{
            display:
              loggedIn ? "flex" : "none",
          }}}
        >
          <ListItemButton className={classes.buttonRoot}>
            <ListItemIcon>
              <FavoriteBorderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Saved Recipes'} />
          </ListItemButton>
        </ListItem> */}

          <ListItem disablePadding  onClick={()=> setState(false)}>
            <NavLink 
              to={{
                pathname: "/favourites",
              }}
              state= {{
                feed: true,
              }}
              onClick={()=> changeLocation('/favourites')}
              className={"recipe-page-button" }
            >
              <ListItemButton className={classes.buttonRoot}>
                <ListItemIcon>
                  <FavoriteBorderOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary={'Saved Recipes'}/>
              </ListItemButton>
            </NavLink>
          </ListItem>

          <ListItem disablePadding  onClick={()=> setState(false)}>
            <NavLink 
              to={{
                pathname: "/recipes",
              }}
              state= {{
                feed: true,
              }}
              onClick={()=> changeLocation('/recipes')}
              className={"recipe-page-button" }
            >
              <ListItemButton className={classes.buttonRoot}>
                <ListItemIcon>
                  <ForumOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary={'Feed'}/>
              </ListItemButton>
            </NavLink>
          </ListItem>

        <ListItem 
          disablePadding
          sx= {{"&&":{
            display:
              loggedIn ? "flex" : "none",
          }}}
          onClick={() => handleSettingsOpen(true)}
        >

          <ListItemButton className={classes.buttonRoot}>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Settings'} />
          </ListItemButton>
        </ListItem>
        
        <ListItem 
          disablePadding
          sx= {{"&&":{
            display:
              loggedIn ? "flex" : "none",
          }}}
          onClick={() => setDietOpen(true)}
        >
          <ListItemButton className={classes.buttonRoot}>
            <ListItemIcon>
              <KitchenOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'My Diet'} />
          </ListItemButton>
        </ListItem>

        
        <DietModal
          open={dietOpen}
          onClose={() => setDietOpen(false)} 
          primaryTheme={primaryTheme} 
          secondaryTheme={secondaryTheme}
        />
       

        <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} fullWidth='true' maxWidth='md'>
            <div className="confirmation_ui">
              <SettingsModalBody 
                onClose={() => setSettingsOpen(false)} 
                primaryTheme={primaryTheme} 
                secondaryTheme={secondaryTheme}
              />
            </div>
        </Dialog>


        <ListItem 
          disablePadding
          sx= {{"&&":{
            display:
              loggedIn ? "flex" : "none",
          }}}
          onClick={() => {
            dispatch(logout());
          }}
        >
          <ListItemButton onClick={()=> setState(false)} className={classes.buttonRoot}>
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