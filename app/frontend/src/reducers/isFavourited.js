import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favourited: [],
}

export const favouriteSlice = createSlice({
    name: 'favourited',
    initialState: initialState,
    reducers: {
        add: (state, action) => {
            if (!(state.favourited.some(a => a === action.payload.favourited[0]))) {
                state.favourited = [...state.favourited, ...action.payload.favourited]
            } else {
                state.favourited = [...state.favourited]
            }
        },
        remove: (state, action) => {
            state.favourited = state.favourited.filter(i => i !== action.payload.favourited);
        },
        clear: () => {
            return initialState;
        }
    }
});

export const { add, remove, clear } = favouriteSlice.actions;
 
export default favouriteSlice.reducer;
