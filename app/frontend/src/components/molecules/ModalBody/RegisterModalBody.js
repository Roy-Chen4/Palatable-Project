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
import * as yup from "yup";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { login } from "../../../reducers/isLogged";
import validationRegister from "../../../validation/regSchema";
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
        openTwoFactor,
        // resetForm,
        primaryTheme,
        secondaryTheme
    } = props;

    const dispatch = useDispatch();


    const [accountError, setAccountError] = React.useState(false);

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // register user calling register API
    const onRegisterSubmit = () => {
        axios
            .post("/register/", values)
            .then((res) => console.log(res))
            .then(() => dispatch(login({ isLogged: true, email: values.email})))
            // .then(() => resetForm())
            // .then(() => props.registerClose())
            .then(() => setIsSubmitting(false))
            .catch((err) => {
                // setAccountError(true);
                // setIsSubmitting(false)
                console.log(err.request);
        })
        openTwoFactor()
    }

    return (
        <form>
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
                    id="email"
                    placeholder="Email"
                    type="email"
                    value={values.email}
                    onChange={(e) => {handleChange(e); setAccountError(false)}}
                    onBlur={handleBlur}
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                    margin="normal"
                    // variant="outlined"
                    sx={{"&&":{width:"65%", paddingLeft: "10vmin"}}}
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
                    sx={{"&&":{width:"65%", paddingLeft: "10vmin"}}}
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
                    sx={{"&&":{width:"65%", paddingLeft: "10vmin"}}}
                />
            </DialogContent>
            <p1 className="error-text" style={{visibility: accountError ? "visible" : "hidden"}}>Account already exists</p1>
            <DialogActions>
                <Button onClick={onToggle}>Already have an account?</Button>
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
                    onClick={() => onRegisterSubmit()}
                    variant="contained"
                    disabled={isSubmitting || errors.email || errors.password || accountError}
                    theme={primaryTheme}
                    sx={{"&&":{
                        color:"white",
                        backgroundColor: "#df7b84",
                    }}}
                > 
                    Register
                </Button> 
            </DialogActions>

    </form>
  );
};

const RegisterModalBody = withFormik({
    validationSchema: yup.object().shape(validationRegister),
})(form);

export default RegisterModalBody;
