import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLogged: false,
    email: '',
    diet: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState: { value: initialState
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => {
            state.value = initialState
        },
        dietChange: (state, action) => {
            state.value.diet= action.payload.newUserDiet
        }
    }
});

export const { login, logout, dietChange } = userSlice.actions;
 
export default userSlice.reducer;
