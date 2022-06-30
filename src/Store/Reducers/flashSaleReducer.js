import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
// {
//     product: [],
// }

const flashSaleReducer = createSlice({
    name: 'flashSale',
    initialState: { initialState },
    reducers: {
        flashSaleData: (state, { payload }) => {
            state.initialState = payload;
        },
    },
});

export default flashSaleReducer.reducer;
export const { flashSaleData } = flashSaleReducer.actions;