import React from "react";
import { Avatar, Button } from "react-native-elements";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const DoctorDetailsScreen = ({ route, navigation }) => {
  const iddoctor = route.params.IdDoctor;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{iddoctor}</Text>
      <Text style={styles.label}>
        Dr. {route.params.first_name} {route.params.last_name}
      </Text>

      <Text style={styles.label}>{route.params.specialization}</Text>
      <Text style={styles.label}>{route.params.location}</Text>
      <Button
        title="Book an appointments"
        onPress={() => {
          navigation.navigate("BookingScreen", {
            iddoctor,
          });
        }}
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={{
          backgroundColor: "rgba(90, 154, 230, 1)",
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
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
