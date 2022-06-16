import { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import slides from "../slides";
import OnboardingItem from "../components/onboardingItem";
import Paginator from "../components/paginator";
import { LinearGradient } from "expo-linear-gradient";
import AppButton from "../components/appButton";


//const STYLES = ["default", "dark-content", "light-content"];

export default OnboardingScreen = ({navigation}) => {
  
  //const [statusBarStyle, setStatusBarStyle] = useState(STYLES[2]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  
  const handleLogin = () => navigation.navigate('Login');
  
  return (

    <View style={styles.container}>
      
      <StatusBar animated={true} barStyle={"light-content"} />
      
      <View style={{ flex: 3 }}>
        
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
        />
      </View>
      
      <Paginator data={slides} scrollX={scrollX} currentIndex={currentIndex} />
      
      <AppButton handleButton={handleLogin} textButton="شروع"/>
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 20,
    height: 50,
    width:250,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontFamily: 'YekanBakhThin',

  },
});
