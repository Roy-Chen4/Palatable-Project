/* eslint-disable no-unused-vars */
import React from "react";
import { 
    DialogContent, 
    DialogTitle, 
    TextField,
    DialogActions, 
    Button
} 
from '@mui/material';
import validationRegister from "../../../validation/regSchema";
import { withFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../reducers/isLogged";
import "./ModalBody.css"

const form = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        onClose,
        resetForm,
        primaryTheme,
        secondaryTheme
    } = props;

    // const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [accountError, setAccountError] = React.useState(false);

    const userEmail = useSelector((state) => state.user.value.email);

    // login user calling login API
    const onSettingSubmit = () => {
        setIsSubmitting(true);
        console.log(errors);
        const editDetails = {
            email: userEmail,
            new_password1: values.password1,
            new_password2: values.password2,
        }
        axios
            .post("/editpassword/", editDetails)
            .then((res) => console.log(res))
            // .then(() => dispatch(login({ isLogged: true, email: values.email, diet: ''})))
            .then(() => resetForm())
            .then(() => props.onClose())
            .then(() => setIsSubmitting(false))
            .catch((err) => {
                setAccountError(true);
                setIsSubmitting(false);
                console.log(err.request);
        });
    }
    return (
        <form>
            <DialogTitle>
                <p1 className='conf_heading'>
                    User Settings
                </p1>
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    defaultValue={userEmail}
                    value={values.email}
                    onChange={(e) => {handleChange(e); setAccountError(false)}}
                    onBlur={handleBlur}
                    helperText={touched.email ? errors.email : ""}
                    error={(touched.email && Boolean(errors.email))}
                    margin="normal"
                    // variant="outlined"
                    sx={{width:"70%"}}
                />
                <TextField
                    id="password1"
                    placeholder="Password"
                    type="password"
                    value={values.password1}
                    onChange={(e) => {handleChange(e); setAccountError(false)}}
                    onBlur={handleBlur}
                    helperText={touched.password1 ? errors.password1 : ""}
                    error={touched.password1 && Boolean(errors.password1)}
                    margin="normal"
                    // variant="outlined"
                    sx={{width:"70%"}}
                />
                <TextField
                    id="password2"
                    placeholder="Confirm Password"
                    type="password"
                    value={values.password2}
                    onChange={(e) => {handleChange(e); setAccountError(false)}}
                    onBlur={handleBlur}
                    helperText={touched.password2 ? errors.password2 : ""}
                    error={touched.password2 && Boolean(errors.password2)}
                    margin="normal"
                    // variant="outlined"
                    sx={{width:"70%"}}
                />
            </DialogContent>
            <p1 className="error-text" style={{visibility: accountError ? "visible" : "hidden"}}>Invalid Email or Password</p1>
            <DialogActions>
                <Button 
                    onClick={() => onClose()}
                    variant="contained"
                    theme={secondaryTheme}
                > 
                    Close 
                </Button>
                <Button 
                    onClick={() => onSettingSubmit()}
                    variant="contained"
                    disabled={isSubmitting || errors.email || errors.password}
                    theme={primaryTheme}
                    sx={{color:"white"}}
                > 
                    Save 
                </Button> 
            </DialogActions>
        </form>
    );
};

const SettingsModalBody = withFormik({
    validationSchema: yup.object().shape(validationRegister),
})(form);

export default SettingsModalBody;
