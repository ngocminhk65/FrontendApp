import React, { Component } from 'react';
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
import { Navigation } from 'react-native-navigation';
// import axios from 'axios';
// import { err } from 'react-native-svg/lib/typescript/xml';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [
                {
                    id: 1,
                    title: 'Truyện 1',
                    author: 'Tác giả 1',
                    image: require('./assets/1.png'),
                },
                {
                    id: 2,
                    title: 'Truyện 2',
                    author: 'Tác giả 2',
                    image: require('./assets/2.png'),
                },
                {
                    id: 3,
                    title: 'Truyện 3',
                    author: 'Tác giả 3',
                    image: require('./assets/3.png'),
                },
                {
                    id: 4,
                    title: 'Truyện 4',
                    author: 'Tác giả 4',
                    image: require('./assets/4.png'),
                },
                {
                    id: 5,
                    title: 'Truyện 5',
                    author: 'Tác giả 5',
                    image: require('./assets/5.png'),
                },
                {
                    id: 6,
                    title: 'Truyện 6',
                    author: 'Tác giả 6',
                    image: require('./assets/6.png'),
                },
                {
                    id: 7,
                    title: 'Truyện 7',
                    author: 'Tác giả 7',
                    image: require('./assets/7.png'),
                }, {
                    id: 8,
                    title: 'Truyện 8',
                    author: 'Tác giả 8',
                    image: require('./assets/8.png'),
                }, {
                    id: 9,
                    title: 'Truyện 9',
                    author: 'Tác giả 9',
                    image: require('./assets/9.png'),
                },
                // Thêm các mục khác theo cùng mẫu
            ]
        };
    }

    render() {
        return (
            <>
                <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ScrollView>
                        <View style={styles.container}>
                            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-end', }}>
                                <Image source={require('./assets/logo.png')} style={styles.logo} />
                                <SearchIcon />
                                <GridIcon />
                                {/* <AvatarImage /> */}
                                {/* <UserProfile /> */}
                            </View>
                            <View style={{ flex: 2, }} >
                                <Text style={styles.pageTitle}>Truyện Đề Xuất</Text>
                                <SlideShow recommendedBooks={this.state.stories} />
                            </View>
                            <View style={{ flex: 3, }}>
                                <Text style={styles.pageTitle}>Truyện Mới</Text>
                                <FlatList
                                    scrollEnabled={false}
                                    data={this.state.stories}
                                    renderItem={renderStoryItem}
                                    keyExtractor={item => item.id.toString()}
                                    numColumns={2}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </Layout>
                <BottomTabs />
            </>
        )
    }
}

const renderStoryItem = ({ item }) => {
    return (
        <TouchableOpacity
            style={styles.storyItem}
            onClick={() => {}}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            {/* <Text style={styles.author}>{item.author}</Text> */}
        </TouchableOpacity>
    );
};


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
    },
    author: {
        fontSize: 14,
        color: 'gray',
    },
    logo :{
        width:50,
        height:50,
        top:-20,
        left:0,
        resizeMode:'cover',
        position:'absolute'
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

