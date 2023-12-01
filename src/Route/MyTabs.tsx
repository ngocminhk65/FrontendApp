import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import HomeScreen from '../screen/HomeScreen';
import { UserProfile } from '../screen/components/UserProfile';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import Mission from '../screen/Mission';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 36,
    height: 36,
  },
});

const HomeIcon = require('../assets/home.png');
const MissionIcon = require('../assets/book.png');
const UserProfileIcon = require('../assets/user.png');

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={HomeIcon}
              style={[styles.tabBarIcon]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mission"
        component={Mission}
        options={{
          tabBarLabel: 'Nhiệm vụ',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={MissionIcon}
              style={[styles.tabBarIcon]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={UserProfileIcon}
              style={[styles.tabBarIcon]}
            />
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
