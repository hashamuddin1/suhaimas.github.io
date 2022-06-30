import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
// {
//     product: [],
// }

const arrivalReducer = createSlice({
    name: 'arrival',
    initialState: { initialState },
    reducers: {
        arrivalData: (state, { payload }) => {
            state.initialState = payload;
        },
    },
});

export default arrivalReducer.reducer;
export const { arrivalData } = arrivalReducer.actions;