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


export default function RecipeCard(props) {
    console.log(props.recipe);
    return (
        <Card sx={{ width: 345 }}>
            <CardMedia
                component="img"
                height="300"
                width="300"
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
    )

}

RecipeCard.propTypes = {
    key: PropTypes.number,
    recipe: PropTypes.any,
    recipeInfo: PropTypes.any,
}