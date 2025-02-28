import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Service} from "../model/service";

const initialState :Service[]=[];

const api = axios.create({
    baseURL : "http://localhost:3001/service",
})



export const getAllService = createAsyncThunk(
    'service/getAllService',
    async () => {
        try {
            const response = await api.get('/getAll');
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
);


export  const serviceSlice = createSlice({
    name :'service',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{

        builder
            .addCase(getAllService.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(getAllService.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(getAllService.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                return action.payload
            })

    }
})

export default serviceSlice.reducer;