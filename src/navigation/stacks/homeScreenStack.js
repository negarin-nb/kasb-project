import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../../screens/profileScreens/homeScreen';

import BusinessScreen from "../../screens/managementScreens/businessScreen";
import IncomeScreen from "../../screens/managementScreens/incomeScreen";
import CostScreen from '../../screens/managementScreens/costScreen';
import CashScreen from '../../screens/managementScreens/cashScreen';


import TaskScreen from '../../screens/managementScreens/taskScreen';
import CustomerContactScreen from '../../screens/managementScreens/customerContactScreen';
import StorageScreen from '../../screens/managementScreens/storageScreen';
import StorageSubmitScreen from "../../screens/managementScreens/storageSubmitScreen";
import OrderSubmitScreen from '../../screens/managementScreens/orderSubmitScreen';

import OrderListScreen from '../../screens/managementScreens/orderListScreen';
import OrderDetailScreen from '../../screens/managementScreens/orderDetailScreen';

import InvoiceScreen from '../../screens/managementScreens/invoiceScreen';
import InvoiceCreatScreen from '../../screens/managementScreens/invoiceCreatScreen';
import InvoiceListScreen from "../../screens/managementScreens/invoiceListScreen";
import InvoiceDetailScreen from "../../screens/managementScreens/invoiceDetailScreen";
import EditProfileScreen from '../../screens/profileScreens/editProfileScreen';


const Stack = createNativeStackNavigator();

export default function HomeScreenStack () {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />

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
      <Stack.Screen name="OrderListScreen" component={OrderListScreen} />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />

      <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />
      <Stack.Screen name="InvoiceCreatScreen" component={InvoiceCreatScreen} />
      <Stack.Screen name="InvoiceListScreen" component={InvoiceListScreen} />
      <Stack.Screen
        name="invoiceDetailScreen"
        component={InvoiceDetailScreen}
      />

      <Stack.Screen name="StorageScreen" component={StorageScreen} />
      <Stack.Screen name="StorageSubmitScreen" component={StorageSubmitScreen} />
    </Stack.Navigator>
  );
};
