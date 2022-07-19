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
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../reducers/isLogged";
import Radio from '@mui/material/Radio';
import EditFieldButton from "../../atoms/EditFieldButton/EditFieldButton";
import validationSettings from "../../../validation/settingSchema";
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
        secondaryTheme,
        setFieldValue
    } = props;

    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [accountError, setAccountError] = React.useState(false);
    
    const [editDisable, setEditDisable] = React.useState(true);
    
    const [toggleEmailPass, setToggleEmailPass] = React.useState(true);

    const userEmail = useSelector((state) => state.user.value.email);
    
    
    // password change calling editpassword API
    const onEmailSubmit = () => {
        setIsSubmitting(true);
        const editEmail = {
            old_email: userEmail,
            new_email: values.email,
        }
        axios
            .post("/editemail/", editEmail)
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
    // password change calling editpassword API
    const onPasswordSubmit = () => {
        setIsSubmitting(true);
        const editPassword = {
            email: userEmail,
            new_password1: values.password1,
            new_password2: values.password2,
        }
        console.log(editPassword)
        axios
            .post("/edituserpassword/", editPassword)
            .then((res) => console.log(res))
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
            <Button 
                onClick={() => {
                    setToggleEmailPass(true);
                    setEditDisable(true);
                    setAccountError(false);
                    setFieldValue("toggle", true);
                    setFieldValue("email", userEmail);
                }}
                variant={toggleEmailPass ? "contained" : "outlined"}
                theme={secondaryTheme}
                sx={{"&&":{
                    color:"black",
                    fontWeight: toggleEmailPass ? "bold" : "normal",
                    width:"20%"
                }}}
                control={<Radio />} 
            > 
                Email
            </Button>
            <Button 
                onClick={() => {
                    setToggleEmailPass(false);
                    setEditDisable(true);
                    setAccountError(false);
                    setFieldValue("toggle", false);
                    setFieldValue("password1", '');
                    setFieldValue("password2", '');
                }}
                variant={toggleEmailPass ? "outlined" : "contained"}
                theme={secondaryTheme}
                sx={{"&&":{
                    color:"black",
                    fontWeight: toggleEmailPass ? "normal" : "bold",
                    width:"20%",
                }}}
            > 
                Password 
            </Button> 
            <DialogContent>
                <TextField
                    id="toggle"
                    defaultValue={true}
                    value={values.toggle}
                    sx={{"&&":{
                        display: 'none',
                        width:"70%"
                    }}}
                />
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
                    variant="outlined"
                    sx={{"&&":{
                        display: toggleEmailPass ? "inline-flex" : "none",
                        width:"70%"
                    }}}
                    disabled={editDisable}
                    InputProps={{endAdornment: <EditFieldButton onClick={() => setEditDisable(false)}/>}}
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
                    variant="outlined"
                    sx={{"&&":{
                        visibility: toggleEmailPass ? "hidden" : "visible",
                        width:"70%"
                    }}}
                    disabled={editDisable}
                    InputProps={{endAdornment: <EditFieldButton onClick={() => setEditDisable(false)}/>}}
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
                    variant="outlined"
                    sx={{"&&":{
                        display: toggleEmailPass ? "none" : "inline-flex",
                        width:"70%"
                    }}}
                    disabled={editDisable}
                />
            </DialogContent>
            <p1 className="error-text" style={{visibility: accountError ? "visible" : "hidden"}}>Invalid {toggleEmailPass ? " email" : " password"}</p1>
            <DialogActions>
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
                    id="emailSubmit"
                    onClick={() => onEmailSubmit()}
                    variant="contained"
                    disabled={isSubmitting || errors.email}
                    theme={primaryTheme}
                    sx={{
                        display: toggleEmailPass ? "inline-flex" : "none",
                        color:"white",
                        backgroundColor: "#df7b84",
                    }}
                    > 
                    Save 
                </Button> 
                <Button 
                    id="passwordSubmit"
                    onClick={() => onPasswordSubmit()}
                    variant="contained"
                    disabled={isSubmitting || errors.password1 || errors.password2}
                    theme={primaryTheme}
                    sx={{
                        display: toggleEmailPass ? "none" : "inline-flex",
                        color:"white",
                        backgroundColor: "#df7b84",
                    }}
                > 
                    Save 
                </Button> 
            </DialogActions>
        </form>
    );
};

const SettingsModalBody = withFormik({
    setFieldValue(){},
    validationSchema: yup.object().shape(validationSettings),
})(form);

export default SettingsModalBody;
