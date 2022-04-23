import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/LoadingComponent';

const {persistor, store} = ConfigureStore();

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
      loading={<Loading/>}
      persistor={persistor}
      >
      <Main /> 
      </PersistGate> 
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0fd',
  
  },
});
