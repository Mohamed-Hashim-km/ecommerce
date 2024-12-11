import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productData";
import { isWorkReducer } from "./isWork";

export const store = configureStore({
    reducer:{
        loaderState:isWorkReducer,
        productState:productReducer
        
    }
})