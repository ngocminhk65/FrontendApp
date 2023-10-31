import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Button, Image, StyleSheet } from 'react-native';

class StoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [
        {
          title: 'Truyện Tây Du kí',
          favorite: false,
          summary: 'Tóm tắt nội dung',
          chapters: 'Các chương',
          imageUrl: 'https://www.netabooks.vn/Data/Sites/1/Product/18755/1.jpg',
        },
      ],
      comment: '',
      comments: [],
    };
  }

  render() {
    return (
      <ScrollView>
        {this.state.stories.map((story, index) => (
          <View key={index} style={styles.storyContainer}>
            <Image
              source={{ uri: story.imageUrl }}
              style={styles.storyImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{story.title}</Text>
              <TouchableOpacity onPress={() => this.toggleFavorite(index)}>
                <Text style={[styles.favoriteText, { color: story.favorite ? 'red' : 'black' }]}>
                  Yêu thích
                </Text>
              </TouchableOpacity>
              <Text style={styles.summaryText}>
                {story.summary}
              </Text> 
              <Text style={styles.summarySmallText}>
                Truyện kể về 4 thầy trò Đường Tăng lên đường sang Tây Thiên thỉnh kinh
              </Text>
              <Text style={styles.chaptersText}>{story.chapters}</Text>
            </View>
          </View>
        ))}

        <TextInput
          placeholder="Nhập bình luận"
          onChangeText={(text) => this.setState({ comment: text })}
          value={this.state.comment}
          style={styles.commentInput}
        />
        <Button title="Gửi bình luận" onPress={() => this.addComment()} style={styles.commentButton} />

        {this.state.comments.map((comment, index) => (
          <View key={index} style={styles.commentContainer}>
            <Text style={styles.commentText}>{comment}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }

  toggleFavorite(index) {
    const stories = [...this.state.stories];
    stories[index].favorite = !stories[index].favorite;
    this.setState({ stories });
  }

  addComment() {
    const comment = this.state.comment;
    if (comment) {
      const comments = [...this.state.comments, comment];
      this.setState({ comments, comment: '' });
    }
  }
}

const styles = StyleSheet.create({
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
    fontSize: 20,
    color: 'black',
  },
  summarySmallText: {
    fontSize: 16,
    color: 'black',
  },
  chaptersText: {
    fontSize: 18,
    color: 'black',
  },
  favoriteText: {
    fontSize: 18,
  },
  commentInput: {
    fontSize: 16,
    color: 'black',
  },
  commentButton: {
    fontSize: 16,
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentText: {
    fontSize: 18,
    color: 'black',
  },
});

export default StoryDetail;
