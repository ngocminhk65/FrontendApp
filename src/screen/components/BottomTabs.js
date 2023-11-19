import React from 'react';
import { useNavigation } from '@react-navigation/native';
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

export const BottomTabs= (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigation = useNavigation();

  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <BottomNavigationTab
        icon={Home}
        title='Trang chủ'
        onClick={()=>{}}
      />
      <BottomNavigationTab
        icon={Mission}
        title='Nhiệm vụ'
        onPress={()=>{
          navigation.navigate('Mission');
        }}
      />
      <BottomNavigationTab
        icon={PersonIcon}
        title='Tài khoản'
        onClick={()=>{}}
      />
    </BottomNavigation>
  );
  };