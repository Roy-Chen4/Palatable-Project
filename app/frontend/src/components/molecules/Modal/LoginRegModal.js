/* eslint-disable no-unused-vars */
import * as React from 'react';
import { 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    DialogActions, 
    DialogContentText,
    TextField,
    createTheme
} 
from '@mui/material';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function RegisterModal(props) {
    // state or LoginModal
    const [loginOpen, setLoginOpen] = React.useState(false);

    // set RegisterModal closed when LoginModal opens
    const toggleRegiserModal = () => {
        props.onClose();
        setLoginOpen(true);
    };
    const toggleLoginModal = () => {
        setLoginOpen(false);
        props.onToggle();
    };

    // login details formatted for API call
    const [loginDetails, setLoginDetails] = React.useState({
        email: "", 
        password:""
      });

    // register details formatted for API call
    const [registerDetails, setRegisterDetails] = React.useState({
        email: "", 
        password1:"",
        password2:""
    });

    // onChange function for Login textfields
    const handleLoginChange = (event) => {
        // setHasError(false);
        const { name, value } = event.target;
        setLoginDetails( {
            ...loginDetails,
            [name]: value,
        })
      }

    // onChange function for Register textfields
    const handleRegisterChange = (event) => {
        // setHasError(false);
        const { name, value } = event.target;
        setRegisterDetails( {
        ...registerDetails,
        [name]: value,
        })
    }

    // handle field clears on submit
    const clearFields = () => {
        setLoginDetails( {
            email: "",
            password: "",
          })
          setRegisterDetails( {
            email: "",
            password1: "",
            password2: "",
          })
    }

    // login user calling login API
    const handleLoginSubmit = () => {
        // console.log(loginDetails);
        axios
            .post("/login/", loginDetails)
            .then((res) => console.log(res))
            .then(() => clearFields())
            // .then(() => handleLogin())
            .catch((err) => {
                console.log(err.request);
                console.log(err.request.responseText);
                // setHasError(true);
                // const obj = JSON.parse(err.request.response);
                // if (Object.keys(obj).length === 0) {
                // setErrorMessage("Invalid User")
                // } else if (obj.email !== undefined) {
                // setErrorMessage(obj.email[0])
                // } else if (obj.password !== undefined) {
                // setErrorMessage(obj.password[0])
                // }
                // console.log(err.request.responseText);
                // console.log(obj.password);
                // console.log(Object.keys(obj).length);
                // console.log(err.request.response.email);
        });
    }

    // register details user calling register API
    const handleRegisterSubmit = () => {
      console.log(registerDetails);
      axios
        .post("/register/", registerDetails)
        .then((res) => console.log(res))
        .then(() => clearFields())
        // .then(() => handleLogin())
        .catch((err) => {
            console.log(err.request);
            console.log(err.request.responseText);
        //   setHasError(true);
        //   const obj = JSON.parse(err.request.response);
        //   if (Object.keys(obj).length === 0) {
        //     setErrorMessage("Invalid User")
        //   } else if (obj.email !== undefined) {
        //     setErrorMessage(obj.email[0])
        //   } else if (obj.password !== undefined) {
        //     setErrorMessage(obj.password[0])
        //   }
        });
    }

    // Primary colour theme for buttons
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

    return (
        <div>
            <Dialog open={props.open} fullScreen>
                <div className = "banner">
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
                            //   error={hasError} 
                            autoFocus
                            margin="normal"
                            id="name"
                            name="email"
                            value={registerDetails.email}
                            onChange={handleRegisterChange}
                            type="email"
                            placeholder="Email Address"
                            sx={{width:"77%", paddingLeft: "10vmin"}}
                        />
                        <TextField 
                        //   error={hasError} 
                            margin="normal"
                            name="password1"
                            value={registerDetails.password1}
                            onChange={handleRegisterChange}
                            type="password"
                            placeholder='Enter password'
                            sx={{width:"77%", paddingLeft: "10vmin"}}
                        />
                        <TextField
                            // error={hasError} 
                            margin="normal"
                            name="password2"
                            value={registerDetails.password2}
                            onChange={handleRegisterChange}
                            type="password"
                            placeholder='Confirm password'
                            sx={{width:"77%", paddingLeft: "10vmin"}}
                        />
                    </DialogContent>
                </div>
                <DialogActions>
                    <Button onClick={toggleRegiserModal}>Already have an account?</Button>
                    <Button theme={secondaryTheme} sx={{width:"100px"}} variant="contained" onClick={props.onClose}>Cancel</Button>
                    <Button theme={primaryTheme} sx={{width:"100px",color:"white"}} variant="contained" onClick={handleRegisterSubmit}>Register</Button>
                </DialogActions>
            </Dialog>
                <Dialog open={loginOpen} fullWidth='true' maxWidth='md'>
                <div className="confirmation_ui">
                <DialogTitle>
                    <p1 className='conf_heading'>
                        Log In
                    </p1>
                </DialogTitle>
                <DialogContent>
                <TextField
                    // error={hasError} 
                    margin="normal"
                    name="email"
                    id='loginEmail'
                    value={loginDetails.email}
                    placeholder='Email Address'
                    onChange={handleLoginChange}
                    sx={{width:"70%"}}
                />
                <TextField
                    // error={hasError} 
                    margin="normal"
                    name="password"
                    id='loginPassword'
                    value={loginDetails.password}
                    placeholder='Password'
                    type="password"
                    onChange={handleLoginChange}
                    sx={{width:"70%"}}
                />
                </DialogContent>
                </div>
                <DialogActions>
                    <Button onClick={toggleLoginModal}>Don&apos;t have an account?</Button>
                    <Button 
                        onClick={() => setLoginOpen(false)}
                        variant="contained"
                        theme={secondaryTheme}
                    > 
                        Close 
                    </Button>
                    <Button 
                        onClick={handleLoginSubmit}
                        variant="contained"
                        theme={primaryTheme}
                        sx={{color:"white"}}
                    > 
                        Log In 
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

RegisterModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onToggle: PropTypes.func,
}