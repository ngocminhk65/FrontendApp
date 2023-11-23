import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Mission: React.FC = () => {
  const [isClaimed, setIsClaimed] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái khi component được render
    checkClaimStatus();
  }, []);

  const handleClaim = async () => {
    // Kiểm tra xem đã nhận nhiệm vụ chưa và ngày nhận gần nhất
    // const lastClaimDate = await AsyncStorage.getItem('lastClaimDate');
    // const currentDate = new Date().toLocaleDateString();

    // if (!isClaimed && lastClaimDate !== currentDate) {
    //   // Gọi hàm hoặc API để cộng thêm 100 xu cho người dùng (đây chỉ là ví dụ, bạn cần thay thế bằng logic thực tế của bạn)
    //   // addUserCoins(100);

    //   // Lưu lại ngày nhận xu gần nhất
    //   await AsyncStorage.setItem('lastClaimDate', currentDate);

    //   // Đánh dấu nhiệm vụ đã được nhận
    //   setIsClaimed(true);
    //   alert('Bạn đã nhận nhiệm vụ thành công! Bạn đã được thưởng 100 xu.');
    // } else {
    //   alert('Bạn đã nhận nhiệm vụ trong ngày hôm nay hoặc đã nhận trước đó.');
    // }
  };

  const checkClaimStatus = async () => {
    // Kiểm tra trạng thái khi component được render
    // const lastClaimDate = await AsyncStorage.getItem('lastClaimDate');
    const currentDate = new Date().toLocaleDateString();

    // if (lastClaimDate === currentDate) {
    //   setIsClaimed(true);
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/icon2.png')} style={styles.icon} />
        <Text style={styles.title}>Nhiệm vụ</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>1. Điểm danh hàng ngày</Text>
        <TouchableOpacity style={[styles.button, isClaimed && styles.disabledButton]} onPress={handleClaim} disabled={isClaimed}>
          <Text style={[styles.buttonText, isClaimed && styles.disabledButtonText]}>{isClaimed ? 'Đã nhận' : 'Nhận'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 82,
    height: 82,
    marginRight: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
    color: 'black',
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40, // Khoảng cách giữa "Điểm danh hàng ngày" và nút "Nhận"
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
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

export default Mission;
