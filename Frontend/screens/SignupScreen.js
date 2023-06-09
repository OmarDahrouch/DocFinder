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
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const onSignUpPressed = async () => {
    try {
      const response = await axios.post(
        "http://192.168.2.102:3000/patients/signup",
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
      navigation.navigate("SignIn");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to sign up. Please try again.");
    }
  };

  const onLogInPressed = () => {
    navigation.navigate("SignIn");
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
        <View style={styles.signUpButton}>
          <CustomButton
            text="Sign Up"
            onPress={onSignUpPressed}
            bgColor="#00a79d"
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={onLogInPressed}>
          <Text style={styles.footerText}>
            Already have an account ? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
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
    width: "100%",
    marginTop: 20,
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
    color: "gray",
    fontSize: 16,
  },
});

export default SignUpScreen;
