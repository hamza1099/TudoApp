import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore"
import { addAllCheckins, deleteCheckin, upsertCheckinLocal } from "./checkinSlice";

export const fetchandTrackCheckinItems = (dispatch, loaded) => {
  try {
    let initLoading = true;
    const initialItems = [];
    const me = auth().currentUser;
    if (!me.uid) throw new Error("No User");
    const subscriber = firestore()
      .collection("checkins")
      .where(`user`, "==", me.uid)
      .onSnapshot((querySnapshot) => {
        querySnapshot?.docChanges().forEach((change) => {
          const item = { id: change.doc.id, ...change.doc.data() };
          if (change.type === "added") {
            if (initLoading) {
              initialItems.push(item);
            } else {
              dispatch(upsertCheckinLocal(item));
            }
          }
          if (change.type === "modified") {
            dispatch(upsertCheckinLocal(item));
          }
          if (change.type === "removed") {
            dispatch(deleteCheckin(item.id));
          }
        });
        if (initLoading) {
          dispatch(addAllCheckins(initialItems));
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