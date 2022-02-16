import React from 'react';
import {ActivityIndicator} from 'react-native';
import {View, StyleSheet} from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.Container}>
      <ActivityIndicator color="#000" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
