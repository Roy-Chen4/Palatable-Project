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
import "./SearchBar.css";

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
        <div className="container">
            <Stack sx = {{width:550}}>
                <Autocomplete className="a"
                    id="Name"
                    getOptionLabel={(jsonResults) => `${jsonResults.first_name} ${jsonResults.last_name}`}
                    options={jsonResults}
                    sx={{width:550}}
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
                    sx={{
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
                    }}
                >
                Enter
                </Button>
                </div>
            {/* <Button
                    onClick={()=> onIngredientSubmit()}
                    variant="contained"
                    sx={{
                        backgroundColor: "#df7b84", 
                        fontWeight: "700",
                        ":hover": {
                        backgroundColor: "white",
                        color: "#df7b84",
                        }
                    }}
                >
                Enter
                </Button> */}

            {/* InputProps={{endAdornment: 
                        <InputAdornment position="end">
                            <Button 
                                edge="end"
                                onClick={()=> onIngredientSubmit()}
                                variant="contained"
                                sx={{
                                    backgroundColor: "#df7b84", 
                                    fontWeight: "700",
                                    ":hover": {
                                    backgroundColor: "white",
                                    color: "#df7b84", 
                                    }
                                }}
                            >
                            Enter
                            </Button>
                        </InputAdornment> */}


            {/* <Button 
                onClick={()=> onIngredientSubmit()}
                variant="contained"
                sx={{
                    backgroundColor: "#df7b84", 
                    fontWeight: "700",
                    ":hover": {
                      backgroundColor: "white",
                      color: "#df7b84", 
                    }
                  }}
            >
            Enter
            </Button> */}
        </div>
    );
}

export default SearchBar;