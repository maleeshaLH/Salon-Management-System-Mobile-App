import {configureStore} from "@reduxjs/toolkit";
import appointmentReducer from "../redux/AppointmentReducer";
import paymentReducer from "../redux/PaymentReducer";
import clientReducer from "../redux/ClientReducer";
import serviceReducer from "../redux/ServiceReducer";
import employeeReducer from "../redux/EmployeeReducer";


export const store = configureStore({
    reducer: {
        appointments: appointmentReducer,
        payment: paymentReducer,
        client: clientReducer,
        service: serviceReducer,
        employee: employeeReducer,

    }
});

export type AppDispatch = typeof store.dispatch;

