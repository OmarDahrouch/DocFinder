import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AppointmentsItem from "../components/AppointmentsItem";
import axios from "axios";

const AppointmentsScreen = () => {
  const idPatient = "6466415f32496e2cc9854bb2";
  const [fetchResults, setFetchResults] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `http://192.168.2.102:3000/appointments/patient?idPatient=${idPatient}`
      );
      const data = response.data;
      setFetchResults(data);
      console.log(data);
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
