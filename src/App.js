import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            {user && <Home />}
            {!user && <Redirect to='/login' />}
          </Route>
          <Route path="/login">
            {user && <Redirect to='/' />}
            {!user && <Login />}
          </Route>
          <Route path="/signup">
            {!user && <Signup />}
            {user && <Redirect to='/' />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
