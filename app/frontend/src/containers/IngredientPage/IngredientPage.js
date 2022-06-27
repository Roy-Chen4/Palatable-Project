import * as React from 'react';
import { InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import './IngredientPage.css';

function IngredientPage() {
  
    return (
      <div className="IngredientPage">
        <div className='TextInput'>
            <TextField
            variant='outlined'
            margin='normal'
            sx={{position: "relative", display: "flex", justifyContent: "center", alignContent: "center", width: "30%", backgroundColor: "white"}}
            InputProps={{
                endAdornment: (
                    <InputAdornment>
                        <SearchIcon/>
                    </InputAdornment>
                )
            }}
            />
        </div>
      </div>
    );
  }
  
  export default IngredientPage;
  