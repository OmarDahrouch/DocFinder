import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../../components/Logo";

const DoctorAccount = ({ navigation }) => {
  const [doctor, setDoctor] = useState(null);
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [doctorAdress, setDoctorAdress] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorCity, setDoctorCity] = useState("");
  const [doctorZip, setDoctorZip] = useState("");
  const [doctorDescription, setDoctorDescription] = useState("");
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
          "http://172.20.10.2:3000/doctor/account",
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
        setDoctorAdress(fetchedDoctor.adress);
        setDoctorEmail(fetchedDoctor.email);
        setDoctorCity(fetchedDoctor.city);
        setDoctorZip(fetchedDoctor.zip);
        setDoctorPhoneNumber(fetchedDoctor.phone_number);
        setDoctorSpecialization(fetchedDoctor.specialization);
        setDoctorDescription(fetchedDoctor.description);
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
        adress: doctorAdress,
        phone_number: doctorPhoneNumber,
        email: doctorEmail,
        city: doctorCity,
        zip: doctorZip,
        specialization: doctorSpecialization,
        description: doctorDescription,
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Logo style={styles.logo} />
        <Text style={styles.label}>First name</Text>
        <View style={styles.infoContainer}>
          <CustomInput
            value={doctorFirstName}
            onChangeText={setDoctorFirstName}
          />
        </View>
        <Text style={styles.label}>Last name </Text>
        <View style={styles.infoContainer}>
          <CustomInput
            value={doctorLastName}
            onChangeText={setDoctorLastName}
          />
        </View>
        <Text style={styles.label}>Address</Text>
        <View style={styles.infoContainer}>
          <CustomInput value={doctorAdress} onChangeText={setDoctorAdress} />
        </View>
        <Text style={styles.label}>Email</Text>
        <View style={styles.infoContainer}>
          <CustomInput value={doctorEmail} onChangeText={setDoctorEmail} />
        </View>
        <Text style={styles.label}>City</Text>
        <View style={styles.infoContainer}>
          <CustomInput value={doctorCity} onChangeText={setDoctorCity} />
        </View>
        <Text style={styles.label}>Zip code</Text>
        <View style={styles.infoContainer}>
          <CustomInput value={doctorZip} onChangeText={setDoctorZip} />
        </View>
        <Text style={styles.label}>Phone number</Text>
        <View style={styles.infoContainer}>
          <CustomInput
            value={doctorPhoneNumber}
            onChangeText={setDoctorPhoneNumber}
          />
        </View>
        <Text style={styles.label}>Specialization</Text>
        <View style={styles.infoContainer}>
          <CustomInput
            value={doctorSpecialization}
            onChangeText={setDoctorSpecialization}
            style={styles.input}
          />
        </View>
        <Text style={styles.label}>Description</Text>
        <View style={styles.infoContainer}>
          <CustomInput
            value={doctorDescription}
            onChangeText={setDoctorDescription}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={handleUpdate}
            text="Update"
            type="PRIMARY"
            bgColor="#00a79d"
            fgColor="white"
          />
          <CustomButton
            onPress={handleSignOut}
            text="Sign Out"
            type="PRIMARY"
            bgColor="#FF7C6F"
            fgColor="white"
          />
        </View>
      </View>
    </ScrollView>
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
    marginTop: -80,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 14,
    alignItems: "center",
  },
  label: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 4,
    marginBottom: 20,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

export default DoctorAccount;
