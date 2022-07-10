import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ingredients: [],
}

export const ingredientSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {
        add: (state, action) => {
            return action.payload;
        },
        remove: (state, action) => {
            state.ingredients = state.ingredients.filter(i => i !== action.payload.items);
        },
        clear: () => {
            return initialState;
        }
    }
});

export const { add, remove, clear } = ingredientSlice.actions;
 
export default ingredientSlice.reducer;
