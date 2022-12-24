import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/config"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            console.log(auth)
            const user = userCredentials.user;
            dispatch({type: 'LOGIN', payload: user})
            console.log(user)
        })
    }
    return { login }
}