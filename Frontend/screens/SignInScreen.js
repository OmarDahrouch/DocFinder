import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
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

      const { token, patientId } = response.data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("patientId", patientId);

      console.log(response.data);
      setEmail("");
      setPassword("");
      setSuccessMessage("Sign in successful");
      Alert.alert("Success", "Logged In Successfully !!");
      navigation.navigate("Recherche");
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
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
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
        <View style={styles.button}>
          <CustomButton
            text="Sign In"
            onPress={onSignInPressed}
            type="PRIMARY"
            bgColor="#00a79d"
            fgColor="white"
          />
        </View>
        <TouchableOpacity onPress={onSignUpPressed}>
          <Text style={styles.footerText}>Don't have an account ? Sign Up</Text>
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
    alignItems: "center",
    marginBottom: "40%",
  },
  logoContainer: {
    marginBottom: -110,
  },
  logo: {
    width: 500,
    height: 400,
    margin: 40,
  },
  root: {
    width: "80%",
    padding: 10,
  },
  button: {
    width: "100%",
    marginTop: 20,
  },
  footerText: {
    margin: 20,
    color: "gray",
    fontSize: 16,
  },
});

export default SignInScreen;
