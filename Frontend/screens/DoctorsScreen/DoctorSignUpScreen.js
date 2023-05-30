import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [adress, setAdress] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [description, setDescription] = useState("");
  const [profile_picture, setProfile_Picture] = useState("");

  const onSignUpPressed = async () => {
    try {
      const response = await axios.post(
        "http://172.20.10.2:3000/doctor/signup",
        {
          first_name: firstName,
          last_name: lastName,
          adress,
          phone_number,
          email,
          password,
          city,
          zip,
          specialization,
          description,
          profile_picture,
        }
      );

      console.log(response.data); // Assuming the response contains a success message

      setFirstName("");
      setLastName("");
      setAdress("");
      setEmail("");
      setCity("");
      setZip("");
      setPhone_Number("");
      setSpecialization("");
      setDescription("");
      setProfile_Picture("");

      Alert.alert("Success", "Sign up successful");
      navigation.navigate("DoctorSignIn");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to sign up. Please try again.");
    }
  };

  const onLogInPressed = () => {
    navigation.navigate("DoctorSignIn");
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
          name="address"
          placeholder="Address"
          value={adress}
          onChangeText={setAdress}
        />
        <CustomInput
          name="phoneNumber"
          placeholder="Phone Number"
          value={phone_number}
          onChangeText={setPhone_Number}
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
          name="city"
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <CustomInput
          name="zip"
          placeholder="Zip"
          value={zip}
          onChangeText={setZip}
        />
        <CustomInput
          name="specialization"
          placeholder="Specialization"
          value={specialization}
          onChangeText={setSpecialization}
        />
        <CustomInput
          name="description"
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <CustomButton
          text="Sign Up"
          onPress={onSignUpPressed}
          buttonStyle={styles.signUpButton}
          textStyle={styles.signUpButtonText}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={onLogInPressed}>
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
    paddingTop: -20,
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
    backgroundColor: "#00a79d",
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
