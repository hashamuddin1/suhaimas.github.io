import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
// {
//     product: [],
// }

const productReducer = createSlice({
    name: 'product',
    initialState: { initialState },
    reducers: {
        productData: (state, { payload }) => {
            state.initialState = payload;
        },
    },
});

export default productReducer.reducer;
export const { productData } = productReducer.actions;