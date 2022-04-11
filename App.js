import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComponent';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Main/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0fd',
  
  },
});
