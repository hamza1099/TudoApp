import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddForm from "../Component/AddForm";
const ModalStack = () => {
  const RootStack = createNativeStackNavigator();
  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{ presentation: "card" }}>
        <RootStack.Screen
          options={{ headerShown: false }}
          name="AddForm"
          component={AddForm}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default ModalStack;
