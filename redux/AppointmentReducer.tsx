import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Appointment} from "../model/appointment";

const initialState :Appointment[]=[];

const api = axios.create({
    baseURL : "http://localhost:3001/appointment",
})

export const saveAppointment = createAsyncThunk(
    'appointment/saveAppointment',
    async (appointment: Appointment) => {
        try {
            const response = await api.post('/add', appointment);
            return response.data;
        } catch (error) {
            return console.log('error reducer',error)
        }
    }
);

export const getAllAppointment = createAsyncThunk(
    'appointment/getAllAppointment',
    async () => {
        try {
            const response = await api.get('/getAll');
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
);

export const  deleteAppointment = createAsyncThunk(
    'appointment/deleteAppointment',
    async (id:string)=> {
        try {
            const  response = await api.delete(`/delete/${id}`)
            return response.data;
        }catch (error){
            console.log(error)
        }
    }
)
export const updateAppointment  = createAsyncThunk(
    'appointment/updateAppointment',
    async (appointment :Appointment) => {
        try {
            const response = await api.put(`/update/${appointment.appointmentId}`,appointment)
            return response.data;
        }catch (err) {
            console.log(err)
        }
    }
)
export  const appointmentSlice = createSlice({
    name :'appointment',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(saveAppointment.pending,(state,action) =>{
            console.log("pending",action.payload)
            })
            .addCase(saveAppointment.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(saveAppointment.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                state.push(action.payload)
                alert(action.payload)
            })

        builder
            .addCase(getAllAppointment.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(getAllAppointment.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(getAllAppointment.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                return action.payload
            })
        builder
            .addCase(deleteAppointment.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(deleteAppointment.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(deleteAppointment.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                return state.filter((appointment : Appointment)=>appointment.appointmentId !== action.payload.appointmentId)
                alert(action.payload)
            })
        builder
            .addCase(updateAppointment.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(updateAppointment.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(updateAppointment.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                const appointment = state.find((appointment : Appointment)=> appointment.appointmentId === action.payload.appointmentId)
                if(appointment){
                    appointment.date = action.payload.date;
                    appointment.time = action.payload.time;
                    appointment.serviceType = action.payload.serviceType;
                    appointment.customerId = action.payload.customerId;
                    appointment.employeeId = action.payload.employeeId;

                }
                alert(action.payload)
            })


    }
})

export default appointmentSlice.reducer;