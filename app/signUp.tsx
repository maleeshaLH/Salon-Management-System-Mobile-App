// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import {router} from "expo-router";
// // import { useDispatch } from "react-redux";
// // import { User } from "../../models/user";
// // import { registerUser } from "../../reducers/UserReducer";
// // import { AppDispatch } from "../../store/store";
//
// export default function SignUp ()  {
//     // const dispatch = useDispatch<AppDispatch>();
//
//     const [username, setUserName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//
//     const handleSubmit = () => {
//         // const newUser: User = { username, email, password };
//         // dispatch(registerUser(newUser));
//     };
//
//     return (
//         <View style={styles.container}>
//             <View style={styles.form}>
//                 <Text style={styles.title}>Sign Up</Text>
//
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Username"
//                     placeholderTextColor="#aaa"
//                     onChangeText={setUserName}
//                     value={username}
//                 />
//
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Email"
//                     placeholderTextColor="#aaa"
//                     onChangeText={setEmail}
//                     value={email}
//                     keyboardType="email-address"
//                 />
//
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Password"
//                     placeholderTextColor="#aaa"
//                     onChangeText={setPassword}
//                     value={password}
//                     secureTextEntry
//                 />
//
//                 <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//                     <Text style={styles.buttonText}>Sign Up</Text>
//                 </TouchableOpacity>
//
//                 {/*<TouchableOpacity>*/}
//                 {/*    <Text style={styles.signInText} onPress={()=>router.replace("/loginCustomer")}>Already a member? Login</Text>*/}
//                 {/*</TouchableOpacity>*/}
//                 <TouchableOpacity onPress={() => router.replace("/loginCustomer")}>
//                     <Text style={styles.signInText}>Already a member? Login</Text>
//                 </TouchableOpacity>
//
//             </View>
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#1a202c",
//     },
//     form: {
//         backgroundColor: "#2d3748",
//         padding: 20,
//         borderRadius: 10,
//         width: "80%",
//         alignItems: "center",
//     },
//     title: {
//         color: "white",
//         fontSize: 24,
//         fontWeight: "bold",
//         marginBottom: 20,
//     },
//     input: {
//         width: "100%",
//         padding: 12,
//         borderRadius: 5,
//         backgroundColor: "#4a5568",
//         color: "white",
//         marginBottom: 15,
//     },
//     button: {
//         backgroundColor: "#3182ce",
//         paddingVertical: 12,
//         width: "100%",
//         borderRadius: 5,
//         alignItems: "center",
//     },
//     buttonText: {
//         color: "white",
//         fontSize: 16,
//         fontWeight: "bold",
//     },
//     signInText: {
//         color: "#a0aec0",
//         marginTop: 10,
//     },
// });
//

import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from "react-native";
import { router } from "expo-router";
import {AppDispatch} from "../store/store";
import {useDispatch} from "react-redux";
import {Client} from "../model/client";
import {registerClient} from "../redux/ClientReducer";

export default function SignUp() {

    const dispatch = useDispatch<AppDispatch>();


    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientPhone, setClientPhone] = useState(0);
    const [clientPassword, setClientPassword] = useState("");

    const handleSubmit = () => {
        const newClient :Client = {
            clientName,clientEmail,clientPhone,clientPassword
        }
        dispatch(registerClient(newClient))
        Alert.alert("Sign Up Successfully!");
        console.log("newClient");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" onChangeText={setClientEmail} value={clientEmail} keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#aaa" onChangeText={setClientName} value={clientName}  />
            <TextInput style={styles.input} placeholder="phone number" placeholderTextColor="#aaa" onChangeText={(text)=>setClientPhone(Number(text))} value={clientPhone.toString()}  />
            <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#aaa" onChangeText={setClientPassword} value={clientPassword} secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace("/signIn")}>
                <Text style={styles.signInText}>Already have an account? Login</Text>
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
    signInText: { color: "#a0aec0", marginTop: 10 },
});

