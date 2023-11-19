import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={'gray'}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={'gray'}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.signupText}>Don't have an account? 
                    <Text style={styles.signupLink} onPress={() => navigation.navigate('SignupScreen')}> Sign Up</Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backgroundImage: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        marginVertical: 10,
        color: 'gray',
    },
    loginButton: {
        backgroundColor: '#00BFFF',
        padding: 15,
        borderRadius: 20,
        marginVertical: 10,
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    signupText: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupLink: {
        color: '#00BFFF',
        marginLeft: 5,
    },
});

