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

export const deleteUser = createAsyncThunk('users/deleteUser',async (id,{rejectWithValue})=>{
    console.log('id after async thunk :',id);
    try {
        let response = await axios.delete(`http://localhost:3000/api/users/${id}`,{},{
            withCredentials: true 
        })
        console.log('Response delete user :',response);
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
        userDeleted:{
            isLoading:false,
            error:null
        },
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

        // delete user

        .addCase(deleteUser.pending,(state,action)=>{
            console.log('delete user pending :',action);
            state.userDeleted.isLoading = true;
            
            state.error=null
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            console.log('delete user fulfilled :',action);
            state.userDeleted.isLoading = false;
            state.users=action.payload;
            state.userDeleted.error=null
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            console.log('delete user rejected :',action);
            state.userDeleted.isLoading = false;
            state.userDeleted.error = action.payload;
        })
    }
})

export default userSlice.reducer;