// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
//
// type Props = {}
//
// const Page = (props: Props) => {
//   return (
//     <View style={styles.container}>
//       <Text>Settings Screen</Text>
//     </View>
//   )
// }
//
// export default Page
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// })
import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, Button, Alert } from 'react-native';
import {router} from "expo-router";

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((previousState) => !previousState);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => console.log("User logged out") },
    ]);
  };

  return (
      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <Text style={[styles.text, isDarkMode && styles.darkText]}>Settings</Text>

        <View style={styles.settingItem}>
          <Text style={[styles.text, isDarkMode && styles.darkText]}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>

        <Button title="Logout" onPress={()=>router.replace("index")} color={isDarkMode ? "#FF6B6B" : "#007AFF"} />
      </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  darkContainer: {
    backgroundColor: "#1E1E1E",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  darkText: {
    color: "#FFF",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
});
