import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.container1}>
          <View style={styles.LogoButton}>
            <Image
              source={require("../assets/images/LogoWhite.png")}
              style={styles.LogoWhite}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.headerText}>Se Connecter</Text>
            </TouchableOpacity>
          </View>
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
        <View style={styles.container2}>
          <Button
            onPress={() => {
              navigation.navigate("DoctorSignIn");
            }}
            title="Vous êtes un docteur ?"
            buttonStyle={{
              backgroundColor: "#00a79d",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              width: 210,
              marginTop: 20,
              marginLeft: "23%",
              marginBottom: 50,
            }}
            titleStyle={{
              color: "white",
              fontWeight: "bold",
              fontSize: 14,
              marginLeft: 10,
            }}
          />
          <Text style={styles.title2}>DocFinder : </Text>
          <Image
            source={require("../assets/images/AppSecurity.png")}
            style={styles.Vectors}
          />
          <Text style={styles.description}>
            DocFinder accorde la priorité à la sécurité des utilisateurs grâce à
            des pratiques de codage sécurisées.
          </Text>
          <Image
            source={require("../assets/images/TechSante.png")}
            style={styles.Vectors}
          />
          <Text style={styles.description}>
            Une vaste base de données de médecins qualifiés pour répondre à tous
            les besoins de santé.
          </Text>
          <Image
            source={require("../assets/images/AppSecurity.png")}
            style={styles.Vectors}
          />
          <Text style={styles.description}>
            DocFinder accorde la priorité à la sécurité des utilisateurs grâce à
            des pratiques de codage sécurisées
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "auto",
  },
  container1: {
    flex: 1,
    backgroundColor: "#00a79d",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    padding: 60,
  },
  container2: {
    flex: 3,
    backgroundColor: "#EFEFEF",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
  title2: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: "auto",
    marginRight: "auto",
  },
  description: {
    marginLeft: "12%",
    marginRight: "12%",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  LogoButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "-20%",
    marginBottom: "-15%",
  },
  LogoWhite: {
    width: 150,
    height: 100,
    marginLeft: "auto",
    marginRight: 120,
  },
  headerText: {
    color: "white",
    marginLeft: "auto",
    marginRight: -37,
    fontWeight: "bold",
  },
  Vectors: {
    width: "40%",
    height: "40%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
export default HomeScreen;
