import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const GreenScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Green Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccffcc',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default GreenScreen;