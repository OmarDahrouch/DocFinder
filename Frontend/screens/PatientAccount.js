import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PatientAccount = () => {
  const [patient, setPatient] = useState(null);

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
          "http://192.168.100.7:3000/patient/account",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setPatient(response.data.patient);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatientInfo();
  }, []);

  if (!patient) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Patient Account</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.value}>{patient.first_name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.value}>{patient.last_name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{patient.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{patient.phone_number}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{patient.address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    flex: 1,
    fontWeight: "bold",
  },
  value: {
    flex: 2,
  },
});

export default PatientAccount;
