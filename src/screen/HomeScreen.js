import React, {  useEffect,useState } from 'react';
import {
    View, Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation,
    SectionList,
} from 'react-native';
import { SearchBar, SearchIcon, GridIcon } from './components/SearchBar'; // Thêm import SearchBar
import { UserProfile, AvatarImage } from './components/UserProfile'; // Thêm import UserProfile
import SlideShow from './components/SlideShow';
import { BottomTabs } from './components/BottomTabs';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const  HomeScreen = () => {

const [stories, setStories] = useState([]);
const navigation = useNavigation();

    useEffect(() => {
        const url  = 'http://10.0.2.2:3000/item/'
        // const url  = 'http://10.0.0.165:3000/item/'
        axios.get(url)
            .then((response) => {
                if (response.status === 200) {
                    const { data } = response.data;
                   setStories(data);
                } else {
                    throw new Error('Network request failed!');
                }
            })
            .catch((error) => {
                console.error('Failure:', error);
            });
    },[]);

    const renderStoryItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.storyItem}
                onPress={()=>{navigation.navigate('StoryDetail', { bookId: item.id })}}>
                <Image source={{uri: item.image}} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                {/* <Text style={styles.author}>{item.author}</Text> */}
            </TouchableOpacity>
        );
    };

        return (
            <>
                <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ScrollView>
                        <View style={styles.container}>
                            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-end', }}>
                                <Image source={require('../assets/logo.png')} style={styles.logo} />
                                <SearchIcon 
                                dataFromHomeScreen={stories} />
                                <GridIcon />
                            </View>
                            <View style={{ flex: 2, }} >
                                <Text style={styles.pageTitle}>Truyện Đề Xuất</Text>
                                <SlideShow recommendedBooks={stories}  />
                            </View>
                            <View style={{ flex: 3, }}>
                                <Text style={styles.pageTitle}>Truyện Mới</Text>
                                <FlatList
                                    scrollEnabled={false}
                                    data={stories}
                                    renderItem={renderStoryItem}
                                    keyExtractor={item => item.id.toString()}
                                    numColumns={2}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </Layout>
                {/* <BottomTabs /> */}
            </>
        )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color:"black"
    },
    storyItem: {
        flex: 1,
        margin: 8,
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color:"black"
    },
    author: {
        fontSize: 14,
        color: 'gray',
    },
    logo: {
        width: 50,
        height: 50,
        top: -20,
        left: 0,
        resizeMode: 'cover',
        position: 'absolute'
    }
});

export default () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
            <HomeScreen />
        </ApplicationProvider>
    </>
);

