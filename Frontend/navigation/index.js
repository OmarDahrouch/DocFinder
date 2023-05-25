import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../screens/SignInScreen";
import PatientAccount from "../screens/PatientAccount";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="PatientAccount" component={PatientAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
