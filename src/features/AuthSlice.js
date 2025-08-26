import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk('auth/userLogin', async (body, { rejectWithValue }) => {
    console.log('Body :', body);

    try {
        let response = await axios.post('http://localhost:3000/api/login', body, {
            withCredentials: true
        })

        console.log('Login response :', response);
        return response.data

    }
    catch (error) {
        console.log('Error while loggin user : ', error);
        return rejectWithValue(error.response.data.message);
    }
})

export const userRegister = createAsyncThunk('auth/userRegister', async (body, { rejectWithValue }) => {

    try {
        let response = await axios.post('http://localhost:3000/api/register', body)
        console.log('Register response :', response);


    } catch (error) {
        console.log("Error while registering a user :", error);
        return rejectWithValue(error.response.data.message);
    }
})

export const userLogout = createAsyncThunk('auth/userLogout', async (_, { rejectWithValue }) => {

    try {
        let response = await axios.post('http://localhost:3000/api/logout',{}, {
            withCredentials: true 
        })
        console.log('logout response :', response);
    } catch (error) {
        console.log("Error while logging out a user :", error);
        return rejectWithValue(error.response.data.message);
    }
})



export const checkAuth = createAsyncThunk('auth/checkAuth', async (__, { rejectWithValue }) => {
    try {
        let response = await axios.get('http://localhost:3000/api/check-token', {
            withCredentials: true
        })

        console.log('check auth response :', response);
        return response.data.user;
    } catch (error) {
        console.log('Error while checking auth  : ', error);
        return rejectWithValue(error.response.data.message);
    }
})


export const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        role: null,
        user: {},
        isAuth: false,
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state, action) => {
                console.log('Login pending :', action);
                state.isLoading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                console.log('Login fulfilled :', action);
                state.isLoading = false;
                state.isAuth = true;
                state.role = action.payload.role;
                state.error = null
            })
            .addCase(userLogin.rejected, (state, action) => {
                console.log('Login rejected :', action.payload);
                state.isLoading = false;
                state.error = action.payload
            })

            // register user 
            .addCase(userRegister.pending, (state, action) => {
                console.log('Register pending :', action);
                state.isLoading = true;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                console.log('Register fulfilled :', action);
                state.isLoading = false;
                state.error = null
            })
            .addCase(userRegister.rejected, (state, action) => {
                console.log('Register rejected :', action.payload);
                state.isLoading = false;
                state.error = action.payload
            })

            // checking user token
            .addCase(checkAuth.pending, (state, action) => {
                console.log('check auth pending :', action);
                state.isAuth = false;
                state.isLoading = true;
                state.error = null
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                console.log('check auth fulfilled :', action);
                state.isAuth = true;
                state.isLoading = false;
                state.user = action.payload;
                state.role = action.payload.role
                state.error = null
            })
            .addCase(checkAuth.rejected, (state, action) => {
                console.log('check auth rejected :', action.payload);
                state.isAuth = false;
                state.isLoading = false;
                state.error = action.payload
            })

            //logut
            .addCase(userLogout.pending, (state, action) => {
                console.log('logut pending :', action);
                state.isLoading = true;
            })
            .addCase(userLogout.fulfilled, (state, action) => {
                console.log('logut fulfilled :', action);
                state.isLoading = false;
                state.isAuth = false;
                // state.role = action.payload.role;
                state.error = null
            })
            .addCase(userLogout.rejected, (state, action) => {
                console.log('logut rejected :', action.payload);
                state.isLoading = false;
                state.error = action.payload
            })


    }
})

export default AuthSlice.reducer;