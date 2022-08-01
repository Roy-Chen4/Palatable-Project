/* eslint-disable no-unused-vars */
import {
    Button, TextField, Typography
} from '@mui/material';
import axios from 'axios';
import { withFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import validationCreator from "../../../validation/creatorSchema";
import './CreatorForm.css';

const form = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        resetForm,
        setFieldValue,
        openAlert,
        closeAlert,
    } = props;
    
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [imageURL, setImageURL] = React.useState();
    const userEmail = useSelector((state) => state.user.value.email);

    const onFormSubmit = () => {
        setIsSubmitting(true);
        const recipe = {
            title: values.recipetitle,
            image: values.image,
            ingredients: values.ingredients,
            // tags: values.tags,
            instructions: values.instructions,
        }
        /* setTimeout(function() { 
            setIsSubmitting(false);
        }.bind(this), 1000) */
        // use values to Send in axios request to save the recipe in creator db
        const valuesToSend = {
            email: userEmail,
            recipe: JSON.stringify(recipe)
        }
        axios.post("/addrecipe/", valuesToSend) 
            .then((res) => {
                console.log(res)
                openAlert();
            }).then(() => {
                setTimeout(function() {
                    setIsSubmitting(false);
                    closeAlert();
                    window.location.reload();
                }.bind(this), 2000)
            })
            .catch((err) => {
                console.log(err.request);
                setIsSubmitting(false);
            });
            
        console.log("form values: " + recipe)
        console.log("recipe title: " + values.recipetitle)
        console.log("ingredients: " + values.ingredients)
        console.log("instructions: " + values.instructions)
        console.log(values)
        console.log(valuesToSend)
        console.log(userEmail)
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

    function setImage() {
        const reader = new FileReader();
        reader.onload = () => {
            setImageURL(reader.result)
        } 
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
                                width:"50%"
                            }
                        }}
                />
            </div>
            <div className='image-display'>
                <img src={imageURL} width="180px" height="180px" className="image"/>
            </div>
            <div>
            <div className='instruction-text'>
                <Typography>
                    Enter Image as URL
                </Typography>
            </div>
                <TextField
                    id="image"
                    placeholder="URL"
                    value={values.image}
                    type="url"
                    onChange={(e) => {
                        handleChange(e)
                        setImageURL(e.target.value)
                    }}
                    onBlur={handleBlur}
                    // helperText={touched.recipetitle ? errors.recipetitle : ""}
                    // error={touched.recipetitle && Boolean(errors.recipetitle)}
                    margin="normal"
                    variant="outlined"
                    sx={{ 
                        "&&":{
                            width:"50%"
                        }
                    }}
                />
            {/* <input
                className="image-input"
                name={"image"}
                type="url"
                // accept='image/*'
                onChange={(e)=>{
                    // setFieldValue('image', URL.createObjectURL(e.target.files[0])); 
                    handleChange(e)
                    // console.log(e.target.value)
                    setImageURL(e.target.value)
                    // setImageURL(URL.createObjectURL(e.target.files[0]));
                }}
            /> */}
            </div>
            <div className='instruction-text'>
                <Typography>
                Type in comma separated ingredients
                </Typography>
            </div>
            <TextField
                id="ingredients"
                placeholder="Ingredients"
                value={values.ingredients}
                onChange={(e) => {handleChange(e)}}
                onBlur={handleBlur}
                multiline={true}
                helperText={touched.ingredients ? errors.ingredients : ""}
                error={touched.ingredients && Boolean(errors.ingredients)}
                margin="normal"
                variant="outlined"
                sx={{ 
                    "&&":{
                        width:"60%"
                    }
                }}
            />
            <div className='instruction-text'>
                <Typography>
                Type in comma separated instructions
                </Typography>
            </div>
            <TextField
                id="instructions"
                placeholder="Instructions"
                value={values.instructions}
                multiline={true}
                onChange={(e) => {handleChange(e)}}
                onBlur={handleBlur}
                helperText={touched.instructions ? errors.instructions : ""}
                error={touched.instructions && Boolean(errors.instructions)}
                margin="normal"
                variant="outlined"
                sx={{ 
                    "&&":{
                        width:"60%"
                    }
                }}
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
                        },
                        marginBottom: "2vh",
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