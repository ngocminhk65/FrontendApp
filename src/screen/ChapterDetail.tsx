import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { AuthContext } from '../Route/AuthTab';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'

const convertLocalhostToIP = (url) => {
    if (url.includes('localhost')) {
       url = url.replace('localhost', '10.0.2.2');
       // url = url.replace('localhost', '10.0.0.165');
    }
    return url;
};

const ChapterDetail = ({ route }) => {
  const [images, setImages] = useState([]);
  const { chapId } = route.params;
  const { userData } = useContext(AuthContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userData.token}`
  };
  useEffect(() => {
    // const apiUrl = `http://10.0.0.165:3000/item/chap/${chapId}`;
    setLoading(true);
    console.log(chapId);
    
    const apiUrl = `${API_URL}/item/chap/${chapId}`;
    axios.get(apiUrl, { headers })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.status);
        if(response.data.status === 404){
          console.log(response.data.message);
          Alert.alert(response.data.message);
          navigation.navigate('app');
        }
        if (response.status === 200) {
          setImages(response.data.data.listImage);
        } else {
          throw new Error('Network request failed');
        }
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      }).finally(() => {
        setLoading(false);
      });
  }, [chapId]);

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FastImage source={{ uri: convertLocalhostToIP(item.image_path) }} style={styles.image}  resizeMode={FastImage.resizeMode.contain}/>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 380,
    height: 400,
  },
});

export default ChapterDetail;
