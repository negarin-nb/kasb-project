import React from 'react';
import { View, TouchableOpacity, Image } from "react-native";

export default function CloseButton({setModalVisible}) {
  return (
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Image
                style={{ width: 20, height: 20, marginBottom: -5, zIndex:5 }}
                source={require("../../assets/icons/close.png")}
              />
            </TouchableOpacity>
            
  );
}
