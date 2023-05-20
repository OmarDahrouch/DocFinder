import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import axios from "axios";

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const onSignUpPressed = async () => {
    try {
      const response = await axios.post(
        "http://192.168.100.216:3000/patients",
        {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          phone_number: phoneNumber,
          address,
        }
      );

      console.log(response.data); // Assuming the response contains a success message

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setAddress("");

      Alert.alert("Success", "Sign up successful");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to sign up. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View style={styles.form}>
        <CustomInput
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <CustomInput
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <CustomInput
          name="email"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <CustomInput
          name="phoneNumber"
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <CustomInput
          name="address"
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <CustomButton
          text="Sign Up"
          onPress={onSignUpPressed}
          buttonStyle={styles.signUpButton}
          textStyle={styles.signUpButtonText}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  form: {
    marginBottom: 20,
  },
  signUpButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 14,
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    color: "#333333",
    fontSize: 16,
  },
});

export default SignUpScreen;
