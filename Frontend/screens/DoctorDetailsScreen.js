import React, { useState, useEffect } from "react";
import { Avatar, Button } from "react-native-elements";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import axios from "axios";

const DoctorDetailsScreen = ({ route, navigation }) => {
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    fetchDoctor(route.params.Id);
  }, []);

  const fetchDoctor = async (query) => {
    try {
      const response = await axios.get(
        `http://192.168.2.102:3000/doctor/${query}`
      );
      setDoctor(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(doctor);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Dr. {doctor.first_name} {doctor.last_name}
      </Text>

      <Text style={styles.label}>{doctor.specialization}</Text>
      <Text style={styles.label}>{doctor.location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default DoctorDetailsScreen;
