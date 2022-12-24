import  { useEffect, useRef, useState } from "react"
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";


export const useCollection = (coll, _q) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const q = useRef(_q).current;

    useEffect(() => {
        let ref = collection(db, coll);
        if (q) {
            console.log(...q)
            const r = query(ref, where(...q), orderBy("createdAt", "desc"));
            console.log(r)
            ref = r;
        }
        const unsub = onSnapshot(ref, (snapshot) => {
            let results = [];
            snapshot.docs.forEach((doc) => {
                results.push({...doc.data(), id: doc.id})
            })
            // update state
            setDocuments(results);
            setError(null)
        }, (error) => {
            console.log(error);
            setError("Could not fetch the data")
        })

        // unsubscribe on unmount
        return () => unsub()
    }, [coll, q])

    return { documents, error }
}