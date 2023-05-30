import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./navigation";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignupScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import BarSearch from "./screens/SearchScreen";
import DoctorDetailsScreen from "./screens/DoctorDetailsScreen";
import BookingScreen from "./screens/BookingScreen";
import AppointmentsScreen from "./screens/AppointmentsScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "DocFinder",
            headerStyle: {
              backgroundColor: "#00a79d",
              headerTitleStyle: {
                fontWeight: "bold",
                color: "white",
              },
            },
          }}
        />
        <Stack.Screen name="Recherche" component={BarSearch} />
        <Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="Appointments" component={AppointmentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
