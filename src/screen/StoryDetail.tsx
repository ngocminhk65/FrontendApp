import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Button, Image, StyleSheet } from 'react-native';
import { API_URL } from '@env';

const StoryDetail = () => {
  const [stories, setStories] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const route = useRoute();
  const {bookId} = route.params
  const navigation = useNavigation();

  useEffect(() => {
    fetchDataFromAPI();
  }, []); 

  const fetchDataFromAPI = () => {
    const apiUrl = `${API_URL}/item/detail/${bookId}`;
    axios.get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          setStories([data]);
        } else {
          throw new Error('Network request failed');
        }
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  }

    const toggleFavorite = (index) => {
      const updatedStories = [...stories];
      updatedStories[index].favorite = !updatedStories[index].favorite;
      setStories(updatedStories);
    }

    const addComment = () => {
      if (comment) {
        const updatedComments = [...comments, comment];
        setComments(updatedComments);
        setComment('');
      }
    }

    const navigateToChapterDetail = (chapId) => {
      navigation.navigate('ChapterDetail', { chapId });
    }

    return (
      <ScrollView style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEventThrottle={16}
        decelerationRate={0.95}
      >
        {stories.map((story, index) => (
          <View key={index} style={styles.storyContainer}>
            <Image
              source={{ uri: story.data.mangaDetail.image }}
              style={styles.storyImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{story.data.mangaDetail.title}</Text>
              <TouchableOpacity onPress={() => toggleFavorite(index)}>
                <Text style={[styles.favoriteText, { color: story.favorite ? 'red' : 'black', marginBottom: 10 }]}>
                   Yêu thích ({story.data.mangaDetail.total_like})
                </Text>
              </TouchableOpacity>
              <Text style={styles.descriptionTitleText}>Mô tả truyện:</Text>
              <Text style={[styles.summarySmallText, { marginBottom: 10 }]}>
                {story.data.mangaDetail.description}
              </Text>
              <Text style={styles.summarySmall}>
                Chapter:
              </Text>
              {story.data.listChap.map((chap, index) => (
                <TouchableOpacity key={index} onPress={() => navigateToChapterDetail(chap.id)}>
                  <View style={styles.chapterContainer}>
                    <Text style={styles.chapterText}>
                      {chap.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <Text style={styles.commentText}>
          Có tất cả {stories[0]?.data.mangaDetail.total_comment} bình luận
        </Text>
        <TextInput
          placeholder="Nhập bình luận"
          onChangeText={(text) => setComment(text)}
          value={comment}
          style={styles.commentInput}
        />
        <Button title="Gửi bình luận" onPress={addComment} style={styles.commentButton} />

        {comments.map((comment, index) => (
          <View key={index} style={styles.commentContainer}>
            <Text style={styles.commentText}>{comment}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  chapterContainer: {
    borderWidth: 1, 
    borderColor: 'black',  
    borderRadius: 5, 
    padding: 10,  
    marginBottom: 10, 
  },
  chapterText: {
    fontSize: 15,
    color: 'black',
  },
  storyContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  storyImage: {
    width: '100%',
    height: 300,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  summaryText: {
    fontSize: 22,
    color: 'black',
  },
  summarySmall: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  summarySmallText: {
    fontSize: 17,
    color: 'black',
  },
  favoriteText: {
    fontSize: 17,
  },
  commentInput: {
    fontSize: 17,
    color: 'black',
  },
  descriptionTitleText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  chapterText: {
    fontSize: 15,
    color: 'black',
  },
  commentText: {
    fontSize: 16,
    color: 'black',
  },
});

export default StoryDetail;
