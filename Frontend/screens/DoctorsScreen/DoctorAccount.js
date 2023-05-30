import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../../components/Logo";

const DoctorAccount = ({ navigation }) => {
  const [doctor, setDoctor] = useState(null);
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [doctorLocation, setLocation] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPhoneNumber, setDoctorPhoneNumber] = useState("");
  const [doctorSpecialization, setDoctorSpecialization] = useState("");
  const [doctorProfilePicture, setDoctorProfilePicture] = useState("");

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          // Token not found, handle the error or redirect to sign-in
          console.log("Token not found");
          return;
        }

        const response = await axios.get(
          "http://192.168.100.7:3000/doctor/account",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const fetchedDoctor = response.data.doctor;
        setDoctor(fetchedDoctor);
        setDoctorFirstName(fetchedDoctor.first_name);
        setDoctorLastName(fetchedDoctor.last_name);
        setLocation(fetchedDoctor.location);
        setDoctorEmail(fetchedDoctor.email);
        setDoctorPhoneNumber(fetchedDoctor.phone_number);
        setDoctorSpecialization(fetchedDoctor.specialization);
        setDoctorProfilePicture(fetchedDoctor.profile_picture);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctorInfo();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        // Token not found, handle the error or redirect to sign-in
        console.log("Token not found");
        return;
      }

      const { _id } = doctor;

      const updatedDoctor = {
        id: _id,
        first_name: doctorFirstName,
        last_name: doctorLastName,
        location: doctorLocation,
        phone_number: doctorPhoneNumber,
        email: doctorEmail,
        specialization: doctorSpecialization,
        profile_picture: doctorProfilePicture,
      };

      const response = await axios.put(
        `http://192.168.100.7:3000/doctor/${_id}`,
        updatedDoctor,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Handle the response as needed
      console.log("Doctor information updated:", response.data);

      // Display success alert
      Alert.alert("Success", "Doctor information updated successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("DoctorSignIn");
    } catch (error) {
      console.error(error);
    }
  };

  if (!doctor) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />
      <View style={styles.infoContainer}>
        <Text style={styles.label}>First Name:</Text>
        <CustomInput
          value={doctorFirstName}
          onChangeText={setDoctorFirstName}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Last Name:</Text>
        <CustomInput value={doctorLastName} onChangeText={setDoctorLastName} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Location:</Text>
        <CustomInput value={doctorLocation} onChangeText={setLocation} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <CustomInput value={doctorEmail} onChangeText={setDoctorEmail} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phone Number:</Text>
        <CustomInput
          value={doctorPhoneNumber}
          onChangeText={setDoctorPhoneNumber}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Specialization:</Text>
        <CustomInput
          value={doctorSpecialization}
          onChangeText={setDoctorSpecialization}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Picture:</Text>
        <CustomInput
          value={doctorProfilePicture}
          onChangeText={setDoctorProfilePicture}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={handleUpdate}
          text="Update"
          type="PRIMARY"
          bgColor="green"
          fgColor="white"
        />
        <CustomButton
          onPress={handleSignOut}
          text="Sign Out"
          type="PRIMARY"
          bgColor="red"
          fgColor="white"
        />
      </View>
    </View>
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
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 14,
    alignItems: "center",
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 8,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 1,
    alignItems: "center",
  },
});

export default DoctorAccount;
