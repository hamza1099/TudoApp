import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";
import { isEmpty } from "lodash";
import auth from "@react-native-firebase/auth";

export const upsertcheckin = createAsyncThunk(
  "store/upsertcheckin",
  async (item) => {
    try {
      const me = auth().currentUser;
      const userId = me.uid;
      if (!userId) return { status: 400, error: "No User" };
      if (isEmpty(item)) return { status: 400, error: "No Item" };
      const docRef = firestore().collection("checkins").doc(item.id);
      // console.log("id----", docRef);
      docRef.set(item, { merge: true });
      return { status: 200 };
    } catch (e) {
      console.log(e.message);
    }
  }
);

const checkins = createEntityAdapter();

const checkinSlice = createSlice({
  name: "checkinSlice",
  initialState: checkins.getInitialState(),
  reducers: {
    upsertCheckinLocal: checkins.upsertOne,
    addAllCheckins: checkins.addMany,
    deleteCheckin: checkins.removeOne,
  },
  extraReducers: {
    [upsertcheckin.fulfilled]: (state, { payload }) => {
      if (payload.status === 400) {
        state.error = payload.error;
      }
    },
  },
});
export const { addAllCheckins, upsertCheckinLocal, deleteCheckin } =
  checkinSlice.actions;
export default checkinSlice.reducer;

export const checkinSelectors = checkins.getSelectors(
  (state) => state.checkinSlice
);
