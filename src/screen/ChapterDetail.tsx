import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {API_URL} from '@env';
import {AuthContext} from '../Route/AuthTab';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';
import {setEnabled} from 'react-native/Libraries/Performance/Systrace';

const convertLocalhostToIP = url => {
  if (url.includes('localhost')) {
    url = url.replace('localhost', '10.0.2.2');
    // url = url.replace('localhost', '10.0.0.165');
  }
  return url;
};

const ChapterDetail = ({route}) => {
  const [images, setImages] = useState([]);
  const chap = route.params.chap;
  const listChap = route.params.listChap;
  const {userData} = useContext(AuthContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userData.token}`,
  };

  const [isPrevious, setIsPrevious] = useState(true);
  const [isNext, setIsNext] = useState(true);
  useEffect(() => {
    let index = listChap.indexOf(chap);
    if (index == 0) {
      setIsPrevious(false);
    } else if (index == listChap.length - 1) {
      setIsNext(false);
    }

    // const apiUrl = `http://10.0.0.165:3000/item/chap/${chapId}`;
    setLoading(true);
    console.log(chap);

    const apiUrl = `${API_URL}/item/chap/${chap.id}`;
    axios
      .get(apiUrl, {headers})
      .then(response => {
        console.log(response.data);
        console.log(response.data.status);
        if (response.data.status === 404) {
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
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [chap.id]);

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      <View>
        <FlatList
          data={images}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            // <FastImage source={{ uri: convertLocalhostToIP(item.image_path) }} style={styles.image}  resizeMode={FastImage.resizeMode.contain}/>

            <View
              style={{borderWidth: 1, flexShrink: 1, height: 500, width: 310}}>
              <ReactNativeZoomableView
                maxZoom={3}
                minZoom={0.5}
                zoomStep={0.5}
                initialZoom={1}
                bindToBorders={true}
                onZoomAfter={this.logOutZoomState}
                contentWidth={300}
                contentHeight={150}>
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                  source={{uri: convertLocalhostToIP(item.image_path)}}
                />
              </ReactNativeZoomableView>
            </View>
          )}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  <TouchableOpacity
    style={[styles.button, !isPrevious && styles.disabledButton, { flex: 1, marginRight: 5, marginLeft: 5 }]}
    onPress={() => {}}
    disabled={!isPrevious}>
    <Text style={[styles.buttonText, !isPrevious && styles.disabledButtonText]}>
      {'Chap trước'}
    </Text>
  </TouchableOpacity>
  <Text style={{ alignSelf: 'center' }}>{chap.name}</Text>
  <TouchableOpacity
    style={[styles.button, !isNext && styles.disabledButton, { flex: 1, marginLeft: 5, marginRight: 5 }]}
    onPress={() => {}}
    disabled={!isNext}>
    <Text style={[styles.buttonText, !isNext && styles.disabledButtonText]}>
      {'Chap sau'}
    </Text>
  </TouchableOpacity>
</View>

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
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginLeft: 65, // Khoảng cách giữa "Điểm danh hàng ngày" và nút "Nhận"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: 'gray', // Màu của nút khi đã nhận nhiệm vụ
  },
  disabledButtonText: {
    color: 'black', // Màu của văn bản khi đã nhận nhiệm vụ
  },
});

export default ChapterDetail;