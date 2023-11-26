
import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon, IconElement } from '@ui-kitten/components';

const PersonIcon = (props): IconElement => (
  <Icon
    {...props}
    name='person-outline'
  />
);

const Mission = (props): IconElement => (
  <Icon
    {...props}
    name='book-outline'
  />
);

const Home = (props): IconElement => (
  <Icon
    {...props}
    name='home-outline'
  />
);

export const BottomTabs = ({ navigation, state }): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <BottomNavigation
      // selectedIndex={selectedIndex}
      // onSelect={index => setSelectedIndex(index)}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab
        icon={Home}
        title='HOME'
        onClick={() => { }}
      />
      <BottomNavigationTab
        icon={Mission}
        title='MISSION'
        onClick={() => { }}
      />
      <BottomNavigationTab
        icon={PersonIcon}
        title='USERS PROFILE'
        onClick={() => { }}
      />
    </BottomNavigation>
  );
};