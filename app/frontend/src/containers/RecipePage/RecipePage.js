/* eslint-disable no-unused-vars */
import { Button, Grid, Box } from '@mui/material';
import React from 'react';
import { Oval } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import RecipeCard from '../../components/molecules/RecipeCard/RecipeCard';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from 'react-redux';
import './RecipePage.css';


function RecipePage() {
    const [isLoading, setIsLoading] = React.useState(true);

    const userAddedIngredients = useSelector((state) => state.ingredients.ingredients);

    setTimeout(function() {
        setIsLoading(false);
    }.bind(this), 2500)

    let options;

    function getOptions () {
        if (userAddedIngredients.length === 0) {
            options = {
                method: 'GET',
                url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
                params: {number: '10'},
                headers: {
                  'X-RapidAPI-Key': '8176d37892msh319090cdc777d8ap1e4f8djsn0b7472bf3694',
                  'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
                }
            };
        } else {
            options = {
                method: 'GET',
                url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
                params: {
                    ingredients: 'apples,flour,sugar',
                    number: '10',
                    ignorePantry: 'true',
                    ranking: '1'
                },
                headers: {
                    'X-RapidAPI-Key': '8176d37892msh319090cdc777d8ap1e4f8djsn0b7472bf3694',
                    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
                }
            };
        }
        return options;
    }
    
    const [recipes, setRecipes] = React.useState([])
      
    React.useEffect(() => {
        getOptions();
        getRecipes();
    }, []);

    const getRecipes = async () => {
        return axios.request(options).then(function (response) {
            if (userAddedIngredients.length === 0) {
                setRecipes([...recipes, ...response.data.recipes]);
            } else {
                setRecipes([...recipes, ...response.data]);
            }
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
            getOptions();
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
                <h1 className='title'>{userAddedIngredients.length===0 ? "Feed" : "Search"}</h1>
                <NavLink to="/" className={"previous-page-button"}>
                    <Button onClick={()=>setRecipes([])}>Return</Button>
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