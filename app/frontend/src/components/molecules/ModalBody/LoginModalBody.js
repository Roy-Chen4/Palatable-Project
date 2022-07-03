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
import "./ModalBody.css"

const form = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        onToggle,
        onClose,
        resetForm,
        primaryTheme,
        secondaryTheme
    } = props;

    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [accountError, setAccountError] = React.useState(false);

    // login user calling login API
    const onLoginSubmit = () => {
        setIsSubmitting(true);
        console.log(errors)
        axios
            .post("/login/", values)
            .then((res) => console.log(res))
            .then(() => dispatch(login({ isLogged: true, email: values.email, diet: ''})))
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
                    Log In
                </p1>
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="email"
                    label="Email"
                    type="email"
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
                    id="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={(e) => {handleChange(e); setAccountError(false)}}
                    onBlur={handleBlur}
                    helperText={touched.password ? errors.password : ""}
                    error={(touched.password && Boolean(errors.password))}
                    margin="dense"
                    // variant="outlined"
                    sx={{width:"70%"}}
                />
            </DialogContent>
            <p1 className="error-text" style={{visibility: accountError ? "visible" : "hidden"}}>Invalid Email or Password</p1>
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
                    disabled={isSubmitting || errors.email || errors.password}
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
