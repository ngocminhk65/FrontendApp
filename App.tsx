import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StoryDetail from './src/screen/StoryDetail';
import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SignupScreen';
import HomeScreen from './src/screen/HomeScreen';
import ChapterDetail from './src/screen/ChapterDetail';
import SearchScreen from './src/screen/SearchScreen';
import TabNavigator from './src/screen/TabNavigator';
import {
  ApplicationProvider,
  IconRegistry,
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{
        //   headerShown: false,
        // }}
        >
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />  */}
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
        <Stack.Screen name={'TabNavigator'} component={TabNavigator} />
        <Stack.Screen name="StoryDetail" component={StoryDetail} />
        <Stack.Screen name="ChapterDetail" component={ChapterDetail} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
    // <>
    //   <IconRegistry icons={EvaIconsPack} />
    //   <ApplicationProvider {...eva} theme={eva.light}>
    //     <AppNavigator />
    //   </ApplicationProvider>
    // </>
  );
}

export default App;
