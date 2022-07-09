import { Autocomplete, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";

function SearchBar() {
    const [jsonResults, setJsonResults] = useState([]);

    useEffect(() => {
    fetch("https://www.balldontlie.io/api/v1/players")
    .then((response) => response.json())
    .then((json) => setJsonResults(json.data))
    }, [])
    console.log(jsonResults);
    return (
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
                renderOption={(props, jsonResults) => (
                    <Box component="li" {...props} key={jsonResults.id}>
                        {jsonResults.first_name} {jsonResults.last_name}
                    </Box>
                )}
                renderInput={(params) => <TextField {...params} label = "Input name"/>}
            />
        </Stack>
    );
}

export default SearchBar;