import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
// {
//     product: [],
// }

const checkArrivalReducer = createSlice({
    name: 'checkArrival',
    initialState: { initialState },
    reducers: {
        checkArrivalData: (state, { payload }) => {
            state.initialState = payload;
        },
    },
});

export default checkArrivalReducer.reducer;
export const { checkArrivalData } = checkArrivalReducer.actions;