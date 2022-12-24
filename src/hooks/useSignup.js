import { useState } from "react"
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { user, dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);
        try {
            // signup the user
            const res = await createUserWithEmailAndPassword(auth, email, password)
            await console.log(res.user)

            if (!res) {
                throw new Error('Could not complete signup')
            }

            // add display name to user
            updateProfile(auth.currentUser, {
                displayName: displayName
            }).then(() => console.log("profile updated"))
            res.user.providerData[0].displayName = displayName;
            res.user.displayName = displayName;


            dispatch({ type: 'LOGIN', payload: res.user })
            console.log(user)

            setIsPending(false)
            setError(null)
        }
        catch(err) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false)
        }
    }

    return { error, isPending, signup }
}