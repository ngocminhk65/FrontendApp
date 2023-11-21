import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import { UserProfile } from '../screen/components/UserProfile';
import { ApplicationProvider, BottomNavigation, BottomNavigationTab, IconElement, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import Icon from 'react-native-vector-icons/FontAwesome';

import Mission from '../screen/Mission';


const Tab = createBottomTabNavigator();



 function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
            
          ),
        }}
      />
      <Tab.Screen
        name="Mission"
        component={Mission}
        options={{
          tabBarLabel: 'Mission',
          tabBarIcon: ({ color, size }) => (
            <Icon name="Super" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default () => (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
        <MyTabs />
    </ApplicationProvider>
    </>
);