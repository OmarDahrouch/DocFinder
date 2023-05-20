import React from "react";
import { View, StyleSheet, Text } from "react-native";

const DoctorItem = ({ doctor }) => {
  return (
    <View style={styles.doctorContainer}>
      <Text style={styles.doctorName}>
        {doctor.first_name} {doctor.last_name}
      </Text>
      <Text style={styles.doctorInfo}>Email: {doctor.email}</Text>
      <Text style={styles.doctorInfo}>Speciality: {doctor.specialization}</Text>
      <Text style={styles.doctorInfo}>Phone: {doctor.phone_number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  doctorContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#eaf2f8",
    borderRadius: 5,
  },
  doctorName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
    color: "#333333",
  },
  doctorInfo: {
    fontSize: 16,
    marginBottom: 3,
    color: "#666666",
  },
});

export default DoctorItem;
