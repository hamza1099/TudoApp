import React from "react";
import { StyleSheet, View } from "react-native";
import AppStack from "./src/Stacks/AppStack";
import { Provider } from "react-redux";
import { store } from "./src/store";

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.Container}>
        <AppStack />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
