/* eslint-disable no-unused-vars */
import React from "react";
import { 
    DialogContent,
    DialogContentText, 
    DialogTitle, 
    TextField,
    DialogActions, 
    Button
} 
from '@mui/material';
import { withFormik } from "formik";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { login, tokenStore } from "../../../../reducers/isLogged";
import "../ModalBody.css"

const form = props => {
    const {
        values,
        errors,
        handleChange,
        handleBlur,
        onClose,
        onSubmit,
        registerClose,
        resetForm,
        primaryTheme,
        secondaryTheme,
        openAlert,
        closeAlert,
    } = props;

    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [codeError, setCodeError] = React.useState(false);

    const userEmail = useSelector((state) => state.user.value.email);

    // login user calling login API
    const onTwoFactorSubmit = () => {
        setIsSubmitting(true);
        axios
            .post("/twofacregister/", values)
            .then((res) => {
                console.log(res)
                dispatch(tokenStore({token: res.data.jwt}))
            })
            .then(() => resetForm())
            .then(() => onSubmit())
            .then(() => registerClose())
            .then(() => setIsSubmitting(false))
            .then(() => dispatch(login({ isLogged: true, email: userEmail})))
            .catch((err) => {
                if (err.request.response === 'incorrectcode') {
                    setCodeError(true);
                    setIsSubmitting(false);
                    console.log(err.request);
                } else {
                    onClose()
                    openAlert()
                    setTimeout(function() { 
                        closeAlert()
                    }.bind(this), 1500)
                    // account does not exist popup
                }
        });
    }

    return (
        <form>
            <DialogTitle onClick={() => onSubmit()}>
                <p1 className='conf_heading'>
                    Account Confirmation
                </p1>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                 Please enter the five letter code that was emailed to you.
               </DialogContentText>
                <TextField
                    id="codeDetail"
                    placeholder='AAAAA'
                    type="password"
                    value={values.codeDetail}
                    onChange={(e) => {
                        handleChange(e)
                        setCodeError(false);
                    }}
                    onBlur={handleBlur}
                    margin="dense"
                    sx={{"&&":{width:"70%"}}}
                />
            </DialogContent>
            <p1 className="error-text" style={{visibility: codeError ? "visible" : "hidden"}}>Invalid Code</p1>
            <DialogActions>
                <Button 
                    onClick={() => {onClose()}}
                    variant="contained"
                    theme={secondaryTheme}
                    sx={{"&&":{
                        color:"white",
                        backgroundColor: "#df7b84",
                        ":hover": {
                            color: "#df7b84", 
                            backgroundColor: "white",
                        }
                    }}}
                > 
                    Close 
                </Button>
                <Button 
                    onClick={() => onTwoFactorSubmit()}
                    variant="contained"
                    disabled={isSubmitting || codeError}
                    theme={primaryTheme}
                    sx={{"&&":{
                        color: "#df7b84", 
                        backgroundColor: "white",
                        ":hover": {
                            color:"white",
                            backgroundColor: "#df7b84",
                        }
                    }}}
                > 
                    Submit
                </Button> 
            </DialogActions>
        </form>
    );
};

const TwoFactorRegisterModalBody = withFormik({})(form);

export default TwoFactorRegisterModalBody;
