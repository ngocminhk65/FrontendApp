import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { ImageBackground } from 'react-native';
import { Avatar } from '@ui-kitten/components';

const AvatarImage = (): React.ReactElement => (
  <Avatar
    source={require('../assets/avt.png')}
    ImageComponent={ImageBackground}
  />
);

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hồ sơ người dùng</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export { UserProfile, AvatarImage };
