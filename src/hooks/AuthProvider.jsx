import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase.js';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import {  signInWithEmailAndPassword  } from 'firebase/auth';
import {  getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged, signOut  } from "firebase/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [curUser, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const navigate = useNavigate();
  const loginAction = (data) => {
    setPersistence(auth, browserLocalPersistence)
    .then(() => {
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
    useEffect(() => {
        navigate("/login");
    });
    console.log("logged out");
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ curUser, loginAction, logOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};