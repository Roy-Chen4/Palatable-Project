/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import * as React from 'react';
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


export default function RecipeCard(props) {
    console.log(props.recipe);
    return (
        <div className="recipe-cards">
            <Card classname="recipe-container" variant="outlined" sx={{ width: "48vw" }}>
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
                        <IconButton aria-label="add to favorites"
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
                    // alt="green iguana"
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
        </div>
    )

}

RecipeCard.propTypes = {
    key: PropTypes.number,
    recipe: PropTypes.any,
    recipeInfo: PropTypes.any,
}