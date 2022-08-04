import React from "react";
import { 
    DialogContent, 
    DialogTitle, 
    TextField,
    DialogActions, 
    Button
} 
from '@mui/material';
import { withFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { useSelector } from "react-redux";
import validationForgottenPass from "../../../validation/forgottenPassSchema";
import "./ModalBody.css"

/** 
* @summary Handles the forgotten password function that appears after three incorrect
* password attempts
* @param props
* @return My diet component in the drawer
*/
const form = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        onClose,
        onSubmit,
        resetForm,
        openAlert,
        closeAlert,
        primaryTheme,
        secondaryTheme,
    } = props;

    const userEmail = useSelector((state) => state.user.value.email);

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [passwordError, setPasswordError] = React.useState(false);
    
    // password change calling editpassword API
    const onPasswordSubmit = () => {
        setIsSubmitting(true);
        const editPassword = {
            email: userEmail,
            new_password1: values.password1,
            new_password2: values.password2,
        }
        axios
            .post("/editpassword/", editPassword)
            .then((res) => console.log(res))
            .then(() => resetForm())
            .then(() => onSubmit())
            .then(() => setIsSubmitting(false))
            .then(() => openAlert())
            .then(() => {
                setTimeout(function() {
                    closeAlert();
                }.bind(this), 1500)
            })
            .catch((err) => { 
                setPasswordError(true);
                setIsSubmitting(false);
                console.log(err.request);
        });
    }

    return (
        <form>
            <DialogTitle>
                <p1 className='conf_heading'>
                    Reset Your Password
                </p1>
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="password1"
                    placeholder="Password"
                    type="password"
                    value={values.password1}
                    onChange={(e) => {handleChange(e); setPasswordError(false)}}
                    onBlur={handleBlur}
                    helperText={touched.password1 ? errors.password1 : ""}
                    error={touched.password1 && Boolean(errors.password1)}
                    margin="normal"
                    variant="outlined"
                    sx={{ 
                        "&&":{
                            width:"70%"
                        }
                    }}
                />
                <TextField
                    id="password2"
                    placeholder="Confirm Password"
                    type="password"
                    value={values.password2}
                    onChange={(e) => {handleChange(e); setPasswordError(false)}}
                    onBlur={handleBlur}
                    helperText={touched.password2 ? errors.password2 : ""}
                    error={touched.password2 && Boolean(errors.password2)}
                    margin="normal"
                    variant="outlined"
                    sx={{
                        "&&":{
                            width:"70%"
                        }
                    }}
                />
            </DialogContent>
            <p1 className="error-text" style={{visibility: passwordError ? "visible" : "hidden"}}>Invalid password</p1>
            <DialogActions>
                <Button 
                    onClick={() => onClose()}
                    variant="contained"
                    theme={secondaryTheme}
                    sx={{"&&":{
                        color:"#df7b84",
                        backgroundColor: "white",
                        ":hover": {
                            backgroundColor: "#df7b84",
                            color: "#white", 
                        }
                    }}}

                > 
                    Close 
                </Button>
                <Button 
                    id="passwordSubmit"
                    onClick={() => onPasswordSubmit()}
                    variant="contained"
                    disabled={isSubmitting || errors.password}
                    theme={primaryTheme}
                    sx={{"&&":{
                        color:"white",
                        backgroundColor: "#df7b84",
                        ":hover": {
                            backgroundColor: "white",
                            color: "#df7b84", 
                        }
                    }}}
                > 
                    Save 
                </Button> 
            </DialogActions>
        </form>
    );
};

const ForgottenPassModalBody = withFormik({
    validationSchema: yup.object().shape(validationForgottenPass),
})(form);

export default ForgottenPassModalBody;
