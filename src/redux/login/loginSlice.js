import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    status: false,
    user: {}
}

const loginSlice = createSlice({
    name: 'login',
    initialState:initialState,
    reducers: {
        
        loggedIn: (state, action) => {
            //console.log("Dispatch loggin called");
            state.status = true;
            state.user = { ...action.payload };//wrong answer getting state.user=action.payload chek in future
            //state.user.username = action.payload.username;
            //console.log(state.user.name);
        },
        
        notLoggedIn: (state) => {
            state.status = false;
            state.user = {};
        },

        updateName: (state,action) => {
            if (state.status&&state.user.name)
            {
                state.user.name = action.payload;
            }

        },
        
        updateUsername: (state, action) => {
            if (state.status && state.user.username)
                state.user.username = action.payload;
        },
        updateEmail: (state, action) => {
            if (state.status && state.user.email)
                state.user.email=action.payload
        },
        updatePhoneNumber: (state, action) => {
            if (state.status && state.user.phoneNumber)
            state.user.phoneNumber=action.payload
        }
        
    }
})

export const { loggedIn, notLoggedIn,updateName,updateUsername,updateEmail,updatePhoneNumber } = loginSlice.actions;
export default loginSlice.reducer;