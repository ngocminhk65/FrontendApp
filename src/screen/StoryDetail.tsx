import React, { useState, useEffect, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import { API_URL } from '@env';
import { AuthContext } from '../Route/AuthTab';

const StoryDetail = () => {
  const [stories, setStories] = useState({});
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [listChap, setListChap] = useState([]); 
  const route = useRoute();
  const {bookId} = route.params
  const navigation = useNavigation();
  const { userData } = useContext(AuthContext);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [totalLike, setTotalLike] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const headers = {
    // 'Content-Type': 'application/json',
    'Authorization': `Bearer ${userData.token}`

};

  useEffect(() => {
    fetchDataFromAPI();
    console.log(userData.token);

  }, []); 

  const fetchDataFromAPI = () => {
    const apiUrl = `${API_URL}/item/detail/${bookId}`;
    axios.get(apiUrl,{headers})
      .then((response) => {    
        if (response.status === 401) {
          Alert.alert(response.data.message);
        }
        if (response.status === 200) {
          const detail  = response.data.data.mangaDetail;
          const listChap = response.data.data.listChap;
          setListChap(listChap);
          setStories(detail);
          setTotalLike(detail.total_like);
          setIsFavorite(detail.is_favorite);
        } else {
          throw new Error('Network request failed');
        }
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  }
  const handleFavorite = () => {
    setFavoriteLoading(true);
    if (isFavorite) {
      handleRemoveLike();
    } else {
      handleAddLike();
    }
  }

  const handleAddLike = () => {
    const apiUrl = `${API_URL}/favorites/item/${bookId}`;

    axios.post(apiUrl,null, { headers })
      .then((response) => {
        console.log(response);
        
        if (response.data.status === 401) {
          Alert.alert(response.data.message);
        }
        if (response.data.success == true) {
        setIsFavorite(true);
        setTotalLike(totalLike + 1);
        }
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setFavoriteLoading(false);
      });
  }

  const handleRemoveLike = () => {
    const apiUrl = `${API_URL}/favorites/item/${bookId}`;

    axios.delete(apiUrl, { headers })
      .then((response) => {
        if (response.data.status === 401) {
          console.log(response.data);
          
          Alert.alert(response.data.message);
        }
        if (response.data.success == true) {
          setIsFavorite(false);
          setTotalLike(totalLike - 1);
        }
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setFavoriteLoading(false);
      });
  }

    // const toggleFavorite = (index) => {
    //   const updatedStories = [...stories];
    //   updatedStories[index].favorite = !updatedStories[index].favorite;
    //   setStories(updatedStories);
    // }

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
          <View  style={styles.storyContainer}>
            <Image
              source={{ uri: stories.image_path }}
              style={styles.storyImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{stories.title}</Text>
              <TouchableOpacity onPress={() =>handleFavorite()}>
                <Text style={[styles.favoriteText, { color: isFavorite ? 'red' : 'black', marginBottom: 10 }]}>
                   {favoriteLoading ? "Loading" : "Yêu thích"} ({totalLike})
                </Text>
              </TouchableOpacity>
              <Text style={styles.descriptionTitleText}>Mô tả truyện:</Text>
              <Text style={[styles.summarySmallText, { marginBottom: 10 }]}>
                {stories.description}
              </Text>
              <Text style={styles.summarySmall}>
                Chapter:
              </Text>
              {listChap.map((chap, index) => (
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

        <Text style={styles.commentText}>
          Có tất cả {stories?.total_comment} bình luận
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
