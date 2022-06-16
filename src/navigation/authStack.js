import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/onboardingScreen';
import LogInScreen from '../screens/authScreens/logInScreen';
import RegisterScreen from '../screens/authScreens/registerScreen';
import PassRecoverScreen from '../screens/authScreens/passRecoverScreen';
import CodeSubmitScreen from '../screens/authScreens/codeSubmitScreen';
import PassSubmitScreen from '../screens/authScreens/passSubmitScreen';
import RegiCodeSubmitScreen from '../screens/authScreens/regiCodeSubmitScreen';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LogInScreen} />
      <Stack.Screen name="PassRecover" component={PassRecoverScreen} />
      <Stack.Screen name="CodeSubmit" component={CodeSubmitScreen} />
      <Stack.Screen name="PassSubmit" component={PassSubmitScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RegiCodeSubmit" component={RegiCodeSubmitScreen} />
  </Stack.Navigator>
  );
};

export default AuthStack;