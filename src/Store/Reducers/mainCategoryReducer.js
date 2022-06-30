import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
//  {
//     category: [],
// }

const mainCategoryReducer = createSlice({
    name: 'category',
    initialState: { initialState },
    reducers: {
        categoryData: (state, { payload }) => {
            state.initialState = payload;
        },
    },
});

export default mainCategoryReducer.reducer;
export const { categoryData } = mainCategoryReducer.actions;