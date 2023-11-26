import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { ImageBackground } from 'react-native';
import { Avatar, Divider, Icon } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';

const AvatarImage = (): React.ReactElement => (
    <Avatar
        style={styles.image}
        source={require('../assets/avt.png')}
        ImageComponent={ImageBackground}
    />
);

const UserProfile = () => {

    return (
        <>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.details}>
                        <Avatar
                            size='giant'
                            source={require('../assets/avt.png')}
                        />
                        <Text
                            style={styles.title}
                            category='h6'
                        >
                            Name
                        </Text>
                    </View>
                    <Divider />
                    <View
                        style={
                            {
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignContent: 'space-around',
                                marginVertical: 4,
                            }
                        }>
                        <Text
                            style={styles.title}
                            category='h6'
                        >
                            NumberCoins
                        </Text>
                        <Avatar
                            style={{}}
                            shape='square'
                            size='tiny'
                            source={require('../assets/coins.png')}
                        />
                    </View>

                </View>
            </SafeAreaView >
        </>
    )
}

const styles = StyleSheet.create({

    details: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    title: {
        marginHorizontal: 8,
    },
    container: {
        justifyContent: 'space-between',
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image: {
        top: -10,
        resizeMode: 'cover',
    },
    icon: {
        width: 30,
        height: 30,
        top: -10,
        right: 0,
        resizeMode: 'cover',
    },

});

export default UserProfile;