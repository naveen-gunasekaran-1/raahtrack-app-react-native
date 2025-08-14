import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PassengerHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, Passenger!</Text>
      {/* Add passenger-specific functionality like tracking buses */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
});

export default PassengerHome;
