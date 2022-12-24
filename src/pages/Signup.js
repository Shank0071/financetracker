import './Signup.css'
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'


export default function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signup, isPending, error } = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, name)
        console.log(name, email, password)
        setName("")
        setEmail("")
        setPassword("")

    }
  return (
    <form onSubmit={handleSubmit} className='signup login grid'>
        <h2>Signup</h2>
        <label className='grid' style={{gap: "0.5rem"}}>
            <span>name:</span>
            <input 
            type="text" 
            placeholder='name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            />
        </label>
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
        { !isPending && <button className='btn'>Signup</button>}
        { isPending && <button className='btn' disabled>Loading</button> }
        { error && <p>{error}</p> }
    </form>
  )
}
