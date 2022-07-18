import React from 'react';
import { View, Text, StatusBar } from "react-native";
import { useFocusEffect } from '@react-navigation/native';


export default function NotificationScreen({navigation}) {
  

  

  return (
    <View>
      <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
      <Text>NotificationScreen</Text>
    </View>
  );
}
