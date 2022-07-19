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
} from '@material-ui/core';
import './RecipeCard.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardHeader from '@mui/material/CardHeader';
import { useDispatch } from "react-redux";
import { add } from "../../../reducers/isFavourited";
import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { DialogTitle } from '@mui/material';
import { useSelector } from 'react-redux';


export default function RecipeCard(props) {
    
    console.log(props.recipe);

    const dispatch = useDispatch();

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
                    // alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
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
                    <Button size="small">Explore</Button>
                </CardActions>
        </Card>

        <Dialog open={open}>
            <DialogTitle>{props.recipe.title} has been added to your favourites</DialogTitle>
            <Button variant="contained" onClick={() => setOpen(false)}> close </Button>
        </Dialog>
        </div>
    )

}

RecipeCard.propTypes = {
    key: PropTypes.number,
    recipe: PropTypes.any,
    recipeInfo: PropTypes.any,
}