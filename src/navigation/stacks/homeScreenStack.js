import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../../screens/profileScreens/homeScreen';
import BusinessScreen from "../../screens/managementScreens/businessScreen";
import CashListScreen from '../../screens/managementScreens/cashListScreen';
import TaskScreen from '../../screens/managementScreens/taskScreen';
import CustomerContactScreen from '../../screens/managementScreens/customerContactScreen';
import StorageScreen from '../../screens/managementScreens/storageScreen';


const Stack = createNativeStackNavigator();

export default function HomeScreenStack () {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BusinessScreen" component={BusinessScreen} />
      <Stack.Screen name="CashListScreen" component={CashListScreen} />
      <Stack.Screen name="TaskScreen" component={TaskScreen} />
      <Stack.Screen name="CustomerContactScreen" component={CustomerContactScreen} />
      <Stack.Screen name="StorageScreen" component={StorageScreen} />

      
  </Stack.Navigator>
  );
};
