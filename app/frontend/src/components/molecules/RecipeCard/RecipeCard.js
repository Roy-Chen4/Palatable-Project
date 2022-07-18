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
import RecipeModal from '../Modal/RecipeModal';
import { createTheme } from '@mui/material';


export default function RecipeCard(props) {
    const [recipeOpen, setRecipeOpen] = React.useState(false);
    
    console.log(props.recipe);

    const primaryTheme = createTheme({
        palette: {
          primary: {
            main: '#df7b84',
          },
        },
      });
    
    return (
        <div className="recipe-cards">
            <Card classname="recipe-container" variant="outlined" sx={{ width: "48vw" }}>
                <CardMedia
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
                    <Button size="small" onClick={() => setRecipeOpen(true)}>Explore</Button>
                </CardActions>
            </Card>
            <RecipeModal 
                open={recipeOpen}
                recipe={props.recipe}
                onClose={() => setRecipeOpen(false)} 
                primaryTheme={primaryTheme} 
            />
        </div>
    )

}

RecipeCard.propTypes = {
    key: PropTypes.number,
    recipe: PropTypes.any,
    recipeInfo: PropTypes.any,
}