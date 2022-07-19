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
import { dietChange, login } from "../../../reducers/isLogged";
import { set } from "../../../reducers/isFavourited";
import "./ModalBody.css"


const form = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        onToggle,
        openTwoFactor,
        openForgottenPass,
        onClose,
        failCount, 
        increaseFailCount,
        resetFailCount,
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
        dispatch(login({ isLogged: false, email: values.email}));
        axios
            .post("/login/", values)
            .then((res) => {
                console.log(res)
                dispatch(dietChange({newUserDiet: res.data.diet}))
                /* 
                const jsonRecipe = JSON.parse(res.data.favourites)
                console.log(jsonRecipe) */
                console.log(res.data.favourites)
                dispatch(set({new_favourite: "hello"}))
            })
            .then(() => dispatch(login({ isLogged: true, email: values.email})))
            .then(() => resetForm())
            .then(() => props.onClose())
            .then(() => setIsSubmitting(false))
            .catch((err) => {
                setAccountError(true);
                setIsSubmitting(false);
                increaseFailCount();
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
                    onChange={(e) => {
                        handleChange(e); 
                        setAccountError(false);
                        resetFailCount();
                    }}
                    onBlur={handleBlur}
                    helperText={touched.email ? errors.email : ""}
                    error={(touched.email && Boolean(errors.email))}
                    margin="normal"
                    sx={{"&&":{width:"70%"}}}
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
                    margin="normal"
                    sx={{"&&":{width:"70%"}}}
                />
            </DialogContent>
            <p1 className="error-text" style={{visibility: accountError ? "visible" : "hidden"}}>Invalid Email or Password</p1>
            <div>
                <Button 
                    className="error-text" 
                    onClick={() => {
                        axios
                            .post("/sendtwofac/", {email: values.email})
                            .then((res) => console.log(res))
                            .catch((err) => {
                                console.log(err.request);
                        })
                        openForgottenPass();
                        openTwoFactor();
                    }}
                    style={{visibility: failCount===3 ? "visible" : "hidden",}}
                >
                    Forgot your password?
                </Button>
            </div>
            <DialogActions>
                <Button onClick={onToggle}>Don&apos;t have an account?</Button>
                <Button 
                    onClick={() => onClose()}
                    variant="contained"
                    theme={secondaryTheme}
                    sx={{"&&":{
                        color:"#df7b84",
                        backgroundColor: "white",
                    }}}
                > 
                    Close 
                </Button>
                <Button 
                    onClick={() => onLoginSubmit()}
                    variant="contained"
                    disabled={isSubmitting || errors.email || errors.password || accountError}
                    theme={primaryTheme}
                    sx={{
                        color:"white",
                        backgroundColor: "#df7b84",
                    }}
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
