import { createSlice } from "@reduxjs/toolkit";

const productDataSlice = createSlice({
  name: "productData",
  initialState: {
    productDatas: [],
  },
  reducers: {
    productDataStore: (state, action) => {
      state.productDatas.push(action.payload);
    },
  },
});

export const productReducer = productDataSlice.reducer;
export const { productDataStore } = productDataSlice.actions;
