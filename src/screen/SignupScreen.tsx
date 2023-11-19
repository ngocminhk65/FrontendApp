import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Animated, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function SignupScreen() {
  const navigation = useNavigation();
  const translateY = useRef(new Animated.Value(30)).current;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const fadeInUp = (delay) => {
    return Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      delay: delay,
      useNativeDriver: false,
    });
  };

  const animatedStyle = {
    transform: [{ translateY: translateY }],
  };

  const registerUser = async () => {
    try {
      if (!name || !email || !password) {
        console.error('Vui lòng điền đầy đủ thông tin');
        return;
      }

      const response = await axios.post('http://10.0.2.2:3000/auth/register', {
        email: email,
        password: password,
        name: name,
      });

      console.log(response.data);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Lỗi khi đăng ký người dùng:', error.message);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.timing(translateY, {
          toValue: -50,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [translateY]);

  const navigateToLogin = () => {
    navigation.push('LoginScreen');
  };

  useEffect(() => {
    if (registrationSuccess) {
      setTimeout(() => {
        Alert.alert('Thông báo', 'Bạn đã đăng ký tài khoản thành công', [
          { text: 'OK', onPress: () => navigation.push('LoginScreen') },
        ]);
      }, 2000);
    }
  }, [registrationSuccess, navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
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

      <View style={{ flex: 1, justifyContent: 'space-around', paddingTop: 48 }}>
        <View style={{ alignItems: 'center' }}>
          <Animated.View style={{ flexDirection: 'row', alignItems: 'center', ...animatedStyle }}>
            <Image source={require('../assets/logo.png')} style={{ height: 95, width: 95, marginRight: 10 }} />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 32 }}>Đăng kí</Text>
          </Animated.View>
        </View>

        <View style={{ alignItems: 'center', marginHorizontal: 5, marginVertical: 10 }}>
          <Animated.View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 15, borderRadius: 20, width: '100%', ...animatedStyle }}>
            <TextInput
              placeholder="Username"
              placeholderTextColor={'#FFFFFF'}
              onChangeText={(text) => setName(text)}
            />
          </Animated.View>
          <Animated.View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 15, borderRadius: 20, width: '100%', ...animatedStyle }}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={'#FFFFFF'}
              onChangeText={(text) => setEmail(text)}
            />
          </Animated.View>
          <Animated.View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 15, borderRadius: 20, width: '100%', marginBottom: 3, ...animatedStyle }}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'#FFFFFF'}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
          </Animated.View>

          <Animated.View style={{ width: '100%', ...animatedStyle }}>
            <TouchableOpacity style={{ backgroundColor: '#00BFFF', padding: 15, borderRadius: 20, marginBottom: 3 }} onPress={registerUser}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>OK</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ flexDirection: 'row', justifyContent: 'center', ...animatedStyle }}>
            <Text>Bạn đã có tài khoản ? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={{ color: '#00BFFF' }}>Đăng nhập</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
