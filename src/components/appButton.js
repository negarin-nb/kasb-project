import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";

const AppButton = ({ handleButton, textButton, phone, password }) => {
  return (
    <View>
      <LinearGradient
        colors={["#63D98A", "#24438E"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <TouchableOpacity>
          <Text
            style={styles.buttonText}
            onPress={() => handleButton(phone, password)}
          >
            {textButton}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default AppButton;
