/* eslint-disable no-unused-vars */
import {
    Button, TextField
} from '@mui/material';
import { withFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
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
    const [imageURL, setImageURL] = React.useState("");
    const userEmail = useSelector((state) => state.user.value.email);

    const onFormSubmit = () => {
        setIsSubmitting(true);
        const recipe = {
            title: values.recipetitle,
            // image: values.image,
            // ingredients: values.ingredients,
            // tags: values.tags,
            // instructions: values.instructions,
        }
        setTimeout(function() { 
            setIsSubmitting(false);
        }.bind(this), 1000)
        // use values to Send in axios request to save the recipe in creator db
        const valuesToSend = {
            email: userEmail,
            recipe: JSON.stringify(recipe)
        }
        console.log("form values: " + recipe)
        console.log("recipe title: " + values.recipetitle)
    }

//    function handleImageChange(event) {
//         const reader = new FileReader();
//         reader.onload = () => {
//             if (reader.readyState === 2) {
//                 setImageURL({file: reader.result})
//             }
//         } 
//         reader.readAsDataURL(event.target.files[0]);
//         this.props.sfv("image", event.currentTarget.files[0]);
//     }

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
            <input
                className="image-input"
                name={"image-input"}
                type="file"
                onChange={(e)=>handleChange(e)}
            />

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
