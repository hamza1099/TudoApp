import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import moment from "moment";
import { HP, WP } from "../Utils/utils";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { upsertTodo } from "../store/todo/todoSlice";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
const AddForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("Due Date");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dates) => {
    const time = moment(dates.toString()).format(" h:mm ");
    const date = moment(dates.toString()).calendar();
    setDate(date + "  " + time);
    hideDatePicker();
  };
  const addItem = useCallback((item) => {
    dispatch(upsertTodo(item));
  }, []);

  const AddItems = () => {
    if (summary && description && date) {
      addItem({
        summary: summary,
        description: description,
        date: date,
        completed: false, // remove in case of edit
        timestamp: moment().toString(), // remove in case of edit
        user: auth().currentUser.uid, // remove in case of edit
      });
      navigation.goBack();
    } else {
      alert("Fill the fields");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardHeading}>Add Task</Text>
          {/* Summary */}
          <View style={styles.summaryInputContainer}>
            <AntDesignIcon name="message1" size={WP(5.5)} color="black" />
            <TextInput
              placeholder="Summary"
              style={styles.summaryInput}
              onChangeText={(e) => {
                setSummary(e);
              }}
            />
          </View>
          {/* Description */}
          <View style={styles.decInputContainer}>
            <MaterialIcons
              name="segment"
              size={WP(5.5)}
              style={{ marginTop: Platform.OS === "ios" ? 2 : 27 }}
              color="black"
            />
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Description"
              style={styles.decInput}
              onChangeText={(e) => setDescription(e)}
            />
          </View>
          {/* Due Date */}
          <View style={styles.dueInputContainer}>
            <AntDesignIcon name="clockcircleo" size={WP(5.5)} color="black" />
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.dueText}>{date}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          {/* save btn */}
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity style={styles.saveButton} onPress={AddItems}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          {/* cancel btn */}
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: HP(22),
  },
  cardContainer: {
    backgroundColor: "#fff",
    width: "100%",
    // height: Platform.OS === "ios" ? 450 : 440,
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  cardHeading: {
    fontSize: 22,
    color: "black",
    fontWeight: "700",
  },
  summaryInputContainer: {
    borderBottomWidth: 2,
    borderColor: "lightgrey",
    marginTop: Platform.OS === "ios" ? 30 : 20,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 15 : 3,
    flexDirection: "row",
    alignItems: "center",
  },
  summaryInput: {
    width: "100%",
    fontSize: Platform.OS === "ios" ? 17 : 17,
    fontWeight: "600",
    marginLeft: 10,
    color: "black",
  },
  decInputContainer: {
    borderBottomWidth: 2,
    borderColor: "lightgrey",
    marginTop: Platform.OS === "ios" ? 20 : 0,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
    paddingBottom: Platform.OS === "ios" ? 5 : 15,
    flexDirection: "row",
  },
  decInput: {
    width: "100%",
    fontSize: Platform.OS === "ios" ? 17 : 17,
    fontWeight: "600",
    marginLeft: 10,
    color: "black",
    height: Platform.OS === "ios" ? 70 : 80,
  },
  dueInputContainer: {
    borderBottomWidth: 2,
    borderColor: "lightgrey",
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  dueText: {
    color: "grey",
    fontSize: Platform.OS === "ios" ? 16 : 16,
    fontWeight: "600",
    marginLeft: Platform.OS === "ios" ? 10 : 12,
  },
  saveButton: {
    width: 220,
    height: 45,
    borderRadius: 30,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "500",
  },
  cancelButtonText: {
    marginTop: 15,
    color: "black",
    fontSize: 15,
    fontWeight: "700",
  },
});
