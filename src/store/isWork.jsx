import { createSlice } from "@reduxjs/toolkit";


 const isWrok=createSlice({
    name:'loader',
    initialState:{
        isLoading:false,
        isLogged:false,
    },
    reducers:{
        loaderHandler:(state,action)=>{
          
       state.isLoading=action.payload;

        },
        loggedHandler:(state,action)=>{
            state.isLogged=action.payload;
        }
    }
 })
 
 


 export const isWorkReducer=isWrok.reducer;

 export const {loaderHandler,loggedHandler}=isWrok.actions