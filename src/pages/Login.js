import { useState } from 'react'
import './Login.css'
import { useLogin } from '../hooks/useLogin'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
        login(email, password)
        setEmail("");
        setPassword("")
    }



  return (
    <form  onSubmit={handleSubmit} className='login grid'>
        <h2>Login</h2>
        <label className='grid' style={{gap: "0.5rem"}}>
            <span>email:</span>
            <input 
            type="email" 
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
        </label>
        <label className='grid' style={{gap: "0.5rem"}}>
            <span>password:</span>
            <input 
            type="password" 
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
        </label>
        <button className='btn'>Login</button>
    </form>
  )
}
