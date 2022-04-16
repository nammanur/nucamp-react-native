import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0fd',
  
  },
});
