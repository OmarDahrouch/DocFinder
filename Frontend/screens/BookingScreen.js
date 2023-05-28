import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import { Divider } from "@react-native-material/core";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const BookingScreen = () => {
  const route = useRoute();

  const IdDoctorB = route.params?.iddoctor;
  const firstname = route.params?.firstName;
  const lastname = route.params?.lastName;
  const location = route.params?.location;
  const specialization = route.params?.specialization;

  const currentDate = new Date();

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
    fetchAvailableSlots(selectedDate);
  }, []);

  const handleConfirm = (date) => {
    setSelectedDate(date);
    console.warn("A date has been picked: ", date);
    fetchAvailableSlots(date.toISOString().split("T")[0]);

    hideDatePicker();
  };
  // useEffect(() => {
  //   fetchAvailableSlots(selectedDate);
  // }, []);

  const fetchAvailableSlots = async (selectedDate) => {
    try {
      // Make API request to fetch available time slots for selectedDate
      const response = await axios.get(
        `http://192.168.2.102:3000/appointment/date?day=${selectedDate}`
      );
      const data = response.data;
      setTimeSlots(data);
    } catch (error) {
      console.error("Failed to fetch available slots:", error);
    }
  };

  const renderTimeSlots = () => {
    return timeSlots.map((slot, index) => (
      <View key={index} style={styles.timeSlotCard}>
        <Text style={styles.timeSlotText}>{slot}</Text>
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
          <Text>{location}</Text>
        </View>
      </View>
      <Divider />
      <View style={styles.dayTime}>
        <Text style={styles.Text}>Pick a day</Text>
        <View style={styles.day}>
          <Button
            onPress={showDatePicker}
            type="clear"
            icon={<Icon name="calendar" size={20} color="blue" />}
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

        <Text style={styles.Text}>Pick a time</Text>
        <View style={styles.containerTimeSlotes}>{renderTimeSlots()}</View>
      </View>
      <View style={styles.containerStyle}>
        <Button title="Confirmer" />
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
  },
  dayText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "500",
  },
  dayTime: {
    marginTop: 10,
  },
  containerStyle: {
    alignSelf: "center",
    position: "absolute",
    width: "95%",
    bottom: 35,
  },
});
export default BookingScreen;
