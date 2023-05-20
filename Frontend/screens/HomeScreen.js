import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import axios from "axios";
import DoctorItem from "../components/DoctorItem";

const HomeScreen = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://192.168.100.216:3000/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderDoctor = ({ item }) => {
    return <DoctorItem doctor={item} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Doctors</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={doctors}
          renderItem={renderDoctor}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 40,
  },
  listContainer: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listContent: {
    flexGrow: 1,
  },
});

export default HomeScreen;
