import React from "react";
import { Avatar, Button } from "react-native-elements";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Divider } from "@react-native-material/core";
import { Icon } from "react-native-elements";

const DoctorDetailsScreen = ({ route, navigation }) => {
  const iddoctor = route.params.IdDoctor;
  const firstName = route.params.first_name;
  const lastName = route.params.last_name;
  const city = route.params.city;
  const specialization = route.params.specialization;
  const zip = route.params.zip;
  const adress = route.params.adress;
  const description = route.params.description;

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={require("../../assets/images/images.png")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          Dr. {firstName} {lastName}
        </Text>
        <Text style={styles.label}>{specialization}</Text>

        <Button
          title="Prendre rendez-vous"
          onPress={() => {
            navigation.navigate("BookingScreen", {
              iddoctor,
              firstName,
              lastName,
              adress,
              specialization,
            });
          }}
          titleStyle={{ fontWeight: "500", fontSize: 16 }}
          buttonStyle={{
            backgroundColor: "#00a79d",
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

      <View style={styles.adressCont}>
        <View style={styles.labelCont}>
          <Icon name="place" size={17} />
          <Text style={styles.adressLabel}>Adresse :</Text>
        </View>

        <Text style={styles.adress}>{adress}</Text>
        <Text style={styles.zip}>
          {zip} {city}
        </Text>
      </View>
      <View style={styles.adressCont}>
        <View style={styles.labelCont}>
          <Icon name="person" size={17} />
          <Text style={styles.adressLabel}>Présentation :</Text>
        </View>
        <Text style={styles.descp}>{description}</Text>
      </View>
      <View style={styles.adressCont}>
        <View style={styles.labelCont}>
          <Icon name="payment" size={17} />
          <Text style={styles.adressLabel}>Moyens de paiement :</Text>
        </View>
        <Text style={styles.descp}>Chéques, espèces et carte bancaire</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebeded",
  },
  profile: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
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
  adressLabel: {
    marginLeft: 5,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  adress: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    marginLeft: 5,
  },
  zip: { fontSize: 14, marginBottom: 5, marginLeft: 5 },
  adressCont: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  labelCont: { flexDirection: "row" },
});

export default DoctorDetailsScreen;
