import { configureStore } from "@reduxjs/toolkit";
import { loadeReducer } from "./loaderSlicer";

export const store = configureStore({
    reducer:{
        loaderState:loadeReducer
        
    }
})