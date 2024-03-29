import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const SlideShow = ({ recommendedBooks }) => {
  const navigation = useNavigation();
  return (
    <Swiper autoplay autoplayTimeout={5} style={styles.wrapper} showsButtons={true}>
      {
        recommendedBooks.map((book, index) => (
          <View key={index} style={styles.slide}>
            <TouchableOpacity style={styles.storyItem}
              onPress={()=>{navigation.navigate('StoryDetail', { bookId: book.id })}}>
              <Image source={{uri: book.image}} style={styles.image} />
              <Text style={styles.title}>{book.title}</Text>
              {/* <Text style={styles.author}>{book.author}</Text> */}
            </TouchableOpacity>
          </View>
        ))
      }
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 300,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black'
  },
  author: {
    fontSize: 14,
    color: 'gray',
  },
  storyItem: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
  },
});

export default SlideShow;
