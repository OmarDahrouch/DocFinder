import React, { useState } from "react";
import {
  View,
  StyleSheet,
  // useWindowDimensions,
  ScrollView,
  Alert,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
// import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SignInScreen = () => {
  // const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State variable for success message

  const onSignInPressed = async () => {
    try {
      const response = await axios.post(
        "http://192.168.100.216:3000/patients/signin",
        {
          email,
          password,
        }
      );
      // Handle the response from the backend
      console.log(response.data); // Assuming the response contains a token or user information

      // Reset the form
      setEmail("");
      setPassword("");

      // Set the success message
      setSuccessMessage("Sign in successful");
      Alert.alert("Success", "Logged In Successfuly !!");
    } catch (error) {
      // Handle error
      console.log(error);

      // Show an error message to the user
      Alert.alert("Error", "Failed to sign in. Please try again.");
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <CustomInput
          name="email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />

        <CustomInput
          name="password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <CustomButton text="Sign In" onPress={onSignInPressed} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 200,
  },
});

export default SignInScreen;
