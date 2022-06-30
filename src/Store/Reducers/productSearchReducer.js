import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
// {
//     product: [],
// }

const productSearchReducer = createSlice({
    name: 'productsearch',
    initialState: { initialState },
    reducers: {
        productSearchData: (state, { payload }) => {
            state.initialState = payload;
        },
    },
});

export default productSearchReducer.reducer;
export const { productSearchData } = productSearchReducer.actions;