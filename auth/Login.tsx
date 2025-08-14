import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Animated, useColorScheme } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes';


const Login = () => {
  type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const colorScheme = useColorScheme();
  const themeStyles = colorScheme === 'dark' ? darkStyles : lightStyles;

  const fadeAnim = useRef(new Animated.Value(0)).current; // Logo fade
  const slideAnim = useRef(new Animated.Value(50)).current; // Card slide

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

const users = [
  { name: 'naveen', password: 'Naveen@2005', role: 'driver' },
  { name: 'Harini', password: 'Harini@30', role: 'passenger' }
];

  const validateForm = () => {
    let newErrors: any = {};
    if (!name.trim()) newErrors.name = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handlePress = () => {
  if (!validateForm()) {
    setMessage('Please fix the errors above.');
    return;
  }

  const user = users.find(u => u.name === name && u.password === password);

  if (user) {
    setMessage(`Hi ${name}, welcome back!`);
    
    // Navigate based on role
    if (user.role === 'driver') {
      navigation.navigate('DriverHome');
    } else if (user.role === 'passenger') {
      navigation.navigate('PassengerHome');
    }
  } else {
    setMessage('Invalid username or password.');
  }
};


  return (
    <View style={styles.container}>
      {/* Top light grey */}
      <View style={styles.topSection}>
        <Animated.Image
          source={require('../assets/logo.png')}
          style={[styles.logo, { opacity: fadeAnim }]}
        />
      </View>

      {/* Bottom red */}
      <View style={styles.bottomSection} />

      {/* Floating Card */}
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

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handlePress} activeOpacity={0.8}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign Up */}
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
bottomSection: {
  flex: 1,
  backgroundColor: '#E30613',
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10 // ensures children respect the radius
},
  logo: {
    width: 250,
    height: 250,
    margin:50,
    resizeMode: 'contain',
  },
  card: {
    position: 'absolute',
    top: '40%',
    left: '5%',
    right: '5%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOpacity: 100,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
    minHeight: 250,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  errorText: {
    color: '#E30613',
    fontSize: 13,
    marginBottom: 8,
  },
  loginButton: {
    backgroundColor: '#E30613',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  message: {
    textAlign: 'center',
    marginTop: 15,
    color: '#E30613',
    fontSize: 14,
  },
  link: { color: '#007AFF', textDecorationLine: 'underline' }
});

const lightStyles = StyleSheet.create({
  input: {  
    color: '#000',
  },
});

const darkStyles = StyleSheet.create({
  input: {
    color: '#000',
    borderColor: '#555',
  },
});

export default Login;
