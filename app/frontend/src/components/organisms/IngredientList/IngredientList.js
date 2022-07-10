/* eslint-disable no-unused-vars */
import { TextField, Grid, InputAdornment } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import './IngredientList.css'

function IngredientList() {
    var ingredientList = (useSelector((state) => state.ingredients.ingredients))
    var sortedList = [...ingredientList].sort((a,b) => a.localeCompare(b))
    
    const styles = theme => ({
        root: {
          flexGrow: 1,
        },
        control: {
          padding: theme.spacing.unit * 2,
        },
      });

    return ( 
        <div className='ingredient-list'>
            <Grid container className={styles.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="flex-start" spacing={2}>
                        {sortedList.map(value => (
                        <Grid key={value} item>
                            <TextField 
                                id="outlined-basic" 
                                label={value}
                                disabled 
                                variant="outlined" 
                                size="small"
                                sx = {{
                                    width: "15vw",
                                }}
                                InputProps={{
                                    endAdornment: 
                                        <InputAdornment position="end">
                                            <DeleteIcon />
                                        </InputAdornment>,
                                }}
                            />
                        </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default IngredientList;