import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppContainer from './app/navigation';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
