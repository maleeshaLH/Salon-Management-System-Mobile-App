import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, Button, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientDetails, logOutUser } from "../../redux/ClientReducer";
import { AppDispatch } from "../../store/store";

const ClientDetails: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Get client details, loading, and error from Redux store
    const { clientDetails, loading, error } = useSelector((state: any) => state.client);

    useEffect(() => {
        dispatch(fetchClientDetails());
    }, [dispatch]);

    console.log("🔍 Redux State:", { clientDetails, loading, error });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Client Details</Text>

            {/* Show loading indicator */}
            {loading && <ActivityIndicator size="large" color="#0000ff" />}

            {/* Show error message if request fails */}
            {error && <Text style={styles.errorText}>Error: {error}</Text>}

            {/* Show client details */}
            {clientDetails && (
                <View style={styles.card}>
                    <Image
                        source={{ uri: clientDetails.profileImage || "https://via.placeholder.com/100" }}
                        style={styles.profileImage}
                    />
                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>Name: {clientDetails.name}</Text>
                        <Text style={styles.text}>Email: {clientDetails.email}</Text>
                        <Text style={styles.text}>Phone: {clientDetails.phone}</Text>
                    </View>
                </View>
            )}

            <View style={styles.actions}>
                <Button title="Refresh" onPress={() => dispatch(fetchClientDetails())} />
                <Button title="Log Out" onPress={() => dispatch(logOutUser())} color="red" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        alignItems: "center",
        width: "90%",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    infoContainer: {
        alignItems: "center",
    },
    text: {
        fontSize: 19,
        marginBottom: 5,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
    actions: {
        flexDirection: "row",
        marginTop: 20,
        gap: 10,
    },
});

export default ClientDetails;
