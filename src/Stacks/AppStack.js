import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "../Screen/LoadingScreen";
import LoginScreen from "../Screen/LoginScreen";
import TopTabStack from "../Stacks/TopTabStack";
import auth from "@react-native-firebase/auth";
import { fetchandTrackToDoItems } from "../store/todo/todoListener";
import { useDispatch } from "react-redux";
import { fetchandTrackCheckinItems } from "../store/checkin/checkinListener";
import ModalStack from "./ModalStack";

const Stack = createNativeStackNavigator();
const MyTheme = {
  dark: false,
  colors: {
    text: "black",
  },
};

export default function AppStack() {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    let todoListener;
    let checkinListener;
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        todoListener = fetchandTrackToDoItems(dispatch);
        checkinListener = fetchandTrackCheckinItems(dispatch);
        setLoading(false);
      } else {
        setLoading(false);
        setUser(null);
      }
    });
    return () => {
      subscriber();
      todoListener?.();
      checkinListener?.();
    };
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name="Loading"
            options={{ headerShown: false }}
            component={LoadingScreen}
          />
        ) : user ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={TopTabStack}
            />
          </>
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Signin"
            component={LoginScreen}
          />
        )}
        <Stack.Screen
          name="Modal"
          component={ModalStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
