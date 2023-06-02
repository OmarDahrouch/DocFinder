import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";

const AppointmentsItem = ({ appointments, navigation }) => {
  const dateString = appointments.appointment_date;
  const date = new Date(dateString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("press");
      }}
    >
      <View style={styles.container}>
        <View style={styles.container1}>
          <Text style={styles.name}>
            Dr. {appointments.doctor_id.first_name}{" "}
            {appointments.doctor_id.last_name}
          </Text>
          <Text style={styles.specialization}>
            {appointments.doctor_id.specialization}
          </Text>
        </View>

        <View style={styles.container2}>
          <View style={styles.container3}>
            <Icon name="event" size={20} color="#00a79d" />
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
          <View style={styles.container3}>
            <Icon name="schedule" size={20} color="#00a79d" />
            <Text style={styles.date}> {appointments.appointment_time}</Text>
          </View>
          <View style={styles.container3}>
            <Icon name="pending" size={20} color="#00a79d" />
            <Text style={styles.date}> {appointments.status} </Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonContainer1}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer2}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    padding: 20,
  },
  container1: {
    marginBottom: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: "500",
  },
  specialization: {
    fontSize: 15,
    fontWeight: "300",
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container3: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer1: {
    backgroundColor: "#bababa",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  buttonContainer2: {
    backgroundColor: "#00a79d",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
});

export default AppointmentsItem;
