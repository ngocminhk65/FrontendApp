import React, { useContext, useState, useEffect  } from 'react';
import { View, Text, Image, Button, StyleSheet, TextInput, Modal, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';
import { AuthContext } from '../../Route/AuthTab';
import axios from 'axios'; // Import thư viện Axios

const UserProfile = () => {
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [recipientUser, setRecipientUser] = useState('');
  const [userList, setUserList] = useState([]);

  const user = {
    avatar: 'data:image/png;base64,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',
    xu: userData.price,
  };
   
  const handleLogout = () => {
    // Chuyển hướng về màn hình LoginScreen
    // reset lại các state của AuthContext
    setUserData({
      userId: '',
      userName: '',
      token: '',
      isLoggedIn: false,
      email: '',
      price: 0,
      isTranfer: false,
    });
    // navigation.navigate('LoginScreen');
  };

  const handleTransferXu = () => {
    setModalVisible(true);
  };

  const fetchUserList = async () => {
    try {
      // Gọi API để lấy danh sách người dùng
      const response = await axios.get(`${API_URL}/auth/list_user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
      });
      const userListArray = response.data.data || [];
      // Cập nhật state với danh sách người dùng từ API
      setUserList(userListArray);
    } catch (error) {
      console.error('Error fetching user list:', error);
      // Xử lý lỗi nếu cần
    }
  };

  const handleConfirmTransfer = async () => {
    try {
      // Kiểm tra xem recipientUser có trong userList không
      const matchedUser = userList.find(user => user.username === recipientUser);

     if (!matchedUser) {
      Alert.alert(
        'Thông báo',
        'Người dùng không tồn tại.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
      return;
     }

     if(userData.price < 200){
      Alert.alert(
        'Thông báo',
        'Không đủ xu để chuyển.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
      return;
     }

    // Lấy email từ thông tin người dùng
    const recipientEmail = matchedUser.email;

      // Gọi API để chuyển xu 
      const response = await axios.post(
        `${API_URL}/auth/tranfer_price`,
        {
          user: recipientUser,
          price: 200,
          email: recipientEmail,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
  
      console.log('API Response:', response.data);
  
      if (response.data.success) {
        setUserData({
          ...userData,
          price: userData.price - 200,
        }); 
        // Hiển thị thông báo khi chuyển xu thành công
        Alert.alert(
          'Thông báo',
          `Đã chuyển xu thành công đến ${recipientUser}`,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
  
        // Ẩn modal sau khi chuyển xu thành công
        setModalVisible(false);
      } else {
        // Hiển thị thông báo khi có lỗi chuyển xu
        Alert.alert(
          'Thông báo',
          'Có lỗi xảy ra khi chuyển xu. Vui lòng thử lại.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
      }

    } catch (error) {
      console.error('Error transferring xu:', error);
      // Xử lý lỗi nếu cần
    }
  };

  const handleCancelTransfer = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    // Gọi hàm fetchUserList khi component được render
    fetchUserList();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: user.avatar }} />
      <Text style={[styles.text, { fontSize: 18, color: 'black' }]}>
        Username: {userData.userName}
      </Text>
      <Text style={[styles.text, { fontSize: 18, color: 'black' }]}>
        Email: {userData.email}
      </Text>
      <Text style={[styles.text, { fontSize: 18, color: 'black' }]}>
        Xu hiện có: {userData.price}
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Chuyển xu" onPress={handleTransferXu} />
        <View style={{ marginTop: 20 }} />
        <Button title="Đăng xuất" onPress={handleLogout} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nhập tên người bạn muốn chuyển xu</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setRecipientUser(text)}
              value={recipientUser}
            />
            <Text style={styles.additionalText}>Lưu ý: Hạn mức chuyển xu cố định: 200 xu/ 1 người / 1 ngày</Text>
            <TouchableOpacity onPress={handleConfirmTransfer}>
              <Text style={styles.button}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancelTransfer}>
              <Text style={styles.button}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  additionalText: {
    color: 'black',
    fontWeight: 'bold',
  },
  avatar: {
    width: 250,
    height: 250,
    borderRadius: 75,
    marginBottom: 20,
  },
  text: {
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  modalTitle: {
    color: 'black', // Màu chữ là đen
    fontSize: 18,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  button: {
    color: 'blue',
    marginTop: 10,
  },
});

export { UserProfile };
