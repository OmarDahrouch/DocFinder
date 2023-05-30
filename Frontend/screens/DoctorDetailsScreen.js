import React from "react";
import { Avatar, Button } from "react-native-elements";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Divider } from "@react-native-material/core";

const DoctorDetailsScreen = ({ route, navigation }) => {
  const iddoctor = route.params.IdDoctor;
  const firstName = route.params.first_name;
  const lastName = route.params.last_name;
  const location = route.params.location;
  const specialization = route.params.specialization;

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={require("../assets/images/images.png")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          Dr. {firstName} {lastName}
        </Text>
        <Text style={styles.label}>{specialization}</Text>

        <Button
          title="Book an appointment"
          onPress={() => {
            navigation.navigate("BookingScreen", {
              iddoctor,
              firstName,
              lastName,
              location,
              specialization,
            });
          }}
          titleStyle={{ fontWeight: "500", fontSize: 16 }}
          buttonStyle={{
            backgroundColor: "rgba(90, 154, 230, 1)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 250,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
        />
      </View>

      <Divider />
      {/* <View style={styles.adress}>
        <Text style={styles.label}>Adress</Text>
        <Text style={styles.label}>nom du cabinet </Text>
        <Text style={styles.label}>City :{route.params.location}</Text>
      </View> */}
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  profile: {
    alignItems: "center",
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
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 40,
    marginRight: 16,
  },
  adress: {
    backgroundColor: "green",
  },
});

export default DoctorDetailsScreen;
