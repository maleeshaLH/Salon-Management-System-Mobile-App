import React, { useState, useEffect } from "react";
import {
    View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, StyleSheet, Alert
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { saveAppointment, getAllAppointment, deleteAppointment, updateAppointment } from "../../redux/AppointmentReducer";
import { Ionicons } from "@expo/vector-icons";
import {Appointment} from "../../model/appointment";
import {getAllService} from "../../redux/ServiceReducer";
import { Picker } from '@react-native-picker/picker';
import {getAllEmployee} from "../../redux/EmployeeReducer";
import {fetchClientDetails} from "../../redux/ClientReducer";

const generateRandomId = () => `M-${Date.now()}-${Math.floor(Math.random() * 100)}`;


const AppointmentScreen: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [appointmentId, setAppointmentId] = useState("");
    const [date, setDate] = useState<Date>(new Date());
    const [time, setTime] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const appointments = useSelector((state: any) => state.appointments);
    const { clientDetails, loading, error } = useSelector((state: any) => state.client);
    const employees = useSelector((state: any) => state.employee);

    useEffect(() => {
        dispatch(fetchClientDetails());
    }, [dispatch]);

    useEffect(() => {
        if (clientDetails) {
            setCustomerId(clientDetails.email);
            console.log('cli email '+clientDetails.email);
        }
    }, [clientDetails]);

    useEffect(() => {
        console.log(' customerId:', customerId);
    }, [customerId]);

    useEffect(() => {
        dispatch(getAllAppointment());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllEmployee())
    }, [dispatch]);

    useEffect(() => {
        setAppointmentId(generateRandomId());
    }, []);
    const resetForm = () => {
        setAppointmentId(generateRandomId);
        setDate(new Date());
        setTime("");
        setServiceType("");
        setCustomerId("");
        setEmployeeId("");
    };

    const handleAddEdit = () => {
        setAppointmentId(generateRandomId());
        const newAppointment: Appointment = { appointmentId, date, time, serviceType, customerId, employeeId };
        console.log(newAppointment);
        dispatch(saveAppointment(newAppointment))
        console.log('save appointment')
        Alert.alert("success", "All fields are required!");

        setModalVisible(false);
        resetForm();
    };

    const handleEmployeeChange = (employeeDesignation: string) => {
        const selectedEmployee = employees.find((emp: { designation: string }) => emp.designation === employeeDesignation);
        if (selectedEmployee) {
            setEmployeeId(selectedEmployee.employeeName);
            console.log(selectedEmployee.employeeName);
        }

        if (clientDetails) {
            setCustomerId(clientDetails.email);
            setAppointmentId(generateRandomId())
            console.log('cli email '+clientDetails.email);
        }

        console.log('appo id'+appointmentId)
    };
    const viewEmployeeName = (employeeId: string) => {
        const selectedEmployee = employees.find((emp: { employeeId: string }) => emp.employeeId === employeeId);
        if (selectedEmployee) {
            setEmployeeId(selectedEmployee.employeeName);
            console.log(selectedEmployee.employeeId);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Appointments</Text>
            {/*<FlatList*/}
            {/*    data={appointments}*/}
            {/*    keyExtractor={(item) => item.appointmentId}*/}
            {/*    renderItem={({ item }) => (*/}
            {/*        <View style={styles.appointmentCard}>*/}
            {/*            <View>*/}
            {/*                <Text style={styles.text}>📅 {item.date} at {item.time}</Text>*/}
            {/*                <Text style={styles.text}>💇 {item.serviceType}</Text>*/}
            {/*                <Text style={styles.text}>👤 Customer: {item.customerId}</Text>*/}
            {/*                <Text style={styles.text}>👨‍🔧 Employee: {item.employeeId}</Text>*/}
            {/*            </View>*/}

            {/*        </View>*/}
            {/*    )}*/}
            {/*/>*/}
            <FlatList
                data={appointments.filter((item) => item.customerId === clientDetails?.email)}
                keyExtractor={(item) => item.appointmentId}
                renderItem={({ item }) => (
                    <View style={styles.appointmentCard}>
                        <View>
                            <Text style={styles.text}>💇 {item.serviceType}</Text>
                            <Text style={styles.text}>👤 Customer: {item.customerId}</Text>
                            <Text style={styles.text}>👨‍🔧 Staff Name: {item.employeeId}</Text>
                            <Text style={styles.text}>📅 {item.date} at {item.time}</Text>
                        </View>
                    </View>
                )}
            />

            <Button title="Add Appointment" onPress={() => { resetForm(); setIsEditing(false); setModalVisible(true); }} />

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{isEditing ? "Edit Appointment" : "New Appointment"}</Text>
                    {/*<TextInput placeholder="Service Type" style={styles.input} value={serviceType} onChangeText={setServiceType} />*/}

                    <Picker
                        selectedValue={serviceType}
                        onValueChange={(itemValue) =>{
                            setServiceType(itemValue);
                            handleEmployeeChange(itemValue);
                        }}
                        style={styles.input}
                    >
                        <Picker.Item label="Select a Service Type" value="" />
                        {employees.map((employee: { employeeId: string; designation: string }) => (
                            <Picker.Item key={employee.employeeId} label={employee.designation} value={employee.designation} />
                        ))}
                    </Picker>
                    <TextInput placeholder="Date (YYYY-MM-DD)" style={styles.input} value={date ? date.toISOString().split("T")[0] : ""} onChangeText={(text) =>setDate(new Date(text))} />
                    <TextInput placeholder="Time " style={styles.input} value={time} onChangeText={setTime} />
                    {/*<TextInput placeholder="Customer ID" style={styles.input} value={customerId} onChangeText={setCustomerId} />*/}
                    {/*<TextInput placeholder="Employee ID" style={styles.input} value={employeeId} onChangeText={setEmployeeId} />*/}

                    <Button title={ "Save"} onPress={handleAddEdit} />
                    <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    appointmentCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text: {
        fontSize: 16,
    },
    actions: {
        flexDirection: "row",
        gap: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default AppointmentScreen;
