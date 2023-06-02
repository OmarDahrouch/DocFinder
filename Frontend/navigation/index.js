import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorSignInScreen from "../screens/DoctorsScreen/DoctorSignInScreen";
import SignInScreen from "../screens/SignInScreen";
import PatientAccount from "../screens/PatientAccount";
import SingnupScreen from "../screens/SignupScreen";
import DoctorAccount from "../screens/DoctorsScreen/DoctorAccount";
import DoctorSignUpScreen from "../screens/DoctorsScreen/DoctorSignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import BarSearch from "../screens/SearchScreen";
import DoctorDetailsScreen from "../screens/DoctorDetailsScreen";
import BookingScreen from "../screens/BookingScreen";
import AppointmentsScreen from "../screens/AppointmentsScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: "#00a79d",
              height: 50,

              headerTitleStyle: {
                fontWeight: "bold",
                color: "white",
              },
            },
          }}
        />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="DoctorSignIn" component={DoctorSignInScreen} />
        <Stack.Screen name="SignUp" component={SingnupScreen} />
        <Stack.Screen name="DoctorSignUp" component={DoctorSignUpScreen} />
        <Stack.Screen name="DoctorAccount" component={DoctorAccount} />
        <Stack.Screen name="PatientAccount" component={PatientAccount} />

        <Stack.Screen name="Recherche" component={BarSearch} />
        <Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="Appointments" component={AppointmentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
