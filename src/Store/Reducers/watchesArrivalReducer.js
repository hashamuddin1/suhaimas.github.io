import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
// {
//     product: [],
// }

const watchesArrivalReducer = createSlice({
    name: 'watchesArrival',
    initialState: { initialState },
    reducers: {
        watchesArrivalData: (state, { payload }) => {
            state.initialState = payload;
        },
    },
});

export default watchesArrivalReducer.reducer;
export const { watchesArrivalData } = watchesArrivalReducer.actions;