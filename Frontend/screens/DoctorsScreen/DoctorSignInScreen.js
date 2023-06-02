import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const DoctorSignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSignInPressed = async () => {
    try {
      const response = await axios.post(
        "http://192.168.2.102:3000/doctor/signin",
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
      navigation.navigate("DoctorAccount");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to sign in. Please try again.");
    }
  };

  const onSignUpPressed = () => {
    navigation.navigate("DoctorSignUp");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.root}>
        <CustomInput
          name="email"
          placeholder="Enter your doctor email"
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

export default DoctorSignInScreen;
