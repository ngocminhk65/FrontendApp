import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor={'gray'}
                />
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
                <TouchableOpacity style={styles.signupButton} onPress={() => handleSignup()}>
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={styles.loginText}>
                    Already have an account? 
                    <Text style={styles.loginLink} onPress={() => navigation.navigate('LoginScreen')}> Login</Text>
                </Text>
            </View>
        </View>
    );

    function handleSignup() {
        // Xử lý logic đăng ký tài khoản ở đây
    }
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
    signupButton: {
        backgroundColor: '#00BFFF',
        padding: 15,
        borderRadius: 20,
        marginVertical: 10,
    },
    signupButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    loginText: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginLink: {
        color: '#00BFFF',
        marginLeft: 5,
    },
});
