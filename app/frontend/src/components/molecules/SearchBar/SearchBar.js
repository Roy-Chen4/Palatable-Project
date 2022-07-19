/* eslint-disable no-unused-vars */
import { Autocomplete, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import { 
    Button,
} 
from '@mui/material';
import { useDispatch } from "react-redux";
import { add } from "../../../reducers/userIngredients";
import './SearchBar.css'
import SuggestionBar from "../SuggestionBar/SuggestionBar";

function SearchBar() {

    const dispatch = useDispatch();

    const onIngredientSubmit = () => {
        dispatch(add({ingredients: ingredientName}));
        setIngredientName([]);
        /* setIsSubmitting(true); */
        setTimeout(function() { 
        /* setIsSubmitting(false); */
        }.bind(this), 1000)
    }

    const [jsonResults, setJsonResults] = useState(['']);

    const [ingredientName, setIngredientName] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8176d37892msh319090cdc777d8ap1e4f8djsn0b7472bf3694',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    useEffect(() => {
        fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/search?query=a&number=100000', options)
        .then(response => response.json())
        .then(response => setJsonResults(response.results))
        .then(console.log(jsonResults))
        .catch(err => console.error(err)); 
    }, [])
    // console.log(jsonResults);
    return (
        <div className="container">
            <Stack sx = {{width:550}}>
                <Autocomplete className="a"
                    id="Name"
                    getOptionLabel={(jsonResults) => `${jsonResults.name}`}
                    options={jsonResults}
                    sx={{width:550}}
                    isOptionEqualToValue={(option,value) => 
                        option.name === value.name
                    }
                    noOptionsText={"No available selection"}
                    onChange={(e, value) => {
                        console.log(value);
                        setIngredientName([value.name]);
                        console.log(ingredientName)
                    }}
                    
                    renderOption={(props, jsonResults) => (
                        <Box 
                            component="li" {...props} 
                            // onClick={() => {
                            //     setIngredientName(jsonResults.first_name + jsonResults.last_name);
                                
                            // }} 
                            key={jsonResults.id}
                        >
                            {jsonResults.name}
                        </Box>
                    )}
                    renderInput={(params) => 
                    <TextField 
                    {...params} 
                    value={ingredientName} 
                    placeholder="Search for ingredient"
                    />} 
                />
            </Stack>
            <div id="b">
                <Button
                    onClick={()=> onIngredientSubmit()}
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
                Enter
                </Button>
            </div>
        </div>
    );
}

export default SearchBar;