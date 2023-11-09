import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  StoryDetail  from './src/screen/StoryDetail';
// import LoginScreen from './src/screen/Login';
// import HomeScreen from './src/screen/ChapterDetail';
import HomeScreen from './src/screen/HomeScreen';
import ChapterDetail from './src/screen/ChapterDetail';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          {/* <Stack.Screen name="StoryDetail" component={StoryDetail} /> */}
        <Stack.Screen name="/HomeScreen" component={HomeScreen} />
        {/* <Stack.Screen name="/login" component={LoginScreen} /> */} 
        <Stack.Screen name="StoryDetail" component={StoryDetail} />
        <Stack.Screen name="ChapterDetail" component={ChapterDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
