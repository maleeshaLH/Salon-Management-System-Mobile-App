import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import {useRouter} from "expo-router";

const SalonBookingScreen = () => {
    const router = useRouter();
    return (
        <ImageBackground
            source={require("../assets/HomeImage.png")} // Replace with your image URL
            style={styles.background}
        >
            <View style={styles.overlay} />
            <View style={styles.content}>
                <Text style={styles.title}>Book your beauty salon at your home</Text>
                <Text style={styles.subtitle}>
                    Refine your skin to its innate beauty with the expertise to achieve the perfect tone.
                </Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={()=>router.replace("/signUp")}>Login</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for contrast
    },
    content: {
        position: "absolute",
        bottom: 50,
        width: "90%",
        alignItems: "center",
        textAlign: "center",
    },
    title: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        color: "#ccc",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#FF4D67", // Pink button color
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default SalonBookingScreen;
