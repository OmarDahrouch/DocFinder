import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PatientInfoScreen = () => {
  const [patient, setPatient] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Fetch patient information from the backend API
    fetchPatientInfo();
  }, [token]); // Include 'token' as a dependency

  const fetchPatientInfo = async () => {
    try {
      const response = await fetch("http://192.168.100.7:3000/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const currentPatient = data.patient;
        setPatient(currentPatient);
      } else {
        console.error("Failed to fetch patient information");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Retrieve the token from AsyncStorage and set it in state
    const retrieveToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("jwtToken");
        setToken(storedToken);
      } catch (error) {
        console.error(error);
      }
    };

    retrieveToken();
  }, []); // Run only once when the component mounts

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Information</Text>
      {patient ? (
        <View>
          <Text>First Name: {patient.first_name}</Text>
          <Text>Last Name: {patient.last_name}</Text>
          <Text>Email: {patient.email}</Text>
          <Text>Phone Number: {patient.phone_number}</Text>
          <Text>Address: {patient.address}</Text>
        </View>
      ) : (
        <Text>Loading patient information...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default PatientInfoScreen;
