import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Logo = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require("../assets/images/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default Logo;
