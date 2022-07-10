/* eslint-disable no-unused-vars */
import { Autocomplete, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import { 
    Button,
} 
from '@mui/material';

function SearchBar() {
    const [jsonResults, setJsonResults] = useState([]);
    const [ingredientName, setIngredientName] = useState('');

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
                    onChange={(value) => {
                        console.log(value);
                        setIngredientName(value.first_name + value.last_name);
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
            <Button onClick={()=> console.log(ingredientName)}>Enter</Button>
        </div>
    );
}

export default SearchBar;