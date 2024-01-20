import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './app/redux/store';
import AppContainer from './app/navigation';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
