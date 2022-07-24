/* eslint-disable no-unused-vars */
import { Button, Grid, Box } from '@mui/material';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RecipeCard from '../../components/molecules/RecipeCard/RecipeCard';
import { Oval } from 'react-loader-spinner';

function FavouritePage() {

    const [isLoading, setIsLoading] = React.useState(true);

    const favouritedRecipe = useSelector(state => state.favourited)

    /* const [recipes, setRecipes] = React.useState([])

    React.useEffect(() => {

        if (favouritedRecipe.length > 1) {
            setRecipes([...favouritedRecipe])
        }
    }, []); */

    /* const isFeed = location.state.feed; */

    setTimeout(function() {
        setIsLoading(false);
    }.bind(this), 2500)

    if (isLoading) {
        return(
            <div className="loading-spinner"> 
                <Oval
                    color= "#df7b84"
                    secondaryColor='#ffd4d8'
                >
                </Oval>
            </div>
        )
    } else {
        return(
            <div>
                <Grid container spacing={1}>
                    {favouritedRecipe.favourited.map((item, index) => (
                        <Grid key={index} item>
                            <RecipeCard
                            /* instructions={(favouritedRecipe.length === 0 || isFeed)} */
                            instructions={true}
                            recipe={item}
                            key={index}
                            type={"redux"}
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
                        Return
                    </Button>
                </NavLink>
            </div>
        )
    }
    
}

export default FavouritePage;