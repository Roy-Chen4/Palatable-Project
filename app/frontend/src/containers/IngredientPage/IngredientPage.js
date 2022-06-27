import * as React from 'react';
import { InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

function IngredientPage() {
  
    return (
      <div className="IngredientPage">
        <h1>This is the IngredientPage</h1>
        <TextField
          variant='outlined'
          margin='normal'
          sx={{position: "relative", justifyContent: "center", width: "30%", backgroundColor: "white"}}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <SearchIcon/>
              </InputAdornment>
            )
          }}
        />
      </div>
    );
  }
  
  export default IngredientPage;
  