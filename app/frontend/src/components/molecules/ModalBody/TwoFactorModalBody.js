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
// import validationLogin from "../../../validation/loginSchema";
import { withFormik } from "formik";
// import * as yup from "yup";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../reducers/isLogged";
import { login } from "../../../reducers/isLogged";
import validationRegister from "../../../validation/regSchema";
import "./ModalBody.css"

const form = props => {
    const {
        values,
        // touched,
        errors,
        handleChange,
        handleBlur,
        onClose,
        onSubmit,
        registerClose,
        resetForm,
        primaryTheme,
        secondaryTheme
    } = props;

    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // const [accountError, setAccountError] = React.useState(false);

    const userEmail = useSelector((state) => state.user.value.email);

    // login user calling login API
    const onTwoFactorSubmit = () => {
        setIsSubmitting(true);
        console.log(values)
     

        axios
            .post("/twofac/", values)
            .then((res) => console.log(res))
            .then(() => resetForm())
            .then(() => onClose())
            .then(() => registerClose())
            .then(() => setIsSubmitting(false))
            .then(() => dispatch(login({ isLogged: true, email: values.email, diet: ''})))
            .catch((err) => {
                // setAccountError(true);
                // setIsSubmitting(false);
                console.log(err.request);
        });
    }

    return (
        <form>
            <DialogTitle>
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
                    onChange={(e) => {handleChange(e)}}
                    onBlur={handleBlur}
                    //helperText={touched.password ? errors.password : ""}
                    //error={(touched.password && Boolean(errors.password))}
                    margin="dense"
                    // variant="outlined"
                    sx={{width:"70%"}}
                />
            </DialogContent>
            {/* <p1 className="error-text" style={{visibility: accountError ? "visible" : "hidden"}}>Invalid Email or Password</p1> */}
            <DialogActions>
                <Button 
                    onClick={() => {onClose()}}
                    variant="contained"
                    theme={secondaryTheme}
                > 
                    Close 
                </Button>
                <Button 
                    onClick={() => onTwoFactorSubmit()}
                    variant="contained"
                    disabled={isSubmitting 
                        // || errors.email || errors.password
                    }
                    theme={primaryTheme}
                    sx={{color:"white"}}
                > 
                    Submit
                </Button> 
            </DialogActions>
        </form>
    );
};

const TwoFactorModalBody = withFormik({
    // validationSchema: yup.object().shape(validationLogin),
})(form);

export default TwoFactorModalBody;
