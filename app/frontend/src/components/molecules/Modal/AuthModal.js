/* eslint-disable no-unused-vars */
import {
    createTheme, Dialog
} from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';
import LoginModalBody from '../ModalBody/LoginModalBody';
import RegisterModalBody from '../ModalBody/RegisterModalBody';
// TWO FACTOR MODAL REFACTORED
// import TwoFactorModal from './TwoFactorModal';

export default function AuthModal(props) {
    // state of RegisterModal
    const [regOpen, setRegOpen] = React.useState(false);

    // state of TwoFactorModal
    // TWOFACTORMODAL REFACTORED
    // const [twoFactorOpen, setTwoFactorOpen] = React.useState(false);

    // set LoginModal closed when RegisterModal opens
    const toggleLoginModal = () => {
        props.onClose();
        setRegOpen(true);
    };
    
    // set RegisterModal closed when LoginModal opens
    const toggleRegisterModal = () => {
        setRegOpen(false);
        props.onToggle();
    };

    // const [hasError, setHasError] = React.useState(false);
    // const [errorMessage, setErrorMessage] = React.useState("")

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