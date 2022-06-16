import React from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
} from "react-native";


export default function OnboardingItem({ item }) {

  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width:375 ,height:461 }]}
      />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    //flex: 1,
    marginBottom:10,
    
  },
  title:{
      fontSize:38,
      marginTop:20,
      marginBottom:5,
      textAlign:'center',
      color:'#AEAEB2',
      fontFamily: 'YekanBakhMedium',

  },
  description:{
      fontSize:18,
      paddingHorizontal:64,
      marginBottom:20,
      textAlign:'center',
      color:'#AEAEB2',
      fontFamily: 'YekanBakhMedium',

  }
});
