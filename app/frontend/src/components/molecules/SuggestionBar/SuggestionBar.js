/* eslint-disable no-unused-vars */
import {
    Box
} from "@mui/material";
import { Button, ButtonGroup } from "@mui/material";
import PropTypes from 'prop-types';
import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { add } from "../../../reducers/userIngredients";
import './SuggestionBar.css';

const SuggestionBar = (props) => {
    const dispatch = useDispatch();

    var userIngredients = useSelector((state) => state.ingredients.ingredients);
    const [missed, setMissed] = React.useState([])
    let options;
    
    function getOptions () {
        options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
            params: {
                ingredients: userIngredients.toString(),
                number: 1,
                ignorePantry: 'true',
                ranking: '1'
            },
            headers: {
                'X-RapidAPI-Key': '8176d37892msh319090cdc777d8ap1e4f8djsn0b7472bf3694',
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        };
        console.log("returned options")
        return options;
    }
    
    const getIngredients = async () => {
        return axios.request(options).then(function (response) {
            console.log("api-called");
            console.log(response.data[0])
            if (response.data[0].missedIngredients.length > 5) {
                setMissed(response.data[0].missedIngredients.slice(0,5))
            } else {
                setMissed(response.data[0].missedIngredients)
            }
        }).catch(function (error) {
            console.error(error);
        });
    };
    
    function handleOnClick(i, name) {
        console.log(name)
        dispatch(add({ingredients: [name.toString()]}));
        missed.splice(i, 1);
    }

    React.useEffect(() => {
        if (userIngredients.length > 1) {
            getOptions();
            getIngredients();
            console.log("missingingredientrecipegenerated");
        } else {
            setMissed([])
        }
    }, [userIngredients]);

    return (
        <Box sx={{"&&":{ flexGrow: 1 }}} className="button-box">
            <ButtonGroup size="small">
                {missed.map((item, index) => (
                    <Button 
                        key={index} 
                        onClick={() => {handleOnClick(index, item.name)}}
                        disabled={userIngredients.includes(item.name)}
                    >
                        {item.name}
                    </Button>
                ))}  
            </ButtonGroup>
        </Box>
    )
}

SuggestionBar.propTypes = {
    visible: PropTypes.bool,
}

export default SuggestionBar;