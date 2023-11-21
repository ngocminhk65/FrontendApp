import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screen/LoginScreen";
import SignupScreen from "../screen/SignupScreen";
import MyTabs from "./MyTabs";
import SearchScreen from "../screen/SearchScreen";

const Stack = createStackNavigator();

export default function AuthTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                    headerShown: false,
                }} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{
                    headerShown: false,
                }} /> 
        <Stack.Screen name="SearchScreen" component={SearchScreen}/>
      <Stack.Screen name="app" component={MyTabs} options={{
                    headerShown: false,
                
      }} />
    </Stack.Navigator>
  );
}
 