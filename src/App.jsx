import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/Header/NavBar'
import AuthProvider from "./hooks/AuthProvider.jsx";
import PrivateRoute from "./router/PrivateRoute.jsx";
import Login from './components/Login'
import SignUp from './components/SignUp.jsx'
import Logout from './components/Logout.jsx'
import Profile from './components/Body/Profile'
import Social from './components/Body/Social'
import Nutrition from './components/Body/Nutrition'
import Workout from './components/Body/Workout/Workout'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar/>
          <br/>
          <h3 className="read-the-docs">Workout Tracker</h3>
          <Routes>
            <Route path="/" element={<PrivateRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/logout" element={<Logout />}/>
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/social" element={<Social />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/nutrition" element={<Nutrition />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/workout" element={<Workout />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
