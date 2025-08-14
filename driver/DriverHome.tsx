import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DriverHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, Driver!</Text>
      {/* Add driver-specific functionality like bus tracking */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
});

export default DriverHome;
