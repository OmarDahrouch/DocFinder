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

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="DoctorSignIn" component={DoctorSignInScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SingnupScreen} />
        <Stack.Screen name="DoctorSignUp" component={DoctorSignUpScreen} />
        <Stack.Screen name="DoctorAccount" component={DoctorAccount} />
        <Stack.Screen name="PatientAccount" component={PatientAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
