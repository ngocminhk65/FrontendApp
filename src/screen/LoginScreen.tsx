import React, { useContext, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../Route/AuthTab';
import { View, Text, Image, TextInput, TouchableOpacity, Animated, Keyboard, ActivityIndicator, Alert } from 'react-native';
import { API_URL } from '@env';


export default function LoginScreen() {
  const navigation = useNavigation();
  const translateY = useRef(new Animated.Value(30)).current;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // use context in provider , and re set data in value
  const { userData, setUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false); 


  const fadeInUp = (delay) => {
    return Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      delay: delay,
      useNativeDriver: true,
    });
  };

  const animatedStyle = {
    transform: [{ translateY: translateY }],
  };

  const startAnimations = () => {
    Animated.parallel([fadeInUp(0), fadeInUp(200), fadeInUp(400), fadeInUp(600), fadeInUp(800)]).start();
  };

  const navigateToSignup = () => {
    navigation.navigate('SignupScreen');
  };

  const loginUser = async () => {
    console.log('Đang đăng nhập');
    
    try {
      if (!email || !password) {
        console.error('Vui lòng điền đầy đủ thông tin');
        return;
      }
      console.log(API_URL);
      


      setLoading(true); // Start loading
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: email,
        password: password,
      });

      console.log(response.data);

      // Xử lý phản hồi tại đây nếu cần
      if (response.data.status === 401) {
        console.log('Đăng nhập thất bại:', response.data.message);
        Alert.alert('Đăng nhập thất bại', response.data.message);
        setLoading(false);
      } else {
        console.log('Đăng nhập thành công');
        // document day nhe : https://reactnavigation.org/docs/nesting-navigators/#navigating-to-a-screen-in-a-nested-navigator
        // set data in context
        // userData.setUserId(response.data.userId);
        const user = {
          userId: response.data.data.user.id,
          userName: response.data.data.user.username,
          token: response.data.data.jwt,
          isLoggedIn: true,
          email: response.data.data.user.email,
        }
        setUserData(user);

        navigation.navigate('app');

        // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác khi đăng nhập thất bại
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error.message);
      // Xử lý lỗi tại đây nếu cần
    } finally {
      setLoading(false); // Stop loading, whether successful or not
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="light" />
      <Image style={{ position: 'absolute', height: '100%', width: '100%' }} source={require('../assets/background.png')} />
  
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', position: 'absolute' }}>
        <Animated.Image
          source={require('../assets/light.png')}
          style={{ height: 225, width: 90, ...animatedStyle }}
        />
        <Animated.Image
          source={require('../assets/light.png')}
          style={{ height: 160, width: 65, opacity: 0.75, ...animatedStyle }}
        />
      </View>
  
      <View style={{ flex: 1, justifyContent: 'space-around', paddingTop: 40, paddingBottom: 10 }}>
        <View style={{ alignItems: 'center' }}>
          <Animated.View style={{ flexDirection: 'row', alignItems: 'center', ...animatedStyle }}>
            <Image source={require('../assets/logo.png')} style={{ height: 95, width: 95, marginRight: 10 }} />
            {!loading && ( 
               <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 32 }}>Đăng nhập</Text>
            )}
          </Animated.View>
        </View>
  
        {!loading && (
          <View style={{ alignItems: 'center', marginHorizontal: 5, marginVertical: 10 }}>
            <Animated.View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 15, borderRadius: 20, width: '100%', ...animatedStyle }}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={'white'}
                onChangeText={(text) => setEmail(text)}
              />
            </Animated.View>
  
            <Animated.View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 15, borderRadius: 20, width: '100%', marginBottom: 10, ...animatedStyle }}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={'white'}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
              />
            </Animated.View>
  
            <Animated.View style={{ width: '100%', ...animatedStyle }}>
              <TouchableOpacity onPress={loginUser} style={{ backgroundColor: '#00BFFF', padding: 15, borderRadius: 20, marginBottom: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}> OK </Text>
              </TouchableOpacity>
            </Animated.View>
  
            <Animated.View style={{ flexDirection: 'row', justifyContent: 'center', ...animatedStyle }}>
              <Text>Bạn chưa có tài khoản ? </Text>
              <TouchableOpacity onPress={navigateToSignup}>
                <Text style={{ color: '#00BFFF' }}> Đăng kí </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
  
        {loading && (
          <View style={{ marginTop: -300 }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
      </View>
    </View>
  );
}