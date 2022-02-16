import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { todosSelectors } from "../store/todo/todoSlice";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import { WP } from "../Utils/utils";
import { useDispatch } from "react-redux";
import { upsertTodo } from "../store/todo/todoSlice";
import { deleteTodo } from "../store/todo/todoSlice";
export const TodoItem = (props) => {
  const { id } = props;
  const task = useSelector((state) => todosSelectors.selectById(state, id));

  const Date = moment(task.date.toString()).format(" Do MMMM, h:mm");
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        iconStyle={{ borderColor: "silver" }}
        fillColor="silver"
        isChecked={task.completed}
        onPress={(isChecked) => {
          dispatch(upsertTodo({ id, completed: isChecked }));
        }}
      />
      <View style={{ flex: 1, marginTop: 23 }}>
        <Text style={styles.summaryText}>{task.summary}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
              justifyContent: "space-between",
            }}
          >
            <IoniconsIcon name="alarm-outline" size={WP(4.5)} color="black" />
            <Text style={styles.dateText}>{Date}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch(deleteTodo(id));
            }}
          >
            <FontAwesomeIcon name="trash-o" size={WP(6)} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  detailContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: WP(3.5),
    color: "grey",
    fontWeight: "500",
    marginLeft: 6,
  },
  summaryText: {
    fontSize: WP(4.5),
    color: "black",
    fontWeight: "500",
  },
});
