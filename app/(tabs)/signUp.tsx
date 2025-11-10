import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { Link } from 'expo-router'

const App = () => {
    return (
        <View style={styles.container}>
            {/* {LOGO} */}
            <Image
                source={require('@/assets/images/SMlogo.png')}
                style={styles.logoImage}
            />

            {/* Title */}
            <Text style={styles.subtitle}>
                Create your account to learn Sign Language with your virtual pet
            </Text>

            {/* Input Fields for Sign Up */}
            <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#555"
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#555"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#555"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#555"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#555"
                secureTextEntry
            />

            {/* Buttons */}
            <Link href="/dashboard" style={styles.link} asChild>
                <TouchableOpacity style={styles.signupButton}>
                    <Text style={styles.signupText}>Sign Up</Text>
                </TouchableOpacity>
            </Link>

            <Link href="/" style={styles.link} asChild>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginText}>Back to Login</Text>
                </TouchableOpacity>
            </Link>

        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    logoImage: {
        width: 200,
        height: 200,
        marginBottom: 15,
    },
    container: {
        flex: 1,
        backgroundColor: '#042f5dff', // Yellow-green background
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#ffffffff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#ffffffff',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 12,
        borderColor: '#000000ff',
        borderWidth: 1,
    },
    signupButton: {
        backgroundColor: '#de6a3cff', // Green accent
        width: '100%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        borderColor: '#000000ff',
        borderWidth: 3,
    },
    link: {
        textDecorationLine: 'none',
    },
    signupText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    loginButton: {
        borderColor: '#de6a3cff',
        borderWidth: 2,
        width: '100%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 12,
        backgroundColor: 'transparent',
    },
    loginText: {
        color: '#ffffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    footerText: {
        marginTop: 30,
        color: '#000000ff',
        fontSize: 14,
        fontStyle: 'italic',
    },
});
