/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import * as React from 'react';
import { 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    CardActions, 
    Button 
} from '@material-ui/core';
import './RecipeCard.css'


export default function RecipeCard(props) {
    console.log(props.recipe);
    return (
        <div className="recipe-cards">
            <Card classname="recipe-container" variant="outlined" sx={{ width: "48vw" }}>
                <CardMedia
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
                </CardActions>
        </Card>
        </div>
    )

}

RecipeCard.propTypes = {
    key: PropTypes.number,
    recipe: PropTypes.any,
    recipeInfo: PropTypes.any,
}