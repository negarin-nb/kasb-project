import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../../screens/profileScreens/homeScreen';

import BusinessScreen from "../../screens/managementScreens/businessScreen";
import IncomeScreen from "../../screens/managementScreens/incomeScreen";
import CostScreen from '../../screens/managementScreens/costScreen';
import CashScreen from '../../screens/managementScreens/cashScreen';



import TaskScreen from '../../screens/managementScreens/taskScreen';
import CustomerContactScreen from '../../screens/managementScreens/customerContactScreen';
import StorageScreen from '../../screens/managementScreens/storageScreen';
import OrderSubmitScreen from '../../screens/managementScreens/orderSubmitScreen';



const Stack = createNativeStackNavigator();

export default function HomeScreenStack () {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="BusinessScreen" component={BusinessScreen} />
      <Stack.Screen name="IncomeScreen" component={IncomeScreen} />
      <Stack.Screen name="CostScreen" component={CostScreen} />
      <Stack.Screen name="CashScreen" component={CashScreen} />

      <Stack.Screen name="TaskScreen" component={TaskScreen} />
      <Stack.Screen
        name="CustomerContactScreen"
        component={CustomerContactScreen}
      />
      <Stack.Screen name="OrderSubmitScreen" component={OrderSubmitScreen} />
      <Stack.Screen name="StorageScreen" component={StorageScreen} />
    </Stack.Navigator>
  );
};
