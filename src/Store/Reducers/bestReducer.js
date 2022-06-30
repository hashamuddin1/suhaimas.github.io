import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
// {
//     product: [],
// }

const bestReducer = createSlice({
    name: 'best',
    initialState: { initialState },
    reducers: {
        bestData: (state, { payload }) => {
            state.initialState = payload;
        },
    },
});

export default bestReducer.reducer;
export const { bestData } = bestReducer.actions;