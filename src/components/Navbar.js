import './Navbar.css'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'


export default function Navbar() {
  const { logout } = useLogout()
  return (
    <div className='navbar container flex' style={{alignItems: "center"}}>
        <h1>myMoney</h1>
        <div className='flex' style={{alignItems: "center"}}>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <button className='btn' onClick={logout}>Logout</button>
        </div>
    </div>
  )
}
