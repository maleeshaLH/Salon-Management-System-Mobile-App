import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Payment} from "../model/payment";

const initialState :Payment[]=[];

const api = axios.create({
    baseURL : "http://localhost:3001/payment",
})

export const savePayment = createAsyncThunk(
    'payment/savePayment',
    async (payment: Payment) => {
        try {
            const response = await api.post('/add', payment);
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
);

export const getAllPayment = createAsyncThunk(
    'payment/getAllPayment',
    async () => {
        try {
            const response = await api.get('/getAll');
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
);

export const  deletePayment = createAsyncThunk(
    'payment/deleteAppointment',
    async (id:string)=> {
        try {
            const  response = await api.delete(`/delete/${id}`)
            return response.data;
        }catch (error){
            console.log(error)
        }
    }
)
export const updatePayment  = createAsyncThunk(
    'payment/updatePayment',
    async (payment :Payment) => {
        try {
            const response = await api.put(`/update/${payment.paymentId}`,payment)
            return response.data;
        }catch (err) {
            console.log(err)
        }
    }
)
export  const paymentSlice = createSlice({
    name :'payment',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(savePayment.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(savePayment.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(savePayment.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                state.push(action.payload)
                alert(action.payload)
            })

        builder
            .addCase(getAllPayment.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(getAllPayment.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(getAllPayment.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                return action.payload
            })
        builder
            .addCase(deletePayment.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(deletePayment.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(deletePayment.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                return state.filter((payment : Payment)=>payment.paymentId !== action.payload.paymentId)
                alert(action.payload)
            })
        builder
            .addCase(updatePayment.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(updatePayment.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(updatePayment.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                const payment = state.find((payment : Payment)=> payment.paymentId === action.payload.paymentId)
                if(payment){
                    payment.appointmentId = action.payload.appointmentId;
                    payment.paymentDate = action.payload.paymentDate;
                    payment.amount = action.payload.amount;
                }
                alert(action.payload)
            })


    }
})

export default paymentSlice.reducer;