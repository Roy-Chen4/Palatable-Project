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
import axios from 'axios';
import './SearchBar.css'

function SearchBar() {

    const dispatch = useDispatch();
    const [render, setRender] = useState(1)

    const onIngredientSubmit = () => {
        dispatch(add({ingredients: ingredientName}));
        setRender(2);
        setIngredientName('');
        /* setIsSubmitting(true); */
        setTimeout(function() { 
        /* setIsSubmitting(false); */
        }.bind(this), 1000)
    }

    const [jsonResults, setJsonResults] = useState(['']);

    const [ingredientName, setIngredientName] = useState('');


    useEffect(() => {
        axios
            .get("/ingredients/")
            .then((res) => {
                setJsonResults([...res.data.data])
            })
            .catch((err) => {
                console.log(err.request);
        });
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
                    key={render}
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