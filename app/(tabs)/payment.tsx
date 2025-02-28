
import React, { useState, useEffect } from "react";
import {
    View, Text, FlatList, Button, Modal, TextInput, StyleSheet, Alert
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getAllPayment, savePayment } from "../../redux/PaymentReducer";
import { Payment } from "../../model/payment";
import {getAllService} from "../../redux/ServiceReducer";

const generateRandomId = () => `MP-${Date.now()}-${Math.floor(Math.random() * 100)}`;

const PaymentScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { clientDetails } = useSelector((state: any) => state.client);
    const appointments = useSelector((state: any) => state.appointments);
    const services = useSelector((state: any) => state.service);

    // State variables
    const [modalVisible, setModalVisible] = useState(false);

    const [paymentId, setPaymentId] = useState("");
    const [appointmentId, setAppointmentId] = useState("");
    const [paymentDate, setPaymentDate] = useState<Date>(new Date());
    const [amount, setAmount] = useState<number>(0);

    useEffect(() => {
        dispatch(getAllPayment());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllService())
    }, [dispatch]);

    useEffect(() => {
        setPaymentId(generateRandomId());
    }, []);

    // Filter only logged-in client's appointments
    const clientAppointments = appointments.filter(
        (item: any) => item.customerId === clientDetails?.email
    );

    // Function to set payment details and open modal
    const handlePayNow = (appointment: any) => {
        setAppointmentId(appointment.appointmentId);
        setPaymentDate(new Date());  // Set current date
        const selectedService = services.find((ser: { name: string }) => ser.name === appointment.serviceType);

        if (selectedService) {
            setAmount(selectedService.price);
            console.log('price '+selectedService.price)// Set service price
            console.log('payment id'+paymentId)
        } else {
            setAmount(0);
        }
        setModalVisible(true);
    };

    // Function to save payment
    const handleConfirmPayment = () => {
        if (!appointmentId || amount <= 0) {
            Alert.alert("Error", "Invalid payment details.");
            return;
        }

        const newPayment: Payment = { paymentId,appointmentId, paymentDate, amount };
        dispatch(savePayment(newPayment));

        Alert.alert("Success", "Payment saved successfully!");
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Appointments</Text>
            <FlatList
                data={clientAppointments}
                keyExtractor={(item) => item.appointmentId}
                renderItem={({ item }) => (
                    <View style={styles.appointmentCard}>
                        <Text style={styles.text}>📅 {item.date} at {item.time}</Text>
                        <Text style={styles.text}>💇 {item.serviceType}</Text>
                        <Text style={styles.text}>💰 Price: ${services.find((s: any) => s.name === item.serviceType)?.price || "N/A"}</Text>
                        <Button title="Pay Now" onPress={() => handlePayNow(item)} />
                    </View>
                )}
            />

            {/* Payment Modal */}
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Confirm Payment</Text>
                    <Text>Appointment ID: {appointmentId}</Text>
                    <Text>Amount: ${amount}</Text>
                    <Text>Date: {paymentDate.toISOString().split("T")[0]}</Text>

                    <Button title="Confirm Payment" onPress={handleConfirmPayment} />
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
    },
    text: {
        fontSize: 16,
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
});

export default PaymentScreen;
