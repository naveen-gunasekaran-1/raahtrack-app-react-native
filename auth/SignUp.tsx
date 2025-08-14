import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Animated, useColorScheme } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes';

const SignUp = () => {
  type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
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

  const validateForm = () => {
    let newErrors: any = {};
    if (!name.trim()) newErrors.name = 'Username is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (!validateForm()) {
      setMessage('Please fix the errors above.');
      return;
    }
    setMessage(`Account created successfully! Welcome, ${name}`);
    // Optionally navigate to Login or Home
    // navigation.navigate('Login');
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
        {/* Username */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#E30613" style={styles.icon} />
          <TextInput
            style={[styles.input, themeStyles.input]}
            placeholder="USERNAME"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#777"
          />
        </View>
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        {/* Email */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#E30613" style={styles.icon} />
          <TextInput
            style={[styles.input, themeStyles.input]}
            placeholder="EMAIL"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#777"
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        {/* Password */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#E30613" style={styles.icon} />
          <TextInput
            style={[styles.input, themeStyles.input]}
            placeholder="PASSWORD"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            placeholderTextColor="#777"
          />
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#E30613" style={styles.icon} />
          <TextInput
            style={[styles.input, themeStyles.input]}
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            secureTextEntry
            onChangeText={setConfirmPassword}
            placeholderTextColor="#777"
          />
        </View>
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} activeOpacity={0.8}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>Already have an account? </Text>
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
    minHeight: 400,
    justifyContent: 'space-between',
  },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10, paddingHorizontal: 10 },
  icon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 10, fontSize: 16 },
  errorText: { color: '#E30613', fontSize: 13, marginBottom: 8 },
  signUpButton: { backgroundColor: '#E30613', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  signUpButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  message: { textAlign: 'center', marginTop: 15, color: '#E30613', fontSize: 14 },
  link: { color: '#007AFF', textDecorationLine: 'underline' },
});

const lightStyles = StyleSheet.create({ input: { color: '#000' } });
const darkStyles = StyleSheet.create({ input: { color: '#fff', borderColor: '#555' } });

export default SignUp;
