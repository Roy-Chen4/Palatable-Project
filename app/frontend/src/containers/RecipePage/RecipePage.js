/* eslint-disable no-unused-vars */
import { Button, Grid, Box } from '@mui/material';
import React from 'react';
import { Oval } from 'react-loader-spinner';
import { NavLink, useLocation } from 'react-router-dom';
import RecipeCard from '../../components/molecules/RecipeCard/RecipeCard';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from 'react-redux';
import FilterBar from '../../components/molecules/FilterBar/FilterBar';
import './RecipePage.css';


function RecipePage() {
    const [isLoading, setIsLoading] = React.useState(true);

    const userAddedIngredients = useSelector((state) => state.ingredients.ingredients);
    const userDiet = useSelector((state) => state.user.value.diet);

    const location = useLocation();

    const isFeed = location.state.feed;

    let options;

    const filter = [...location.state.filter, userDiet].toString();

    function getOptions (len) {
        if (userAddedIngredients.length === 0 || isFeed) {
            if (location.state.filter.length !== 0 || userDiet !== "") {
                console.log("filters applied")
                const getParam = {tags: filter, number: '10'}
                options = {
                    method: 'GET',
                    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
                    params: getParam,
                    headers: {
                      'X-RapidAPI-Key': '8176d37892msh319090cdc777d8ap1e4f8djsn0b7472bf3694',
                      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
                    }
                  };
            } else {
                options = {
                    method: 'GET',
                    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
                    params: {number:'10'},
                    headers: {
                      'X-RapidAPI-Key': '8176d37892msh319090cdc777d8ap1e4f8djsn0b7472bf3694',
                      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
                    }
                };
            }
        } else {
            console.log(userAddedIngredients.toString())
            options = {
                method: 'GET',
                url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
                params: {
                    ingredients: userAddedIngredients.toString(),
                    number: len,
                    ignorePantry: 'true',
                    ranking: '2'
                },
                headers: {
                    'X-RapidAPI-Key': '8176d37892msh319090cdc777d8ap1e4f8djsn0b7472bf3694',
                    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
                }
            };
        }
        console.log("returned options: ")
        return options;
    }
    
    const [recipes, setRecipes] = React.useState([])
      
    React.useEffect(() => {
        getOptions(10);
        getRecipes();
    }, []);

    setTimeout(function() {
        setIsLoading(false);
    }.bind(this), 2500)
    
    const getRecipes = async () => {
        return axios.request(options).then(function (response) {
            if (userAddedIngredients.length === 0 || isFeed) {
                setRecipes([...recipes, ...response.data.recipes]);
            } else {
                setRecipes([...response.data]);
            }
            console.log("api-called");
        }).catch(function (error) {
            console.error(error);
        });
    };

    const [hasMore, setHasMore] = React.useState("true");
    const fetchMoreData = () => {
        if (recipes.length >= 50) {
          setHasMore(false);
          return;
        }
        const len = recipes.length + 10;
        // React.useEffect(() => {
            getOptions(len);
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
                <FilterBar visible={userAddedIngredients.length===0 || isFeed}/>
                <div className="top-contents">
                    <div className="title-content">
                        <h1 className='title'>{(userAddedIngredients.length===0 || isFeed) ? "Feed" : "Search"}</h1>
                    </div>
                    <div className="button-content">
                        <NavLink to="/" className={"previous-page-button"}>
                            <Button 
                                onClick={()=>setRecipes([])}
                                sx={{ "&&": {
                                    backgroundColor: "#df7b84",
                                    color: "white", 
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
                </div>
                <Box className="grid-container" sx={{"&&":{ flexGrow: 1 }}}>
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