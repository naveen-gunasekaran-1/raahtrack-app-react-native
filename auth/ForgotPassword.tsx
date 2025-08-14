import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Animated, useColorScheme } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes';

const ForgotPassword = () => {
  type ForgotPasswordNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;
  const navigation = useNavigation<ForgotPasswordNavigationProp>();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const colorScheme = useColorScheme();
  const themeStyles = colorScheme === 'dark' ? darkStyles : lightStyles;

  const fadeAnim = useRef(new Animated.Value(0)).current; // Logo fade
  const slideAnim = useRef(new Animated.Value(50)).current; // Card slide

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 6, tension: 50, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleReset = () => {
    if (!email.trim()) {
      setError('Email is required');
      setMessage('');
      return;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Invalid email format');
      setMessage('');
      return;
    }
    setError('');
    setMessage(`Password reset link sent to ${email}`);
    // Optionally, implement actual password reset logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Animated.Image
          source={require('../assets/logo.png')}
          style={[styles.logo, { opacity: fadeAnim }]}
        />
      </View>

      <View style={styles.bottomSection} />

      <Animated.View style={[styles.card, { transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.title}>Forgot Password</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#E30613" style={styles.icon} />
          <TextInput
            style={[styles.input, themeStyles.input]}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#777"
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.resetButton} onPress={handleReset} activeOpacity={0.8}>
          <Text style={styles.resetButtonText}>Send Reset Link</Text>
        </TouchableOpacity>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>Remembered your password? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topSection: { flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', paddingTop: 40 },
  bottomSection: { flex: 1, backgroundColor: '#E30613', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  logo: { width: 250, height: 250, margin: 50, resizeMode: 'contain' },
  card: {
    position: 'absolute',
    top: '35%',
    left: '5%',
    right: '5%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
    minHeight: 250,
    justifyContent: 'space-between',
  },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 20, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10, paddingHorizontal: 10 },
  icon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 10, fontSize: 16 },
  resetButton: { backgroundColor: '#E30613', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  resetButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  message: { textAlign: 'center', marginTop: 15, color: '#E30613', fontSize: 14 },
  errorText: { color: '#E30613', fontSize: 13, marginBottom: 8 },
  link: { color: '#007AFF', textDecorationLine: 'underline' },
});

const lightStyles = StyleSheet.create({ input: { color: '#000' } });
const darkStyles = StyleSheet.create({ input: { color: '#fff', borderColor: '#555' } });

export default ForgotPassword;
