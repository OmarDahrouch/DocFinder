import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";

const BookingScreen = () => {
  const route = useRoute();
  const IdDoctorB = route.params?.iddoctor;
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

  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    console.warn("A date has been picked: ", date);
    fetchAvailableSlots(date.toISOString().split("T")[0]);
    hideDatePicker();
  };

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

  const renderTimeSlot = ({ item }) => (
    <View>
      <TouchableOpacity>
        <Text>{item}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <Text>{IdDoctorB}</Text>
      <Text>booking Screen</Text>
      <Button
        title="Choisissez la date de consultation"
        onPress={showDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date(formattedDate)}
      />
      <Text>{selectedDate ? formatDate(selectedDate) : ""}</Text>
      <Text>Voici les horaires dispo:</Text>
      <FlatList
        data={timeSlots}
        renderItem={renderTimeSlot}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default BookingScreen;
