import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput/CustomInput";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../components/Logo";

const PatientAccount = ({ navigation }) => {
  const [patient, setPatient] = useState(null);
  const [patientFirstName, setPatientFirstName] = useState("");
  const [patientLastName, setPatientLastName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhoneNumber, setPatientPhoneNumber] = useState("");
  const [patientAddress, setPatientAddress] = useState("");

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          // Token not found, handle the error or redirect to sign-in
          console.log("Token not found");
          return;
        }

        const response = await axios.get(
          "http://192.168.2.102:3000/patient/account",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const fetchedPatient = response.data.patient;
        setPatient(fetchedPatient);
        setPatientFirstName(fetchedPatient.first_name);
        setPatientLastName(fetchedPatient.last_name);
        setPatientEmail(fetchedPatient.email);
        setPatientPhoneNumber(fetchedPatient.phone_number);
        setPatientAddress(fetchedPatient.address);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatientInfo();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        // Token not found, handle the error or redirect to sign-in
        console.log("Token not found");
        return;
      }

      const { _id } = patient;

      const updatedPatient = {
        id: _id,
        first_name: patientFirstName,
        last_name: patientLastName,
        email: patientEmail,
        phone_number: patientPhoneNumber,
        address: patientAddress,
      };

      const response = await axios.put(
        `http://192.168.100.7:3000/patients/${_id}`,
        updatedPatient,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Handle the response as needed
      console.log("Patient information updated:", response.data);

      // Display success alert
      Alert.alert("Success", "Patient information updated successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("patientId");
      navigation.navigate("SignIn");
    } catch (error) {
      console.error(error);
    }
  };

  if (!patient) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Logo style={styles.logo} />
        <Text style={styles.label}>Prénom</Text>
        <View style={styles.infoContainer}>
          <CustomInput
            value={patientFirstName}
            onChangeText={setPatientFirstName}
          />
        </View>
        <Text style={styles.label}>Nom</Text>
        <View style={styles.infoContainer}>
          <CustomInput
            value={patientLastName}
            onChangeText={setPatientLastName}
          />
        </View>
        <Text style={styles.label}>Email</Text>
        <View style={styles.infoContainer}>
          <CustomInput value={patientEmail} onChangeText={setPatientEmail} />
        </View>
        <Text style={styles.label}>Telephone</Text>
        <View style={styles.infoContainer}>
          <CustomInput
            value={patientPhoneNumber}
            onChangeText={setPatientPhoneNumber}
          />
        </View>
        <Text style={styles.label}>Adresse</Text>
        <View style={styles.infoContainer}>
          <CustomInput
            value={patientAddress}
            onChangeText={setPatientAddress}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={handleUpdate}
            text="Update"
            type="PRIMARY"
            bgColor="#00a79d"
            fgColor="white"
          />
          <CustomButton
            onPress={handleSignOut}
            text="Sign Out"
            type="PRIMARY"
            bgColor="#FF7C6F"
            fgColor="white"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    color: "#555",
  },
  logo: {
    width: 450,
    height: 300,
    marginBottom: -50,
    marginTop: -80,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 14,
    alignItems: "center",
  },
  label: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 4,
    marginBottom: 20,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

export default PatientAccount;
