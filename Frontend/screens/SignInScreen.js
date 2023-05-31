import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import Logo from "../components/Logo";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSignInPressed = async () => {
    try {
      const response = await axios.post(
        "http://192.168.2.102:3000/patients/signin",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      await AsyncStorage.setItem("token", token);

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

  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Logo style={styles.logo} />
      </View>
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

        <CustomButton
          text="Sign In"
          onPress={onSignInPressed}
          type="PRIMARY"
          bgColor="#00a79d"
          fgColor="white"
        />

        <CustomButton
          text="Sign Up"
          onPress={onSignUpPressed}
          type="OUTLINE"
          bgColor="#00a79d"
          fgColor="white"
          style={styles.signUpButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  logoContainer: {
    marginBottom: -110,
  },
  logo: {
    width: 500,
    height: 400,
  },
  root: {
    width: "80%",
    padding: 10,
  },
  signUpButton: {
    marginTop: 10,
  },
});

export default SignInScreen;
