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
        resetForm,
    } = props;
    
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const userEmail = useSelector((state) => state.user.value.email);

    const onFormSubmit = () => {
        setIsSubmitting(true);
        const recipe = {
            title: values.title,
            // image: values.image,
            // ingredients: values.ingredients,
            // tags: values.tags,
            // instructions: values.instructions,
        }
        // use values to Send in axios request to save the recipe in creator db
        const valuesToSend = {
            email: userEmail,
            recipe: JSON.stringify(recipe)
        }
        console.log("form values: " + recipe)
    }

    return (
        <form>
            <div className="inputs">
                <TextField
                        id="recipetitle"
                        placeholder="Title"
                        value={values.recipetitle}
                        onChange={(e) => {handleChange(e)}}
                        onBlur={handleBlur}
                        helperText={touched.recipetitle ? errors.recipetitle : ""}
                        error={touched.recipetitle && Boolean(errors.recipetitle)}
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
                    onClick={() => onFormSubmit()}
                    variant="contained"
                    disabled={isSubmitting || errors.recipetitle}
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
