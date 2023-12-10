import React, { useState, useEffect, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { API_URL } from '@env';
// import { AuthContext } from '../../Route/AuthTab';
import { Icon } from '@ui-kitten/components';

// const { userData, setUserData } = useContext(AuthContext);

const permission = (chap) => {
  const price = chap.price
  if (chap.canRead) {

  } else {
    // if (userData.price >= price) {

    // } else {
    //   console.log("Khong du xu de mo khoa chapter.")
    // }
  }

}

const ChapterInfo = (props) => {
  const chap = props.chap;
  const index = props.index;
  return (

    <TouchableOpacity
      // key={index}
      style={{flex:'1',}}
      onPress={() => permission(chap)}>
      {/* <View style={styles.chapterContainer}> */}
      <View style={styles.chapter}>
        <Text style={styles.chapterText}>{chap.name}</Text>
        {!chap.canRead ?
          <>
            {/* <Icon name='lock-outline'></Icon> */}
            <Text>Lock</Text>
          </> :
          <>
            <Text>Unlock</Text>
          </>
        }
      </View>
    </TouchableOpacity>
  );

}

const styles = StyleSheet.create({

  icon: {
    width: 32,
    height: 32,
  },

  chapter: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    maxWidth:'100%',
  },

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


export default ChapterInfo;