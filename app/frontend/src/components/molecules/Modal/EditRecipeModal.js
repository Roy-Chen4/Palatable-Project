/* eslint-disable no-unused-vars */
import {
    Button, DialogTitle, IconButton, TextField, Typography
} from '@mui/material';
import axios from 'axios';
import { withFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
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
        recipe,
        id,
        onClose,
    } = props;
    
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [imageURL, setImageURL] = React.useState(recipe.image);
    const userEmail = useSelector((state) => state.user.value.email);
    const [tagValue, setTagValue] = React.useState(recipe.tags);
    const [selected, isSelected] = React.useState(recipe.tags);

    const onFormSubmit = () => {
        setIsSubmitting(true);
        const recipe = {
            title: values.recipetitle,
            image: values.image,
            ingredients: values.ingredients,
            tags: tagValue,
            instructions: values.instructions,
        }
        // use values to Send in axios request to save the recipe in creator db
        const valuesToSend = {
            email: userEmail,
            edit_recipe: JSON.stringify(recipe),
            id: id,
        }
        axios.post("/editrecipe/", valuesToSend) 
            .then((res) => {
                console.log(res)
            }).then(() => {
                setTimeout(function() {
                    setIsSubmitting(false);
                    onClose()
                }.bind(this), 2000)
            })
            .catch((err) => {
                console.log(err.request);
                setIsSubmitting(false);
            });
            
    }


    function onBreakfastSubmit() {
        setTagValue(tagValue !=='breakfast' ? 'breakfast': undefined)
        console.log(tagValue)
        return(tagValue !=='breakfast' ? 'breakfast': undefined)
    }

    function onLunchSubmit() {
        
        setTagValue(tagValue !=='lunch' ? 'lunch': undefined)
        console.log(tagValue)
        return(tagValue !=='lunch' ? 'lunch': undefined)
    }

    function onDinnerSubmit() {
        setTagValue(tagValue !=='dinner' ? 'dinner': undefined)
        console.log(tagValue)
        return(tagValue !=='dinner' ? 'dinner': undefined)
    }
    function onSnackSubmit() {
        setTagValue(tagValue !=='snack' ? 'snack': undefined)
        console.log(tagValue)
        return(tagValue !=='snack' ? 'snack': undefined)
    }
    function onDrinkSubmit() {
        setTagValue(tagValue !=='drink' ? 'drink': undefined)
        console.log(tagValue)
        return(tagValue !=='drink' ? 'drink': undefined)
    }
    function onDessertSubmit() {
        setTagValue(tagValue !=='dessert' ? 'dessert': undefined)
        console.log(tagValue)
        return(tagValue !=='dessert' ? 'dessert': undefined)
    }
    return (
        <form>
            <DialogTitle>Edit Recipe</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => props.onClose()}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <div className='instruction-text'>
                <Typography>
                    Title
                </Typography>
            </div>

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
                    placeholder="Image"
                    value={values.image}
                    type="url"
                    onChange={(e) => {
                        handleChange(e)
                        setImageURL(e.target.value)
                    }}
                    onBlur={handleBlur}
                    margin="normal"
                    variant="outlined"
                    sx={{ 
                        "&&":{
                            width:"50%"
                        }
                    }}
                />
            </div>
            <div className='instruction-text'>
                <Typography>
                Type in comma separated ingredients
                </Typography>
            </div>
            <TextField
                id="ingredients"
                placeholder="Ingredient"
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
            <div className='instruction-text'>
                <Typography>
                Select one tag
                </Typography>
            </div>
            <div className='tag-buttons'>
                <Button
                    onClick={() => {isSelected(onBreakfastSubmit())}}
                    variant="outlined"
                    size="small"
                    sx={{
                        ...(selected === 'breakfast' && {
                            color:"white",
                            backgroundColor: "rgb(25, 118, 210);",
                            ":hover": {
                                color:"white",
                                backgroundColor: "rgb(25, 118, 210);",
                            },
                        }),
                        ...(selected !== 'breakfast' && {
                            color:"rgb(25, 118, 210);",
                            backgroundColor: "white",
                            ":hover": {
                                backgroundColor: "white",
                                color: "rgb(25, 118, 210);", 
                            },
                        }),
                        marginBottom: "2vh",
                        marginRight: "1vw",
                    }}
                >
                    Breakfast
                </Button>
                <Button
                    onClick={() => {isSelected(onLunchSubmit())}}
                    variant="outlined"
                    size="small"
                    sx={{
                        ...(selected === 'lunch' && {
                            color:"white",
                            backgroundColor: "rgb(25, 118, 210);",
                            ":hover": {
                                color:"white",
                                backgroundColor: "rgb(25, 118, 210);",
                            },
                        }),
                        ...(selected !== 'lunch' && {
                            color:"rgb(25, 118, 210);",
                            backgroundColor: "white",
                            ":hover": {
                                backgroundColor: "white",
                                color: "rgb(25, 118, 210);", 
                            },
                        }),
                        marginBottom: "2vh",
                        marginRight: "1vw",
                    }}
                >
                    Lunch
                </Button>
                <Button
                    onClick={() => {isSelected(onDinnerSubmit())}}
                    variant="outlined"
                    size="small"
                    sx={{
                        ...(selected === 'dinner' && {
                            color:"white",
                            backgroundColor: "rgb(25, 118, 210);",
                            ":hover": {
                                color:"white",
                                backgroundColor: "rgb(25, 118, 210);",
                            },
                        }),
                        ...(selected !== 'dinner' && {
                            color:"rgb(25, 118, 210);",
                            backgroundColor: "white",
                            ":hover": {
                                backgroundColor: "white",
                                color: "rgb(25, 118, 210);", 
                            },
                        }),
                        marginBottom: "2vh",
                        marginRight: "1vw",
                    }}
                >
                    Dinner
                </Button>
                <Button
                    onClick={() => {isSelected(onSnackSubmit())}}
                    variant="outlined"
                    size="small"
                    sx={{
                        ...(selected === 'snacks' && {
                            color:"white",
                            backgroundColor: "rgb(25, 118, 210);",
                            ":hover": {
                                color:"white",
                                backgroundColor: "rgb(25, 118, 210);",
                            },
                        }),
                        ...(selected !== 'snacks' && {
                            color:"rgb(25, 118, 210);",
                            backgroundColor: "white",
                            ":hover": {
                                backgroundColor: "white",
                                color: "rgb(25, 118, 210);", 
                            },
                        }),
                        marginBottom: "2vh",
                        marginRight: "1vw",
                    }}
                >
                    Snacks
                </Button>
                <Button
                    onClick={() => {isSelected(onDrinkSubmit())}}
                    variant="outlined"
                    size="small"
                    sx={{
                        ...(selected === 'drinks' && {
                            color:"white",
                            backgroundColor: "rgb(25, 118, 210);",
                            ":hover": {
                                color:"white",
                                backgroundColor: "rgb(25, 118, 210);",
                            },
                        }),
                        ...(selected !== 'drinks' && {
                            color:"rgb(25, 118, 210);",
                            backgroundColor: "white",
                            ":hover": {
                                backgroundColor: "white",
                                color: "rgb(25, 118, 210);", 
                            },
                        }),
                        marginBottom: "2vh",
                        marginRight: "1vw",
                    }}
                >
                    Drinks
                </Button>
                <Button
                    onClick={() => {isSelected(onDessertSubmit())}}
                    variant="outlined"
                    size="small"
                    sx={{
                        ...(selected === 'dessert' && {
                            color:"white",
                            backgroundColor: "rgb(25, 118, 210);",
                            ":hover": {
                                color:"white",
                                backgroundColor: "rgb(25, 118, 210);",
                            },
                        }),
                        ...(selected !== 'dessert' && {
                            color:"rgb(25, 118, 210);",
                            backgroundColor: "white",
                            ":hover": {
                                backgroundColor: "white",
                                color: "rgb(25, 118, 210);", 
                            },
                        }),
                        marginBottom: "2vh",
                        marginRight: "1vw",
                    }}
                >
                    Dessert
                </Button>
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

const EditRecipeModal = withFormik({
    validationSchema: yup.object().shape(validationCreator),
    mapPropsToValues: (props) => {
        return (
            {
                recipetitle: props.recipe.title,
                image: props.recipe.image,
                ingredients: props.recipe.ingredients,
                instructions: props.recipe.instructions,
            }
        )
    }
})(form);

export default EditRecipeModal;