import React, {useEffect, useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from "react-native";
import { router } from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store/store";
import {Client} from "../model/client";
import {loginClient} from "../redux/ClientReducer";
import {navigate} from "expo-router/build/global-state/routing";

export default function SignIn() {

    const dispatch = useDispatch<AppDispatch>();
    // @ts-ignore
    const isAuthenticated = useSelector((state)=>state.client.isAuthenticated);

    const [clientEmail, setClientEmail] = useState("");
    const [clientPassword, setClientPassword] = useState("");

    const handleLogin = () => {
        const newClient:Client = {clientEmail,clientPassword}
        dispatch(loginClient(newClient))
    };
    setTimeout(() => {
        console.log("Updated isAuthenticated:", isAuthenticated);
    }, 1000);
    const [clientData, setClientData] = useState([]);
    useEffect(() => {
        if(isAuthenticated){
            // setClientData(prevData => [...prevData, clientEmail]);
            setClientData([])
            router.replace("/(tabs)");
            Alert.alert("Sign In Successfully!");

        }
    }, [isAuthenticated]);
    useEffect(() => {
        console.log('view', clientData); // Update wela passe log karanawa
    }, [clientData]);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" onChangeText={setClientEmail} value={clientEmail} keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#aaa" onChangeText={setClientPassword} value={clientPassword} secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace("/signUp")}>
                <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a202c" },
    title: { color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    input: { width: "80%", padding: 12, borderRadius: 5, backgroundColor: "#4a5568", color: "white", marginBottom: 15 },
    button: { backgroundColor: "#3182ce", paddingVertical: 12, width: "80%", borderRadius: 5, alignItems: "center" },
    buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
    signUpText: { color: "#a0aec0", marginTop: 10 },
});
