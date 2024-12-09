import { createSlice } from "@reduxjs/toolkit";


 const loaderSlice=createSlice({
    name:'loader',
    initialState:{
        isLoading:false
    },
    reducers:{
        loaderHandler:(state,action)=>{
          
       state.isLoading=action.payload;

        }
    }
 })


 export const loadeReducer=loaderSlice.reducer;

 export const {loaderHandler}=loaderSlice.actions