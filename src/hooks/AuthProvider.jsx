import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase.js';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import {  signInWithEmailAndPassword  } from 'firebase/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const loginAction = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        localStorage.setItem("site", user);
        navigate("/profile")
        console.log(user);
        return;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
  };
  const logOut = () => {
    setUser(null);
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
