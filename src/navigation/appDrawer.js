import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { View,Text,Button } from 'react-native';
import HomeScreen from '../screens/profileScreens/homeScreen';
import BottomTabNavigator from './bottomTabNavigator';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const AppDrawer = () => {
return(
<Drawer.Navigator screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Home" component={BottomTabNavigator} />
</Drawer.Navigator>
);

};
export default AppDrawer;