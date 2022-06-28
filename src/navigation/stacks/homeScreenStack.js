import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../../screens/profileScreens/homeScreen';
import FinancialScreen from "../../screens/managementScreens/financialScreen";
import FinancialScreen2 from '../../screens/managementScreens/financialScreen2';
import TaskScreen from '../../screens/managementScreens/taskScreen';
import CustomerContactScreen from '../../screens/managementScreens/customerContactScreen';
import StorageScreen from '../../screens/managementScreens/storageScreen';


const Stack = createNativeStackNavigator();

export default function HomeScreenStack () {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="FinancialScreen" component={FinancialScreen} />
      <Stack.Screen name="FinancialScreen2" component={FinancialScreen2} />
      <Stack.Screen name="TaskScreen" component={TaskScreen} />
      <Stack.Screen name="CustomerContactScreen" component={CustomerContactScreen} />
      <Stack.Screen name="StorageScreen" component={StorageScreen} />

      
  </Stack.Navigator>
  );
};
