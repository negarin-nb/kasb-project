import React from 'react';
import { View, Text, Modal, StyleSheet } from "react-native";

export default function UploadScreen(progress = 0, visible = true) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text>{progress * 100}% hello</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingEnd: 20,
    paddingStart: 20,
  }
});
