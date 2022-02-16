import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TaskScreen from "../Screen/TaskScreen";
import LocationScreen from "../Screen/LocationScreen";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { WP } from "../Utils/utils";
import FirebaseUtils from "../Utils/FirebaseUtils";
export default function TopTabStack({ navigation }) {
  const Tab = createMaterialTopTabNavigator();
  const SignOut = () => {
    FirebaseUtils.signout().catch((e) => {
      console.log(e);
      alert("Something Went Wrong");
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.actionBar}>
        <Text style={styles.mainHeading}>TestApp</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            SignOut();
          }}
        >
          <Text style={styles.logOut}>LogOut</Text>
          <Ionicons name="exit-outline" style={styles.Icon} />
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        initialRouteName="Task"
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "white",
          tabBarIndicatorStyle: {
            backgroundColor: "#fff",
          },
          tabBarLabelStyle: { fontSize: 14, fontWeight: "700" },
          tabBarStyle: { backgroundColor: "black" },
        }}
      >
        <Tab.Screen
          name="Task"
          component={TaskScreen}
          options={{ tabBarLabel: "Task" }}
        />
        <Tab.Screen
          name="Location"
          component={LocationScreen}
          options={{ tabBarLabel: "Location" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    height: WP(13),
    alignItems: "center",
    paddingHorizontal: 20,
    // marginBottom:10
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainHeading: {
    fontSize: WP(5),
    fontWeight: "bold",
    color: "#fff",
  },
  logOut: {
    fontSize: WP(4),
    fontWeight: Platform.OS === "ios" ? "700" : "500",
    color: "#fff",
    marginRight: 10,
  },
  Icon: {
    color: "#fff",
    fontSize: WP(4.5),
    fontWeight: Platform.OS === "ios" ? "700" : "500",
  },
});
