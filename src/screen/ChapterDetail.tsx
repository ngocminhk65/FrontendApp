import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

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

  useEffect(() => {
    //const apiUrl = `http://10.0.0.165:3000/item/chap/${chapId}`;
    const apiUrl = `http://10.0.2.2:3000/item/chap/${chapId}`;
    axios.get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          setImages(response.data.data.listImage);
        } else {
          throw new Error('Network request failed');
        }
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  }, [chapId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: convertLocalhostToIP(item.image_path) }} style={styles.image} />
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
    width: 400,
    height: 400,
    marginBottom: 8,
  },
});

export default ChapterDetail;
