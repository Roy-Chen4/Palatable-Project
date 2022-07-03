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
import { useDispatch } from 'react-redux';
import { login } from '../../../reducers/isLogged';
import LoginModalBody from '../ModalBody/LoginModalBody';
import RegisterModalBody from '../ModalBody/RegisterModalBody';
// TWO FACTOR MODAL REFACTORED
// import TwoFactorModal from './TwoFactorModal';

export default function AuthModal(props) {
    const dispatch = useDispatch()

    // state of RegisterModal
    const [regOpen, setRegOpen] = React.useState(false);

    // state of TwoFactorModal
    // TWOFACTORMODAL REFACTORED
    // const [twoFactorOpen, setTwoFactorOpen] = React.useState(false);

    // set RegisterModal closed when LoginModal opens
    const toggleLoginModal = () => {
        props.onClose();
        setRegOpen(true);
    };
    const toggleRegisterModal = () => {
        setRegOpen(false);
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

    // // onChange function for Login textfields
    // const handleLoginChange = (event) => {
    //     // setHasError(false);
    //     const { name, value } = event.target;
    //     setLoginDetails( {
    //         ...loginDetails,
    //         [name]: value,
    //     })
    //   }

    // // onChange function for Register textfields
    // const handleRegisterChange = (event) => {
    //     // setHasError(false);
    //     const { name, value } = event.target;
    //     setRegisterDetails( {
    //     ...registerDetails,
    //     [name]: value,
    //     })
    // }

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

    // const [hasError, setHasError] = React.useState(false);
    // const [errorMessage, setErrorMessage] = React.useState("")

    // register details user calling register API
    const handleRegisterSubmit = () => {
        console.log(registerDetails);
        // TWOFACTORMODAL REFACTORED
        // setTwoFactorOpen(true)
        // .then(
        axios
            .post("/register/", registerDetails)
            .then((res) => console.log(res))
            .then(() => clearFields())
            .then(() => dispatch(login({ isLogged: true, diet: ''})))
            .then(() => setRegOpen(false))
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
            })
        // );
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
            <Dialog open={props.open} onClose={() => props.onClose()} fullWidth='true' maxWidth='md'>
                <div className="confirmation_ui">
                    <LoginModalBody onClose={props.onClose} onToggle={() => toggleLoginModal()} primaryTheme={primaryTheme} secondaryTheme={secondaryTheme}/>
                </div>
            </Dialog>

            {/* TWOFACTORMODAL REFACTORED */}
            {/* <TwoFactorModal open={twoFactorOpen} onClose={() => setTwoFactorOpen(false)}></TwoFactorModal> */}

            <Dialog open={regOpen} fullScreen>
                <div className = "banner">
                    <img src="https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" className="register_banner" alt="loginbanner"/>
                </div>
                <div className='register_ui'>
                    <RegisterModalBody 
                        onClose={() => setRegOpen(false)} 
                        onToggle={() => toggleRegisterModal()} 
                        // openTwoFactor={() => setTwoFactorOpen(true)}
                        primaryTheme={primaryTheme} 
                        secondaryTheme={secondaryTheme}
                    />   
                </div>
            </Dialog>
        </div>
    )

}

AuthModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onToggle: PropTypes.func,
}