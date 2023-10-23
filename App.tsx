import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screen/Login';
import HomeScreen from './src/screen/ChapterDetail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="/home" component={HomeScreen} />
        <Stack.Screen name="/login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

};

export default App;
