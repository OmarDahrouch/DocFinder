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

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#00a79d",
              height: 6,
            },
          }}
        />
        <Stack.Screen name="Recherche" component={BarSearch} />
        <Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DoctorSignIn"
          component={DoctorSignInScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DoctorSignUp"
          component={DoctorSignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="PatientAccount" component={PatientAccount} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="DoctorAccount" component={DoctorAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
