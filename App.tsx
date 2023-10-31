import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  StoryDetail  from './src/screen/StoryDetail';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="StoryDetail" component={StoryDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
