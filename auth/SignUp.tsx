import React, { useState, useRef, useEffect, use } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Animated, useColorScheme } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes';
import { Dropdown } from 'react-native-element-dropdown';

const SignUp = () => {
  type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  
  const data = [
    { label: 'Driver', value: 'Driver' },
    { label: 'Passenger', value: 'Passenger' }
  ];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Passenger');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const colorScheme = useColorScheme();
  const themeStyles = colorScheme === 'dark' ? darkStyles : lightStyles;
  const[showAdd,setShowadd] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const[DriverID,setDriverID] = useState(0);
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 6, tension: 50, useNativeDriver: true }),
    ]).start();
  }, []);
const handleRole = (x) =>
{
  setRole(x);
  if(x=='Driver')
  {
    setShowadd(true);
  }
  else{
    setShowadd(false);
  }
}
  const validateForm = () => {
    let newErrors = {};
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

        {/* Role Dropdown */}
{/* Role Dropdown */}
<View style={styles.inputContainer}>
  <Ionicons name="people-outline" size={20} color="#E30613" style={styles.icon} />
  <Dropdown
    style={[styles.dropdown, themeStyles.dropdown]}
    containerStyle={[styles.dropdownContainer, themeStyles.dropdownContainer]}
    itemContainerStyle={styles.dropdownItemContainer}
    itemTextStyle={[styles.dropdownItemText, themeStyles.dropdownItemText]}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={[styles.selectedTextStyle, themeStyles.selectedTextStyle]}
    data={data}
    labelField="label"
    valueField="value"
    placeholder="SELECT ROLE"
    value={role}
    onChange={item => handleRole(item.value)}
    renderRightIcon={() => (
      <Ionicons
        name="chevron-down"
        size={16}
        color="#777"
        style={styles.dropdownIcon}
      />
    )}
    activeColor={colorScheme === 'dark' ? '#333' : '#f0f0f0'}
  />
</View>

{/* Additional Field */}
{showAdd && (
  <View style={styles.inputContainer}>
    <Ionicons name="person-outline" size={20} color="#E30613" style={styles.icon} />
      <TextInput
            style={[styles.input, themeStyles.input]}
            placeholder="DRIVER ID"
            value={DriverID}
            onChangeText={setDriverID}
            placeholderTextColor="#777"
          />
  </View>
)}


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
          <Text style={themeStyles.text}>Already have an account? </Text>
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
  topSection: { 
    flex: 1, 
    backgroundColor: 'white', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: 40 
  },
  bottomSection: { 
    flex: 1, 
    backgroundColor: '#E30613', 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10 
  },
  logo: { 
    width: 250, 
    height: 250, 
    margin: 50, 
    resizeMode: 'contain' 
  },
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
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    marginBottom: 10, 
    paddingHorizontal: 10,
    minHeight: 50
  },
  icon: { marginRight: 8 },
  input: { 
    flex: 1, 
    paddingVertical: 10, 
    fontSize: 16 
  },
  dropdown: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  dropdownContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  dropdownItemContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 16,
    paddingVertical: 8,
  },
  placeholderStyle: {
    color: '#777',
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: '400',
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  errorText: { 
    color: '#E30613', 
    fontSize: 13, 
    marginBottom: 8 
  },
  signUpButton: { 
    backgroundColor: '#E30613', 
    paddingVertical: 14, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10 
  },
  signUpButtonText: { 
    color: '#fff', 
    fontWeight: '600', 
    fontSize: 16 
  },
  message: { 
    textAlign: 'center', 
    marginTop: 15, 
    color: '#E30613', 
    fontSize: 14 
  },
  link: { 
    color: '#007AFF', 
    textDecorationLine: 'underline' 
  },
});

const lightStyles = StyleSheet.create({ 
  input: { color: '#000' },
  dropdown: { color: '#000' },
  dropdownContainer: { backgroundColor: '#fff' },
  dropdownItemText: { color: '#000' },
  selectedTextStyle: { color: '#000' },
  text: { color: '#000' }
});

const darkStyles = StyleSheet.create({ 
  input: { color: '#000', borderColor: '#555' },
  dropdown: { color: '#000' },
  dropdownContainer: { backgroundColor: '#333', borderColor: '#555' },
  dropdownItemText: { color: '#fff' },
  selectedTextStyle: { color: '#000' },
  text: { color: '#000' }
});

export default SignUp;