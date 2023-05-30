import React from "react";
import { Avatar, Button } from "react-native-elements";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const DoctorDetailsScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Dr. {route.params.first_name} {route.params.last_name}
      </Text>

      <Text style={styles.label}>{route.params.specialization}</Text>
      <Text style={styles.label}>{route.params.adress}</Text>
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
