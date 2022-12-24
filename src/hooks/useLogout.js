import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const c = useAuthContext();

  const [isCancelled, setIsCancelled] = useState(false);

  const logout = () => {
    setError(null);
    setIsPending(true);
    signOut(auth)
      .then(() => {
        console.log("Successfully signed out");
        c.dispatch({ type: "LOGOUT", payload: null });
        if (!isCancelled) {
            setIsPending(false);
            setError(null);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
      });
  };
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
};
