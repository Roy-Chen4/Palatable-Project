/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
/* import * as React from 'react'; */
import { 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    CardActions, 
    Button,
    IconButton, 
    Dialog,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardHeader from '@mui/material/CardHeader';
import { useDispatch } from "react-redux";
import { add } from "../../../reducers/isFavourited";
import React, { useState, useEffect } from "react";
import { DialogTitle } from '@mui/material';
import { useSelector } from 'react-redux';
import RecipeModal from '../Modal/RecipeModal';
import axios from 'axios';
import { createTheme } from '@mui/material';
import './RecipeCard.css'


export default function RecipeCard(props) {
     
    
    const dispatch = useDispatch();
    
    const [recipeOpen, setRecipeOpen] = React.useState(false);
    const [instructions, setInstructions] = React.useState([])
    const [ingredients, setIngredients] = React.useState([])
    // console.log(props.recipe);

    const primaryTheme = createTheme({
        palette: {
          primary: {
            main: '#df7b84',
          },
        },
      });
    /* const [recipeName, setRecipeName] = useState(['']); */

    /* onChange={(e, props) => {
        setRecipeName([props.recipe.title]);
    }} */

    const [open, setOpen] = React.useState(false);
    
    const userEmail = useSelector((state) => state.user.value.email)
    const isLogged = useSelector((state) => state.user.value.isLogged)



  /*   console.log(rname) */

    /* function handleOnClick */ /*2 funcs and axios to call the view
    
    */

    function handleOnClick(){
        const recipeValues = {
            "title": props.recipe.title, 
            "id": props.recipe.id,
            "image": props.recipe.image, 
            "ingredients": ingredients,
            "instructions": instructions,
        }
        const values = {email: userEmail, new_favourite: recipeValues}
        // console.log(values)
        // console.log(JSON.stringify(recipeValues))
        dispatch(add({favourited: [recipeValues]}));
        /* setIsSubmitting(true); */
        axios
        .post("/favourites/", values)
        .then((res) => {
            setOpen(true);
            console.log(res)
        })
        .catch((err) => {
            console.log(err.request);
        });
        setTimeout(function() { 
            setOpen(false);
        }.bind(this), 1000)
    }

    React.useEffect(()=> {
        if (props.type === "redux" || props.type === "feed") {
            setInstructions(props.recipe.instructions
                .replace(/<[^>]+>/g, '')
                .split(".")
                .filter(function(e){return e}));
            setIngredients(props.recipe.extendedIngredients);
        } else {
            setIngredients([...props.recipe.missedIngredients, ...props.recipe.usedIngredients, ...props.recipe.unusedIngredients])
            retrieveInstructions();
        }
    }, [])
    

    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/'+props.recipe.id+'/information',
        headers: {
            'X-RapidAPI-Key': '8176d37892msh319090cdc777d8ap1e4f8djsn0b7472bf3694',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };
    function retrieveInstructions() {
        axios.request(options).then(function (response) {
            console.log(response.data);
            setInstructions(response.data.instructions
                .replace(/<[^>]+>/g, '')
                .split(".")
                .filter(function(e){return e}));
        }).catch(function (error) {
            console.error(error);
            setInstructions([]);
        });
    }

    function getIngredients() {
        // check if from redux
        if (props.type === "redux") {
            return props.recipe.ingredients;
            // check if feed 
        } else if (props.type === "feed") {
            return props.recipe.extendedIngredients;
        } else {
            return [...props.recipe.missedIngredients, ...props.recipe.usedIngredients, ...props.recipe.unusedIngredients]
        }
    }


    return (
        <div className="recipe-cards">
            <Card classname="recipe-container" variant="outlined" sx={{ width: "48vw" }} >
                <CardHeader
                    title={props.recipe.title}
                    action={
                        <IconButton 
                        sx = {{display: isLogged ? "inline-block": "none"}}
                        aria-label="add to favorites"
                        onClick = {() => {handleOnClick()}}
                        >
                            <FavoriteIcon />
                        </IconButton>
                    }
                    sx={{textAlign: "center", }}
                />
                <CardMedia
                    component="img"
                    width="48vw"
                    image={props.recipe.image}
                />
                <CardContent>
                    {/* <Typography gutterBottom variant="h5" component="div">  
                        Dietary requirements: {props.recipe.diets}
                    </Typography> */}
                </CardContent>
                {/* <div className = "explore-button"> */}
                <CardActions className = "explore-button">
                    <Button size="small" onClick={()=>{setRecipeOpen(true)}}>Explore</Button>
                </CardActions>
        </Card>
        <RecipeModal 
            open={recipeOpen}
            showInstructions={props.instructions}
            recipe={props.recipe}
            title={props.recipe.title}
            id={props.recipe.id}
            image={props.recipe.image}
            ingredients={getIngredients()}
            instructions={instructions}
            onClose={() => setRecipeOpen(false)} 
            primaryTheme={primaryTheme} 
        />

        <Dialog open={open}>
            <DialogTitle>{props.recipe.title} has been added to your favourites</DialogTitle>
            <Button variant="contained" onClick={() => setOpen(false)}> close </Button>
        </Dialog>
        </div>
    )

}

RecipeCard.propTypes = {
    key: PropTypes.number,
    instructions: PropTypes.bool,
    recipe: PropTypes.any,
    recipeInfo: PropTypes.any,
    type: PropTypes.string,
}