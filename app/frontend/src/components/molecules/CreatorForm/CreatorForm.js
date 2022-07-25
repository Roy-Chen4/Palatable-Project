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
import { withFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { useSelector } from "react-redux";
import validationCreator from "../../../validation/creatorSchema";

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
    } = props;
    
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    return (
        <form>
            <div className="inputs">
                <TextField
                        id="recipetitle"
                        placeholder="Title"
                        value={values.recipetitle}
                        onChange={(e) => {handleChange(e)}}
                        onBlur={handleBlur}
                        // helperText={touched.password1 ? errors.password1 : ""}
                        error={touched.password1 && Boolean(errors.password1)}
                        margin="normal"
                        variant="outlined"
                        sx={{ 
                            "&&":{
                                width:"70%"
                            }
                        }}
                />
            </div>
            <div className="submit-button">
                <Button 
                    id="submit"
                    onClick={() => console.log("mock creator form added: "+ values)}
                    variant="contained"
                    disabled={isSubmitting || errors}
                    // theme={primaryTheme}
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
            </div>
        </form>
    );
};

const CreatorForm = withFormik({
    validationSchema: yup.object().shape(validationCreator),
})(form);

export default CreatorForm;
