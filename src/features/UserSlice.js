import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// getUsers

export const getUsers = createAsyncThunk('users/getUsers',async (__,{rejectWithValue})=>{
    try {
        let response = await axios.get('http://localhost:3000/api/users',{},{
            withCredentials: true 
        })
        console.log('Response get users :',response);
        return response.data.users;
        
    } catch (error) {
        console.log('error while hetting users : ',error);
        return rejectWithValue(error.data.message)
        
    }
})



export const userSlice = createSlice({
    name:"users",
    initialState:{
        users:[],
        isLoading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getUsers.pending,(state,action)=>{
            console.log('get users pending :',action);
            state.isLoading = true
        })
        .addCase(getUsers.fulfilled,(state,action)=>{
            console.log('get users fulfilled :',action);
            state.isLoading = false;
            state.users=action.payload;
            state.error=null
        })
        .addCase(getUsers.rejected,(state,action)=>{
            console.log('get users rejected :',action);
            state.isLoading = false;
            state.error=action.payload;
        })
    }
})

export default userSlice.reducer;