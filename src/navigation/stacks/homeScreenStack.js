import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../../screens/profileScreens/homeScreen';
import FinancialScreen from "../../screens/managementScreens/financialScreen";
import FinancialScreen2 from '../../screens/managementScreens/financialScreen2';

const Stack = createNativeStackNavigator();

export default function HomeScreenStack () {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="FinancialScreen" component={FinancialScreen} />
      <Stack.Screen name="FinancialScreen2" component={FinancialScreen2} />
      
  </Stack.Navigator>
  );
};
