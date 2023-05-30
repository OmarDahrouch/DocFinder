import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const DoctorItem = ({ doctor, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DoctorDetails", {
          Id: doctor._id,
          first_name: doctor.first_name,
          last_name: doctor.last_name,
          specialization: doctor.specialization,
          adress: doctor.adress,
        });
      }}
    >
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/images/images.png")}
            style={styles.profileImage}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>
              {doctor.first_name} {doctor.last_name}
            </Text>
            <Text style={styles.specialization}>{doctor.specialization}</Text>
            <Text style={styles.adress}>{doctor.adress}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginTop: 4,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  specialization: {
    fontSize: 16,
    color: "#888888",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#888888",
  },
});

export default DoctorItem;
