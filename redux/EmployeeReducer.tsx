import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Employee} from "../model/employee";

const initialState :Employee[]=[];

const api = axios.create({
    baseURL : "http://localhost:3001/employee",
})

export const getAllEmployee = createAsyncThunk(
    'employee/getAllEmployee',
    async () => {
        try {
            const response = await api.get('/getAll');
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
);


export  const customerSlice = createSlice({
    name :'employee',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{

        builder
            .addCase(getAllEmployee.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(getAllEmployee.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(getAllEmployee.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                return action.payload
            })

    }
})

export default customerSlice.reducer;