import { useReducer, useEffect, useState } from "react";
import { collection ,addDoc, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";


let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        ...state,
        isPending: true,
        document: null,
        success: false,
        error: null
      };
    case "ADDED_DOCUMENT":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };

    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFireStore = (coll) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection reference
  const ref = collection(db, coll);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS PENDING" });
    try {
        const createdAt = Timestamp.fromDate(new Date());
        const addedDocument = await addDoc(ref, {...doc, createdAt: createdAt});
        dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({type: 'IS_PENDING'})
    try {
      const deletedDocument = await deleteDoc(doc(db, coll, id));
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT', payload: deletedDocument })
    } catch {
      dispatchIfNotCancelled({type: 'ERROR', payload: 'could not delete'})
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
