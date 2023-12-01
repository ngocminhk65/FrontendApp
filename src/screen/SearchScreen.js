import React, { useEffect, useCallback, useState } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableWithoutFeedback, View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Icon, IconElement, ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import { FlatList, ScrollView, TextInput } from 'react-native';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from '../TabNavigator';
import axios from 'axios';
import Fuse from 'fuse.js';
import { AuthContext } from '../Route/AuthTab';
import { useContext } from 'react';


const SearchScreen = (): React.ReactElement => {
    const route = useRoute();
    const navigation = useNavigation();
    const [value, setValue] = useState(null);
    const [stories, setStories] = useState([]);
    const [data, setData] = useState([]);
    const [results, setResults] = useState([])
    const [showResult, setShowResult] = useState(false);
    const [showOption, setShowOption] = useState(false);
    const [showRecommend, setShowRecommend] = useState(true);
    const { userData, setUserData } = useContext(AuthContext);


    useEffect(() => {
        const dataFromHomeScreen = route.params.stories;
        setStories(dataFromHomeScreen);
        // setData(dataFromHomeScreen);
    }, []);

    // useEffect(() => {
    //     const url = 'http://10.0.2.2:3000/item/'
    //     // const url  = 'http://10.0.0.165:3000/item/'
    //     axios.get(url)
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 const { data } = response.data;
    //                 setStories(data);
    //                 // setData(data);
    //             } else {
    //                 throw new Error('Network request failed!');
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Failure:', error);
    //         });
    // }, []);

    const renderStoryItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.storyItem}
                onPress={() => { navigation.navigate('StoryDetail', { bookId: item.id }) }}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                {/* <Text style={styles.author}>{item.author}</Text> */}
            </TouchableOpacity>
        );
    };


    const clearInput = (): void => {
        setValue('');
        // setData([]);
    };

    const renderCloseIcon = (props): React.ReactElement => (
        <TouchableWithoutFeedback onPress={clearInput}>
            <Icon
                {...props}
                name='close'
            />
        </TouchableWithoutFeedback>
    );

    const options = {
        includeScore: true,
        useExtendedSearch: true,
        keys: ['title']
    }


    const searchFilterFunction = (text) => {
        // Check if searched text is not blank

        if (text) {
            // Inserted text is not blank
            // const newData = stories.filter(function (item) {
            //     const itemData = item.title
            //         ? item.title.toUpperCase()
            //         : ''.toUpperCase();
            //     const textData = text.toUpperCase();
            //     return itemData.indexOf(textData) > -1;
            // });
            const fuse = new Fuse(stories, options);
            const newData = fuse.search(text.toUpperCase());
            const result=newData.map(obj => obj.item)
            // console.log(newData);
            // newData=newData[0]
            // setData(newData);
            setData(result);
            setValue(text);
        } else {
            // Inserted text is blank
            setData([]);
            setValue(text);
        }
    };

    const ItemView = ({ item }) => {
        return (
            // Flat List Item
            <Text style={styles.itemStyle} onPress={() => getItem(item)}>
                {item.title.toUpperCase()}
            </Text>
        );
    };

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    const getItem = (item) => {
        // setShowResult(false);s
        setValue(item.title);
        searchFilterFunction(item.title);
    };

    const onFocus = () => {
        setShowOption(true);
    }

    const onSubmit = (text) => {
        setShowOption(false);
        setResults(data);
        setShowResult(true);
        if (results.length != 0) {
            setShowRecommend(false);
        } else {
            setShowRecommend(true);
        }
    };


    return (
        <SafeAreaView>
            {/* <ScrollView> */}
            <View
            // style={styles.container}
            >
                {/* <View style={styles.searchSection}> */}
                <TextInput
                    style={styles.textInputStyle}
                    // style={styles.input}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onFocus={onFocus}
                    onSubmitEditing={(text) => onSubmit(text)}
                    value={value}
                    underlineColorAndroid="transparent"
                    accessoryRight={renderCloseIcon}
                    placeholder="Tìm kiếm truyện ..."
                />
                {/* <Icon padding={10} name='close' size={20} color="#000" /> */}

                {/* </View> */}
                {/* <View style={{ display: (data.length != 0) && (showOption) ? 'flex' : 'none' }} */}
                <FlatList
                    style={{ display: (data.length != 0) && (showOption) ? 'flex' : 'none', maxHeight: '1' }}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
                {/* </View> */}
            </View>
            <View style={styles.container, { display: showResult ? 'flex' : 'none' }}>
                <Text
                    style={styles.pageTitle}>
                    Kết quả tìm kiếm
                </Text>
                {
                    results.length != 0 ?
                        <FlatList
                            scrollEnabled={false}
                            data={results}
                            renderItem={renderStoryItem}
                            keyExtractor={item => item.id.toString()}
                            numColumns={0}
                        /> :
                        <Text
                            style={{
                                margin: 10,
                                paddingLeft: 5,
                                // borderBottomWidth: 2,
                                borderColor: 'green',
                                textAlign: 'center',
                                color: 'red',
                            }}
                        >
                            Không tìm thấy kết quả.
                        </Text>
                }
            </View>

            <View style={styles.container, { display: showRecommend ? 'flex' : 'none' }}>
                <Text
                    style={styles.pageTitle}>
                    Truyện đề xuất
                </Text>
                <FlatList
                    scrollEnabled={false}
                    data={stories}
                    renderItem={renderStoryItem}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                />
            </View>
            {/* </ScrollView > */}
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    searchSection: {
        paddingTop: '10',
        flexDirection: 'row',
        flex: 1,
        alignContent: 'center',
        flexWrap: 'wrap',
    },
    input: {
        padding: '10',
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
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
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: "black"
    },
    itemStyle: {
        padding: 10,
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    },
});

export default () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
            <SearchScreen />
        </ApplicationProvider>
    </>
);