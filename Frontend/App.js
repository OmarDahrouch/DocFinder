import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import Navigation from "./navigation";
import SignInScreen from "./screens/SignInScreen";
import SearchBar from "./components/searchBar";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Navigation /> */}
      <SearchBar />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
