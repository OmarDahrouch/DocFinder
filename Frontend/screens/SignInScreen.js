import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSignInPressed = async () => {
    try {
      const response = await axios.post(
        "http://192.168.100.7:3000/patients/signin",
        {
          email,
          password,
        }
      );

      console.log(response.data);
      setEmail("");
      setPassword("");
      setSuccessMessage("Sign in successful");
      Alert.alert("Success", "Logged In Successfully !!");
      navigation.navigate("PatientAccount");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to sign in. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    width: "80%",
    padding: 20,
  },
});

export default SignInScreen;
