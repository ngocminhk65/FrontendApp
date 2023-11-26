import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApplicationProvider, IconRegistry, BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { BottomTabs } from './components/BottomTabs';
import HomeScreen from './HomeScreen';
import UserProfile from './UserProfile';

const { Navigator, Screen } = createBottomTabNavigator();

// const HomeScreen = () => (
//     <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text category='h1'>HOME</Text>
//     </Layout>
// );

const MissionScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>MISSION</Text>
    </Layout>
);

const UserProfileScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>USER PROFILE</Text>
    </Layout>
);

// const BottomTabBar = ({ navigation, state }) => (
//     <BottomNavigation
//         selectedIndex={state.index}
//         onSelect={index => navigation.navigate(state.routeNames[index])}>
//         <BottomNavigationTab title='USERS' />
//         <BottomNavigationTab title='ORDERS' />
//     </BottomNavigation>
// );

const TabNavigator = () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
            <Navigator
                tabBar={props => <BottomTabs {...props} />}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Screen name='HomeScreen' component={HomeScreen} />
                <Screen name='Mission' component={MissionScreen} />
                <Screen name='UserProfile' component={UserProfile} />
            </Navigator>
        </ApplicationProvider>
    </>
);

export default TabNavigator;

// export const AppNavigator = () => (
//     // <>
//     //     <IconRegistry icons={EvaIconsPack} />
//     //     <ApplicationProvider {...eva} theme={eva.light}>
//     <NavigationContainer>
//         <TabNavigator />
//     </NavigationContainer>
//     //     </ApplicationProvider>
//     // </>
// );