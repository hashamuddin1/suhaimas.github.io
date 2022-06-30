import { createSlice } from "@reduxjs/toolkit";

const initialState = []
// {
//     userData: [],
// }

const userGetReducer = createSlice({
    name: 'userGet',
    initialState: { initialState },
    reducers: {
        loginUserGet: (state, { payload }) => {
            state.initialState = payload;
        },
    },
});

export default userGetReducer.reducer;
export const { loginUserGet } = userGetReducer.actions;