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
        // openTwoFactor,
        resetForm,
        primaryTheme,
        secondaryTheme
    } = props;

    const dispatch = useDispatch();

    // register user calling register API
    const onRegisterSubmit = () => {
        // console.log(registerDetails);
        // TWOFACTORMODAL REFACTORED
        // openTwoFactor()
        // .then(
        axios
            .post("/register/", values)
            .then((res) => console.log(res))
            .then(() => dispatch(login({ isLogged: true, diet: ''})))
            .then(() => resetForm())
            .then(() => props.onClose())
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
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                    margin="normal"
                    // variant="outlined"
                    sx={{width:"77%", paddingLeft: "10vmin"}}
                />
                <TextField
                    id="password1"
                    label="Password"
                    type="password"
                    value={values.password1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password1 ? errors.password1 : ""}
                    error={touched.password1 && Boolean(errors.password1)}
                    margin="normal"
                    // variant="outlined"
                    sx={{width:"77%", paddingLeft: "10vmin"}}
                />
                <TextField
                    id="password2"
                    label="Password"
                    type="password"
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password2 ? errors.password2 : ""}
                    error={touched.password2 && Boolean(errors.password2)}
                    margin="normal"
                    // variant="outlined"
                    sx={{width:"77%", paddingLeft: "10vmin"}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onToggle}>Already have an account?</Button>
                <Button 
                    onClick={() => onClose()}
                    variant="contained"
                    theme={secondaryTheme}
                > 
                    Close 
                </Button>
                <Button 
                    onClick={() => onRegisterSubmit()}
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

const RegisterModalBody = withFormik({
    validationSchema: yup.object().shape(validationRegister),
})(form);

export default RegisterModalBody;
