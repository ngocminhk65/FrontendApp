import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  StoryDetail  from './src/screen/StoryDetail';
import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SignupScreen';
import HomeScreen from './src/screen/HomeScreen';
import ChapterDetail from './src/screen/ChapterDetail';
import SearchScreen from './src/screen/SearchScreen';
import Mission from './src/screen/Mission'
import { TabProvider } from './src/components/BottomTabContext/BottomTab';
import MyTabs from './src/Route/MyTabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthTab from './src/Route/AuthTab';


const Stack = createStackNavigator();

function App() {
  return (
<GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <AuthTab />
     {/* <MyTabs /> */}
    </NavigationContainer>
    </GestureHandlerRootView>
    
  );
}

export default App;
