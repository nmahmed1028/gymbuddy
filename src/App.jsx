import {useState, useEffect} from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/Header/NavBar'
import AuthProvider from "./hooks/AuthProvider.jsx";
import PrivateRoute from "./router/PrivateRoute.jsx";
import Login from './components/Login'
import SignUp from './components/SignUp.jsx'
import Logout from './components/Logout.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar/>
          <br/>
          <h3 className="read-the-docs">Workout Tracker</h3>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/logout" element={<Logout />}/>
            <Route path="/profile" element={<PrivateRoute />} />
            <Route path="/social" element={<PrivateRoute />} />
            <Route path="/nutrition" element={<PrivateRoute />} />
            <Route path="/workout" element={<PrivateRoute />} />
          </Routes>
          {/* <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
            </button>
            </div> */}

        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
