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
import { createTheme } from '@mui/material';
import './RecipeCard.css'



export default function RecipeCard(props) {
    
    
    const dispatch = useDispatch();
    
    const [recipeOpen, setRecipeOpen] = React.useState(false);
    
    console.log(props.recipe);

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

    /* const rname = useSelector((state) => state.favourited) */

    const onRecipeFavourite = () => {
        /* setRecipeName(props.recipe.title) */
        dispatch(add({favourited: [props.recipe]}));
        /* setIsSubmitting(true); */
        setTimeout(function() { 
        /* setIsSubmitting(false); */
        }.bind(this), 1000)
    }

    return (
        <div className="recipe-cards">
            <Card classname="recipe-container" variant="outlined" sx={{ width: "48vw" }} >
                {/* <CardMedia
                    component="img"
                    width="48vw"
                    image={props.recipe.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="card-title">
                        {props.recipe.title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Save</Button>
                    <Button size="small">Explore</Button>
                </CardActions> */}
                <CardHeader
                    title={props.recipe.title}
                    action={
                        <IconButton 
                        aria-label="add to favorites"
                        onClick = {() => {onRecipeFavourite(); setOpen(true)}}
                        >
                            <FavoriteIcon />
                        </IconButton>
                    }
                    sx={{textAlign: "center"}}
                />
                <CardMedia
                    component="img"
                    width="48vw"
                    image={props.recipe.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">  
                        Dietary requirements: {props.recipe.diets}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => setRecipeOpen(true)}>Explore</Button>
                </CardActions>
        </Card>
        <RecipeModal 
            open={recipeOpen}
            showInstructions={props.instructions}
            recipe={props.recipe}
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
}