import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Divider } from "@react-native-material/core";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const BookingScreen = ({ navigation }) => {
  const route = useRoute();

  const IdDoctorB = route.params?.iddoctor;
  const firstname = route.params?.firstName;
  const lastname = route.params?.lastName;
  const adress = route.params?.adress;
  const specialization = route.params?.specialization;

  const currentDate = new Date();
  // const token = AsyncStorage.getItem("token");
  // console.log(token);
  const formattedDate = currentDate.toDateString();
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  console.log(selectedDate);

  useEffect(() => {
    fetchAvailableSlots(selectedDate, IdDoctorB);
  }, []);

  const handleConfirm = (date) => {
    setSelectedDate(date);
    console.warn("A date has been picked: ", date.toISOString().split("T")[0]);
    fetchAvailableSlots(date, IdDoctorB);

    hideDatePicker();
  };

  const fetchAvailableSlots = async (selectedDate, IdDoctorB) => {
    try {
      // Make API request to fetch available time slots for selectedDate
      const response = await axios.get(
        `http://192.168.2.102:3000/appointment/data?day=${
          selectedDate.toISOString().split("T")[0]
        }&idDoctor=${IdDoctorB}`
      );
      const data = response.data;
      setTimeSlots(data);
    } catch (error) {
      console.error("Failed to fetch available slots:", error);
    }
  };

  const bookAppoin = async () => {
    try {
      const patientId = await AsyncStorage.getItem("patientId");
      if (!patientId) {
        // Handle the case when patient ID is not found
        Alert.alert("Error", "Patient ID not found. Please sign in again.");
        return;
      }

      const response = await axios.post(
        "http://192.168.2.102:3000/appointments",
        {
          doctor_id: IdDoctorB,
          patient_id: patientId,
          appointment_date: selectedDate.toISOString().split("T")[0],
          appointment_time: selectedTime,
          status: "non-confirmer",
        }
      );
      console.log(response.data);

      Alert.alert("Success", "Book appointment successful");
      navigation.navigate("Appointments");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to book appointment. Please try again.");
    }
  };

  const TimeAlert = () => Alert.alert("Error", "Please select a time slot");

  const renderTimeSlots = () => {
    return timeSlots.map((slot, index) => (
      <View key={index} style={styles.timeSlotCard}>
        <TouchableOpacity
          activeOpacity={0.1}
          onPress={() => {
            setSelectedTime(slot);
            console.log(slot);
          }}
          style={[
            styles.timeSlotButton,
            { backgroundColor: selectedTime === slot ? "#00a79d" : "#ECECEC" },
          ]}
        >
          <Text style={styles.timeSlotText}>{slot}</Text>
        </TouchableOpacity>
      </View>
    ));
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/images/images.png")}
          style={styles.profileImage}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>
            Dr.{firstname} {lastname}
          </Text>
          <Text>{specialization}</Text>
          <Text>{adress}</Text>
        </View>
      </View>
      <Divider />
      <View style={styles.dayTime}>
        <Text style={styles.Text}>Pick a day</Text>
        <View style={styles.day}>
          <Button
            onPress={showDatePicker}
            type="clear"
            icon={<Icon name="calendar" size={20} color="#00a79d" />}
          />
          <Text style={styles.dayText}>
            {selectedDate ? formatDate(selectedDate) : formatDate(currentDate)}
          </Text>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date(formattedDate)}
        />
        <Divider />
        <Text style={styles.Text}>Pick a time</Text>
        <View style={styles.containerTimeSlotes}>{renderTimeSlots()}</View>
      </View>
      <Divider />
      <View style={styles.containerStyle}>
        <Button
          title="Confirmer"
          onPress={selectedTime === null ? TimeAlert : bookAppoin}
          buttonStyle={{ backgroundColor: "#00a79d", borderRadius: 20 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  containerTimeSlotes: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",

    // backgroundColor: "green",
  },
  Text: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },

  timeSlotCard: {
    backgroundColor: "#ECECEC",
    borderRadius: 8,
    padding: 9,
    margin: 10,
    width: 75,
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 12,
    marginLeft: 10,
    padding: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },
  day: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 10,
  },
  dayText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "500",
  },
  dayTime: {
    paddingVertical: 10,
  },
  containerStyle: {
    alignSelf: "center",
    position: "absolute",
    width: "95%",
    bottom: 35,
  },
});
export default BookingScreen;
