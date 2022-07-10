import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ingredients: [],
}

export const ingredientSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {
        add: (state, action) => {
            if (!(state.ingredients.some(a => a === action.payload.ingredients[0]))) {
                state.ingredients = [...state.ingredients, ...action.payload.ingredients]
            } else {
                state.ingredients = [...state.ingredients]
            }
        },
        remove: (state, action) => {
            state.ingredients = state.ingredients.filter(i => i !== action.payload.ingredients);
        },
        clear: () => {
            return initialState;
        }
    }
});

export const { add, remove, clear } = ingredientSlice.actions;
 
export default ingredientSlice.reducer;
