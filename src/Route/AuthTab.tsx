import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screen/LoginScreen";
import SignupScreen from "../screen/SignupScreen";
import MyTabs from "./MyTabs";
import SearchScreen from "../screen/SearchScreen";
import StoryDetail from "../screen/StoryDetail";
import ChapterDetail from "../screen/ChapterDetail";
// import AuthContext from "../context/AuthContext";
import { useState } from "react";
import React from "react";

const Stack = createStackNavigator();
export const AuthContext = React.createContext({});

const AutHStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false, }} /> 
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false, }} /> 
    </Stack.Navigator>
  );
}

export default function AuthTab() {

  const [userData, setUserData] = useState({
    userId: '',
    token: '',
    isLoggedIn: false,
    email: '',
    price: 0,
  });
  const value = { userData, setUserData };
  return (
    <AuthContext.Provider value={{userData,setUserData}}>
    <Stack.Navigator>
      { !userData.isLoggedIn ?
        <>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false, }} /> 
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false, }} /> 
        </>
        :
      <>
      <Stack.Screen name="app" component={MyTabs} options={{ headerShown: false,}} />
      <Stack.Screen name="StoryDetail" component={StoryDetail}/> 
      <Stack.Screen name="ChapterDetail" component={ChapterDetail} /> 
      <Stack.Screen name="SearchScreen" component={SearchScreen}/>
    
      </>
      }
    </Stack.Navigator>
    </AuthContext.Provider>
  );
}
