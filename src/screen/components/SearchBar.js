import { Icon } from '@ui-kitten/components';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const SearchIcon = () => {
  return (
    <TouchableOpacity onClick={() => { }}>
      <Icon style={styles.icon} name='search-outline' />
    </TouchableOpacity>

  )
}
const GridIcon = (): React.ReactElement => {
  return (
    <TouchableOpacity onClick={() => { }}>
      <Icon style={styles.icon} name='grid-outline' />
    </TouchableOpacity>
  )
}

const SearchBar = (): React.ReactElement => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Xử lý tìm kiếm dựa trên searchText
    console.log('Đã tìm kiếm:', searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm truyện..."
        onChangeText={setSearchText}
        value={searchText}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    padding: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 8,
  },
  icon: {
    width: 32,
    height: 32,
  },
});


export { SearchBar, SearchIcon, GridIcon };
