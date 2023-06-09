import React from "react";
import { TextInput, StyleSheet } from "react-native";

const CustomInput = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="gray"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 45,
    fontSize: 17,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    padding: 10,
  },
});

export default CustomInput;
