import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.title}>Trouvez un rendez-vous </Text>
        <Text style={styles.title}>avec </Text>
        <Text style={styles.title}>un médecin </Text>
        <Button
          onPress={() => {
            navigation.navigate("Recherche");
          }}
          icon={<Icon name="search" size={16} color="#00a79d" />}
          iconLeft
          title="Rechercher"
          buttonStyle={{
            backgroundColor: "white",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            width: 200,
            marginTop: 20,
          }}
          titleStyle={{
            color: "#00a79d",
            fontWeight: "bold",
            fontSize: 16,
            marginLeft: 10,
          }}
        />
      </View>
      <View style={styles.container2}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    backgroundColor: "#00a79d",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    padding: 30,
  },
  container2: { flex: 3, backgroundColor: "white" },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "white",
  },
});
export default HomeScreen;
