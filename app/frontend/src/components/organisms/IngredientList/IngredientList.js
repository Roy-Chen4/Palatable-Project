/* eslint-disable no-unused-vars */
import { Button } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';

function IngredientList() {
    const ingredientList = useSelector((state) => state.ingredients.ingredients);
    return ( 
        <div className='ingredient-list'>
            <Button onClick={console.log(ingredientList)}>
                Get List
            </Button>
        </div>
    );
}

export default IngredientList;