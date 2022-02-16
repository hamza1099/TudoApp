import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { addAllTodos, deleteTodo, upsertTodoLocal } from "./todoSlice";

export const fetchandTrackToDoItems = (dispatch, loaded) => {
  try {
    let initLoading = true;
    const initialItems = [];
    const me = auth().currentUser;
    if (!me.uid) throw new Error("No User");
    const subscriber = firestore()
      .collection("todos")
      .where(`user`, "==", me.uid)
      .onSnapshot((querySnapshot) => {
        querySnapshot?.docChanges().forEach((change) => {
          const item = { id: change.doc.id, ...change.doc.data() };
          if (change.type === "added") {
            if (initLoading) {
              initialItems.push(item);
            } else {
              dispatch(upsertTodoLocal(item));
            }
          }
          if (change.type === "modified") {
            dispatch(upsertTodoLocal(item));
          }
          if (change.type === "removed") {
            dispatch(deleteTodo(item.id));
          }
        });
        if (initLoading) {
          dispatch(addAllTodos(initialItems));
          loaded?.();
        }
        initLoading = false;
      });
    return subscriber;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
