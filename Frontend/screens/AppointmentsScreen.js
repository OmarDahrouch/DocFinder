import React, { useEffect, useState } from "react";
import { View, FlatList, Alert } from "react-native";
import AppointmentsItem from "../components/AppointmentsItem";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppointmentsScreen = () => {
  const [fetchResults, setFetchResults] = useState([]);

  const fetchAppointments = async () => {
    try {
      const idPatient = await AsyncStorage.getItem("patientId");
      if (!idPatient) {
        // Handle the case when patient ID is not found
        Alert.alert("Error", "Patient ID not found. Please sign in again.");
        return;
      }

      const response = await axios.get(
        `http://192.168.2.102:3000/appointments/patient?idPatient=${idPatient}`
      );
      const data = response.data;
      setFetchResults(data);
    } catch (error) {
      console.error("Failed to fetch appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const renderAppointments = ({ item }) => {
    return <AppointmentsItem appointments={item} />;
  };

  return (
    <View>
      <FlatList
        data={fetchResults}
        renderItem={renderAppointments}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default AppointmentsScreen;
