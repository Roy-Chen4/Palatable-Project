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
import validationLogin from "../../../validation/loginSchema";
import { withFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { login } from "../../../reducers/isLogged";

const form = props => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        onToggle,
        onClose,
        resetForm,
        primaryTheme,
        secondaryTheme
    } = props;

    const dispatch = useDispatch();

    // login user calling login API
    const onLoginSubmit = () => {
        console.log("hello")
        axios
            .post("/login/", values)
            .then((res) => console.log(res))
            .then(() => dispatch(login({ isLogged: true, diet: ''})))
            .then(() => resetForm())
            .then(() => props.onClose())
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
    return (
        <form>
            <DialogTitle>
                <p1 className='conf_heading'>
                    Log In
                </p1>
            </DialogTitle>
            <DialogContent>
                <TextField
                id="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
                margin="normal"
                // variant="outlined"
                sx={{width:"70%"}}
                />
                <TextField
                id="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                margin="normal"
                // variant="outlined"
                sx={{width:"70%"}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onToggle}>Don&apos;t have an account?</Button>
                <Button 
                    onClick={() => onClose()}
                    variant="contained"
                    theme={secondaryTheme}
                > 
                    Close 
                </Button>
                <Button 
                    onClick={() => onLoginSubmit()}
                    variant="contained"
                    disabled={isSubmitting}
                    theme={primaryTheme}
                    sx={{color:"white"}}
                > 
                    Log In 
                </Button> 
            </DialogActions>
        </form>
    );
};

const LoginModalBody = withFormik({
    validationSchema: yup.object().shape(validationLogin),
})(form);

export default LoginModalBody;
