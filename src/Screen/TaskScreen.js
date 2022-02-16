import React, { useCallback } from "react";

import {
  Pressable,
  SectionList,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import { Heading } from "../Component/Heading";
import { TodoItem } from "../Component/TodoItem";
import { todosSelectors } from "../store/todo/todoSlice";
import FirebaseUtils from "../Utils/FirebaseUtils";

export default function TaskScreen({ navigation }) {
  const tasks = useSelector(todosSelectors.selectAll);
  const inCompletedTasks = tasks.filter(
    (item) => (console.log(item), !item.completed)
  );
  const completedTasks = tasks.filter((item) => item.completed);
  const data = [
    {
      title: "Incomplete",
      data: inCompletedTasks,
    },
    {
      title: "Completed",
      data: completedTasks,
    },
  ];

  const renderItem = useCallback(
    ({ item }) => <TodoItem id={item.id}></TodoItem>,
    []
  );
  const renderSectionHeader = useCallback(
    ({ section: { title } }) => <Heading text={title} />,
    []
  );
  const renderListHeader = useCallback(
    () => (
      <Pressable
        onPress={() => {
          navigation.navigate("Modal");
        }}
      >
        <Heading text={"+ Add New Task"}></Heading>
      </Pressable>
    ),
    []
  );
  return (
    <View>
      <SectionList
        ListHeaderComponent={renderListHeader}
        sections={data}
        renderSectionHeader={renderSectionHeader}
        style={{ backgroundColor: "white" }}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
