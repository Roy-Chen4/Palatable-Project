import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged: false,
    email: '',
    diet: '',
    token: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState: { value: initialState
    },
    reducers: {
        login: (state, action) => {
            state.value.email = action.payload.email
            state.value.isLogged = action.payload.isLogged
        },
        tokenStore: (state, action) => {
            state.value.token = action.payload.token
        },
        logout: (state) => {
            state.value = initialState
        },
        dietChange: (state, action) => {
            state.value.diet= action.payload.newUserDiet
        }
    }
});

export const { login, logout, dietChange, tokenStore } = userSlice.actions;
 
export default userSlice.reducer;
