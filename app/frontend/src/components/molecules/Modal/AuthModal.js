import { Dialog, Alert, AlertTitle } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';
import LoginModalBody from '../ModalBody/LoginModalBody';
import RegisterModalBody from '../ModalBody/RegisterModalBody';
import TwoFactorModalBody from '../ModalBody/TwoFactorModalBody';
import { useDispatch } from 'react-redux';
import { logout } from '../../../reducers/isLogged';
import ForgottenPassModalBody from '../ModalBody/ForgottenPassModalBody';


export default function AuthModal(props) {
    const dispatch = useDispatch();
    // state of RegisterModal
    const [regOpen, setRegOpen] = React.useState(false);
    
    // state of forgotten password modal
    const [forgottenPassOpen, setForgottenPassOpen] = React.useState(false);
    
    // count of incorrect entries
    const [loginFailCount, setLoginFailCount] = React.useState(0);
    
    // state of alert modal
    const [successModalOpen, setSuccessModalOpen] = React.useState(false);
    // state of alert modal
    const [failModalOpen, setFailModalOpen] = React.useState(false);

    // state of TwoFactorModal
    // TWOFACTORMODAL REFACTORED
    const [twoFactorOpen, setTwoFactorOpen] = React.useState(false);

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

    const increaseLoginFailCount = () => {
        setLoginFailCount(loginFailCount+1);
    }

    return (
        <div>
            <Dialog open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>                
                <Alert severity="success" spacing={2}>
                    <AlertTitle>Your Password has been changed</AlertTitle>
                </Alert>
            </Dialog>
            <Dialog open={failModalOpen} onClose={() => setFailModalOpen(false)}>                
                <Alert severity="error" spacing={2}>
                    <AlertTitle>Account already exists</AlertTitle>
                </Alert>
            </Dialog>

            <Dialog open={props.open} onClose={() => props.onClose()} fullWidth='true' maxWidth='md'>
                <div className="confirmation_ui">
                    <LoginModalBody 
                        onClose={props.onClose} 
                        onToggle={() => toggleLoginModal()} 
                        openTwoFactor={() => setTwoFactorOpen(true)}
                        openForgottenPass={() => setForgottenPassOpen(true)}
                        failCount={loginFailCount}
                        resetFailCount={() => setLoginFailCount(0)}
                        increaseFailCount={increaseLoginFailCount}
                        primaryTheme={props.primaryTheme} 
                        secondaryTheme={props.secondaryTheme}
                    />
                </div>
            </Dialog>
            
            <Dialog open={forgottenPassOpen} onClose={() => setForgottenPassOpen(false)} fullWidth='true' maxWidth='md'>
                <div className="confirmation_ui">
                    <ForgottenPassModalBody
                        onClose={() => setForgottenPassOpen(false)}
                        onSubmit={() => {
                            setForgottenPassOpen(false);
                            setLoginFailCount(0);
                        }}
                        primaryTheme={props.primaryTheme} 
                        secondaryTheme={props.secondaryTheme}
                        openAlert={() => setSuccessModalOpen(true)}
                        closeAlert={() => setSuccessModalOpen(false)}
                    />
                </div>
            </Dialog>

            <Dialog open={twoFactorOpen} fullWidth='true' maxWidth='md'>
                <div className="confirmation_ui">
                    <TwoFactorModalBody 
                        onClose={() => {
                            setTwoFactorOpen(false);
                            setForgottenPassOpen(false);
                            dispatch(logout());
                        }} 
                        onSubmit={() => setTwoFactorOpen(false)}
                        registerClose={() => setRegOpen(false)}
                        primaryTheme={props.primaryTheme} 
                        secondaryTheme={props.secondaryTheme}
                        openAlert={() => setFailModalOpen(true)}
                        closeAlert={() => setFailModalOpen(false)}
                    />
                </div>
            </Dialog>



            <Dialog open={regOpen} fullScreen>
                <div className = "banner">
                    <img src="https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" className="register_banner" alt="loginbanner"/>
                </div>
                <div className='register_ui'>
                    <RegisterModalBody 
                        onClose={() => setRegOpen(false)} 
                        onToggle={() => toggleRegisterModal()} 
                        openTwoFactor={() => setTwoFactorOpen(true)}
                        primaryTheme={props.primaryTheme} 
                        secondaryTheme={props.secondaryTheme}
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
    primaryTheme: PropTypes.func,
    secondaryTheme: PropTypes.func,
}