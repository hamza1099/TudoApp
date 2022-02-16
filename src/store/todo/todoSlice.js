import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";
import { isEmpty } from "lodash";
import auth from "@react-native-firebase/auth";

export const upsertTodo = createAsyncThunk("store/upsertTodo", async (item) => {
  try {
    const me = auth().currentUser;
    const userId = me.uid;
    if (!userId) return { status: 400, error: "No User" };
    if (isEmpty(item)) return { status: 400, error: "No Item" };
    const docRef = firestore().collection("todos").doc(item.id);
    docRef.set(item, { merge: true });
    return { status: 200 };
  } catch (e) {
    console.log(e.message);
  }
});

const todos = createEntityAdapter();

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: todos.getInitialState(),
  reducers: {
    upsertTodoLocal: todos.upsertOne,
    addAllTodos: todos.addMany,
    deleteTodo: todos.removeOne,
  },
  extraReducers: {
    [upsertTodo.fulfilled]: (state, { payload }) => {
      if (payload.status === 400) {
        state.error = payload.error;
      }
    },
  },
});
export const { addAllTodos, upsertTodoLocal, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;

export const todosSelectors = todos.getSelectors((state) => state.todoSlice);
