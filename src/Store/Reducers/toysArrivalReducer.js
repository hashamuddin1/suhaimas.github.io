import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
// {
//     product: [],
// }

const toysArrivalReducer = createSlice({
    name: 'toysArrival',
    initialState: { initialState },
    reducers: {
        toysArrivalData: (state, { payload }) => {
            state.initialState = payload;
        },
    },
});

export default toysArrivalReducer.reducer;
export const { toysArrivalData } = toysArrivalReducer.actions;