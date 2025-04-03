import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state) => state,
    addProducts: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { getProducts, addProducts } = productSlice.actions;
export default productSlice.reducer;
