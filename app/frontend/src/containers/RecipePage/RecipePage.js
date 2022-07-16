/* eslint-disable no-unused-vars */
import { Button, Grid, Box } from '@mui/material';
import React from 'react';
import { Oval } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import RecipeCard from '../../components/molecules/RecipeCard/RecipeCard';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import './RecipePage.css';


function RecipePage() {
    const [isLoading, setIsLoading] = React.useState(true);

    setTimeout(function() {
        setIsLoading(false);
    }.bind(this), 2500)

    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
        params: {number: '10'},
        headers: {
          'X-RapidAPI-Key': '8176d37892msh319090cdc777d8ap1e4f8djsn0b7472bf3694',
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
      };
    
    const [recipes, setRecipes] = React.useState([])
      
    React.useEffect(() => {
        getRecipes();
    }, []);

    const getRecipes = async () => {
        return axios.request(options).then(function (response) {
            setRecipes([...recipes, ...response.data.recipes]);
            console.log("api-called");
        }).catch(function (error) {
            console.error(error);
        });
    };

    const [hasMore, setHasMore] = React.useState("true");
    const fetchMoreData = () => {
        if (recipes.length >= 100) {
          setHasMore(false);
          return;
        }
        // React.useEffect(() => {
            getRecipes();
        // }, []);
      };

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
    }
    else {
        return (
            <div>
                <h1 className='title'>Digital Dummies WAHAAHA</h1>
                <NavLink to="/" className={"previous-page-button"}>
                    <Button>Return</Button>
                </NavLink>
                <Box className="grid-container" sx={{ flexGrow: 1 }}>
                    <InfiniteScroll
                    dataLength={recipes.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={
                    <div className="loading-spinner-recipes"> 
                        <Oval
                            color= "#df7b84"
                            secondaryColor='#ffd4d8'
                        >
                        </Oval>
                    </div>
                    }
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                        </p>
                    }
                    >
                        <Grid container spacing={1}>
                            {recipes.map((item, index) => (
                                <Grid key={index} item>
                                    <RecipeCard
                                    recipe={item}
                                    key={index}
                                />
                                </Grid>
                            ))}     
                        </Grid>
                    </InfiniteScroll>
                </Box>
            </div>
        );
    }
}

export default RecipePage;