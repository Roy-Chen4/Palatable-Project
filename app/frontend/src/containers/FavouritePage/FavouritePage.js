/* eslint-disable no-unused-vars */
import { Button, Grid, Box } from '@mui/material';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RecipeCard from '../../components/molecules/RecipeCard/RecipeCard';

function FavouritePage() {

    const favouritedRecipe = useSelector(state => state.favourited)
    console.log(favouritedRecipe)

    const [recipes, setRecipes] = React.useState([])

    React.useEffect(() => {
        if (favouritedRecipe.length > 1) {
            setRecipes([...favouritedRecipe])
            console.log(favouritedRecipe)
        }
    }, []);

    /* const isFeed = location.state.feed; */

    return(
        <div>
            <Grid container spacing={1}>
                {recipes.map((item, index) => (
                    <Grid key={index} item>
                        <RecipeCard
                        /* instructions={(favouritedRecipe.length === 0 || isFeed)} */
                        instructions={true}
                        recipe={item}
                        key={index}
                    />
                    </Grid>
                ))}     
            </Grid>
            <NavLink to="/" className={"previous-page-button"}>
                        <Button 
                        variant="contained"
                        sx={{"&&":{
                            maxHeight: "100%",
                            maxWidth: "100%",
                            minHeight: "100%",
                            minWidth: "100%",
                            backgroundColor: "#df7b84", 
                            fontWeight: "700",
                            ":hover": {
                            backgroundColor: "white",
                            color: "#df7b84",
                            }
                        }}}
                        >
                        Return</Button>
                    </NavLink>
        </div>
    )
}

export default FavouritePage;