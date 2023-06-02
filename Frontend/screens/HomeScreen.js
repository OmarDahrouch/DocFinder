import React from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const Loginout = async () => {
    try {
      const idPatient = await AsyncStorage.getItem("patientId");

      if (!idPatient) {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.headerText}>Se Connecter</Text>
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity
          onPress={() => {
            console.log("logout");
          }}
        >
          <Text style={styles.headerText}>Se déconnecter</Text>
        </TouchableOpacity>
      );
    } catch (error) {}
  };

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
              paddingHorizontal: 10,
              marginBottom: 50,
            }}
            titleStyle={{
              color: "white",
              fontWeight: "bold",
              fontSize: 14,
            }}
          />
          <Text style={styles.title2}>DocFinder : </Text>
          <Text style={styles.title2}>au service de votre santé </Text>
          <Image
            source={require("../assets/images/doc.png")}
            style={styles.Vectors}
          />
          <Text style={styles.description}>
            Accédez rapidement aux disponibilités de tous vos médecins
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
            des pratiques de codage sécurisées.
          </Text>
        </View>
      </View>
    </ScrollView>
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    // justifyContent: "flex-start",
  },
  container2: {
    flex: 3,
    padding: 20,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
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
  },
  LogoButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  LogoWhite: {
    width: 140,
    height: 100,
  },
  description: {
    marginBottom: 20,
    textAlign: "center",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
  },
  Vectors: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});
export default HomeScreen;
