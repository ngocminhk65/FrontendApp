import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Mission: React.FC = () => {
  const [isAttending, setIsAttending] = useState<boolean>(false);

  const handleAttendanceToggle = () => {
    setIsAttending((prevIsAttending) => !prevIsAttending);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhiệm Vụ Điểm Danh Hàng Ngày</Text>
      <Text>Hoàn thành việc điểm danh hàng ngày bằng cách nhấn vào nút bên dưới:</Text>
      <Button
        title={isAttending ? 'Đánh Dấu Vắng Mặt' : 'Đánh Dấu Có Mặt'}
        onPress={handleAttendanceToggle}
      />
      <Text>{isAttending ? 'Bạn đã điểm danh hôm nay.' : 'Bạn vắng mặt hôm nay.'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Mission;
