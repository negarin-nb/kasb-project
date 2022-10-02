import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../../screens/profileScreens/homeScreen';

import AccountingManageScreen from "../../screens/accountingScreens/accountingManageScreen";
import IncomeScreen from "../../screens/accountingScreens/incomeScreen";
import CostScreen from '../../screens/accountingScreens/costScreen';
import CashScreen from '../../screens/accountingScreens/cashScreen';


import InventoryManageScreen from "../../screens/inventoryScreens/inventoryManageScreen";
import CustomerContactScreen from '../../screens/contactScreens/customerContactScreen';
import StorageScreen from '../../screens/inventoryScreens/storageScreen';
import StorageSubmitScreen from "../../screens/inventoryScreens/storageSubmitScreen";
import OrderSubmitScreen from '../../screens/inventoryScreens/orderSubmitScreen';

import OrderListScreen from '../../screens/inventoryScreens/orderListScreen';
import OrderDetailScreen from '../../screens/inventoryScreens/orderDetailScreen';

import InvoiceScreen from '../../screens/inventoryScreens/invoiceScreen';
import InvoiceCreatScreen from '../../screens/inventoryScreens/invoiceCreatScreen';
import InvoiceListScreen from "../../screens/inventoryScreens/invoiceListScreen";
import InvoiceDetailScreen from "../../screens/inventoryScreens/invoiceDetailScreen";
import EditProfileScreen from '../../screens/profileScreens/editProfileScreen';


const Stack = createNativeStackNavigator();

export default function HomeScreenStack () {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />

      <Stack.Screen name="AccountingManageScreen" component={AccountingManageScreen} />
      <Stack.Screen name="IncomeScreen" component={IncomeScreen} />
      <Stack.Screen name="CostScreen" component={CostScreen} />
      <Stack.Screen name="CashScreen" component={CashScreen} />

      <Stack.Screen name="InventoryManageScreen" component={InventoryManageScreen} />
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
      <Stack.Screen
        name="StorageSubmitScreen"
        component={StorageSubmitScreen}
      />
    </Stack.Navigator>
  );
};
