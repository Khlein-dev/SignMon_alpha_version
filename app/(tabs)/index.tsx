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


      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#555"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#555"
        secureTextEntry
      />

      {/* Buttons */}
      <Link href="/dashboard" style={styles.link} asChild>
        <TouchableOpacity style={styles.loginButton}>
          <Text>Login</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/signUp" style={styles.link} asChild>
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </Link>


    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  logoImage: {
    width: 300,
    height: 300,
    marginBottom: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#042f5dff', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1D3D47',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#2D4D35',
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
  loginButton: {
    backgroundColor: '#de6a3cff', 
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    borderBlockColor: '#000000ff',
    borderWidth: 3,
    color: '#000000ff',
    fontWeight: '600',
  },
  link: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  signupButton: {
    borderColor: '#de6a3cff',
    borderWidth: 4,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  signupText: {
    color: '#ffffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 30,
    color: '#000000ff',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
