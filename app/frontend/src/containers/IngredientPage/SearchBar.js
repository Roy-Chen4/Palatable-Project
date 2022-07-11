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
import { add } from "../../reducers/userIngredients";

function SearchBar() {

    const dispatch = useDispatch();

    const onIngredientSubmit = () => {
        dispatch(add({ingredients: ingredientName}));
        /* setIsSubmitting(true); */
        setTimeout(function() { 
        /* setIsSubmitting(false); */
        }.bind(this), 1000)
    }

    const [jsonResults, setJsonResults] = useState([]);

    const [ingredientName, setIngredientName] = useState([]);

    useEffect(() => {
    fetch("https://www.balldontlie.io/api/v1/players")
    .then((response) => response.json())
    .then((json) => setJsonResults(json.data))
    }, [])
    console.log(jsonResults);
    return (
        <div>
            <Stack sx = {{width:300}}>
                <Autocomplete 
                    id="Name"
                    getOptionLabel={(jsonResults) => `${jsonResults.first_name} ${jsonResults.last_name}`}
                    options={jsonResults}
                    sx={{width:300}}
                    isOptionEqualToValue={(option,value) => 
                        option.first_name === value.first_name
                    }
                    noOptionsText={"No availabe selection"}
                    onChange={(e, value) => {
                        console.log(value);
                        setIngredientName([value.first_name]);
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
                            {jsonResults.first_name} {jsonResults.last_name}
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} value={ingredientName} label = "Input name"/>}
                />
            </Stack>
            <Button onClick={()=> onIngredientSubmit()}>Enter</Button>
        </div>
    );
}

export default SearchBar;