import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLogged: false,
    diet: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState: { value: {
        isLogged: false,
        diet: '',
    }
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => {
            state.value = initialState
        }
    }
});

export const { login, logout } = userSlice.actions;
 
export default userSlice.reducer;
