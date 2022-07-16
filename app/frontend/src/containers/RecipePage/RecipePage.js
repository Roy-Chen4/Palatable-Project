/* eslint-disable no-unused-vars */
import { Button } from '@mui/material';
import React from 'react';
import { Oval } from 'react-loader-spinner';
import { NavLink, useLocation } from 'react-router-dom';
import RecipeCard from '../../components/molecules/RecipeCard/RecipeCard';
import axios from 'axios';
import './RecipePage.css';
import { PropTypes } from 'prop-types';



function RecipePage() {
    const [isLoading, setIsLoading] = React.useState(true);

    const location = useLocation()
    const recipeState = location.state.recipes;

    setTimeout(function() {
        setIsLoading(false);
    }.bind(this), 2500)

    // console.log(getRecipes())

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
      
    React.useEffect(async () => {
        let controller = new AbortController();
        axios.request(options).then(function (response) {
        // console.log(response.data);
        // console.log(response.data.recipes);
        // console.log(response.data.recipes[0].image);
            setRecipes([...response.data.recipes]);
        // console.log("---------------")
        console.log("api-called");
            // return [...response.data.recipes];
        }).catch(function (error) {
            console.error(error);
        });
        console.log(recipes)
        return () => controller?.abort();
    }, []);
    console.log(recipeState)
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
                <h1>Digital Dummies WAHAAHA</h1>
                <NavLink to="/" className={"previous-page-button"}>
                    <Button>Return</Button>
                </NavLink>
                {recipes.map((item, index) => {
                    return (
                        <RecipeCard
                            recipe={item}
                            key={index}
                        />
                    );
                })}
            </div>
        );
    }
}

export default RecipePage;