import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {Client} from "../model/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    jwt_token: null,
    refresh_token : null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: '',
    clientDetails: null,
};

const api = axios.create({
    baseURL : "http://localhost:3001/client"
})

export const registerClient= createAsyncThunk(
    'client/client-register',
    async (client : Client)=>{
        try{
            const response = await api.post('/client-register', {client},{withCredentials: true});
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)
export const fetchClientDetails = createAsyncThunk(
    'client/client-get',
    async (_, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem('jwt_token'); // 🔹 Token get from AsyncStorage

            if (!token) {
                return rejectWithValue("No Token Found");
            }

            const response = await api.get('/me', {
                headers: { Authorization: `Bearer ${token}` }
            });

            return response.data; // 🔹 Return client details
        } catch (err: any) {
            console.log("Error fetching client details", err);
            return rejectWithValue(err.response?.data || "Failed to fetch client");
        }
    }
);

export const loginClient= createAsyncThunk(
    'client/client-login',
    async (client : Client)=>{
        try{
            const response = await api.post('/client-login', {client},{withCredentials: true});
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)


const userSlice = createSlice({
    name: 'client',
    initialState,
    reducers:{
        logOutUser(state){
            state.isAuthenticated = false;
            state.clientDetails = null;
        }
    },
    extraReducers(builder){
        builder
            .addCase(registerClient.pending,(state, action)=>{
                console.log('Hello World');
            })
            .addCase(registerClient.fulfilled,(state, action)=>{
                console.log('Client Registered Successfully');
                alert('Client Registered Successfully!');
            })
            .addCase(registerClient.rejected,(state, action)=>{
                state.error = action.payload as string;
            });
        builder
            .addCase(loginClient.rejected,(state, action)=>{
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })
            .addCase(loginClient.fulfilled,(state, action)=>{
                state.jwt_token = action.payload.accessToken;
                state.refresh_token = action.payload.refreshToken;
                state.isAuthenticated = true;
                AsyncStorage.setItem('jwt_token', action.payload.accessToken);
            })
            .addCase(loginClient.pending,(state, action)=>{
                state.isAuthenticated = false;
            });
        builder
            .addCase(fetchClientDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchClientDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.clientDetails = action.payload; // 🔹 Store Client Data
            })
            .addCase(fetchClientDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

    }
});
export const {logOutUser} = userSlice.actions;
export default userSlice.reducer;