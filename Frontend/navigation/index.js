import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import BarSearch from "../screens/SearchScreen";
import DoctorDetailsScreen from "../screens/DoctorsScreen/DoctorDetailsScreen";
import BookingScreen from "../screens/BookingScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignupScreen";
import DoctorSignInScreen from "../screens/DoctorsScreen/DoctorSignInScreen";
import PatientAccount from "../screens/PatientAccount";
import DoctorSignUpScreen from "../screens/DoctorsScreen/DoctorSignUpScreen";
import DoctorAccount from "../screens/DoctorsScreen/DoctorAccount";
import Appointments from "../screens/AppointmentsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Accueil") {
              iconName = "home";
            } else if (route.name === "Recherche") {
              iconName = "search";
            } else if (route.name === "Rendez-vous") {
              iconName = "calendar";
            } else if (route.name === "Compte") {
              iconName = "person";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#00a79d",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Accueil"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Recherche" component={BarSearch} />
        <Tab.Screen
          name="Rendez-vous"
          component={Appointments}
          title="Rendez-vous"
        />
        <Tab.Screen name="Compte" component={AccountStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Recherche" component={BarSearch} />
      <Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="Appointments" component={Appointments} />
    </Stack.Navigator>
  );
};

const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PatientAccount"
        component={PatientAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorSignIn"
        component={DoctorSignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorSignUp"
        component={DoctorSignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="DoctorAccount" component={DoctorAccount} />
    </Stack.Navigator>
  );
};

export default Navigation;
