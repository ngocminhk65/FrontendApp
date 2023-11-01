import React, { useEffect } from 'react';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';




export const TaskBar = (): React.ReactElement => {
    const navigattion = useNavigation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const homeIcon = (props) => (
    <Icon {...props} name='home' pack='assets'/>
  );

    const navigateTo = (index: number): void => {
        switch (index) {
        case 1:
            navigattion.navigate('/login');
            break;
        default:
            break;
        }
    };
    useEffect(() => {
        setSelectedIndex(0);
    }, []);
    useEffect(() => {
        navigateTo(selectedIndex);
    }, [selectedIndex]);

  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <BottomNavigationTab title='ORDERS' icon={homeIcon} />
      <BottomNavigationTab title='LOGIN' />
      <BottomNavigationTab title='TRANSACTIONS' />
    </BottomNavigation>
  );
};