import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../firebase.js';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { useAuth } from "../hooks/AuthProvider";

/*
This module handles all of the log in requirements for the application.
When you start up Gymbuddy this is the default screen that opens up and allows user's to log in or sign up
Upon successful log in the user is navigated to their profile tab 
*/

const Login = () => { // Function that handles the log in functionality
    const navigate = useNavigate(); // Used to handle link navigation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const auth = useAuth(); // Set's up the authenticator function
    const handleSubmit = (e) => { //Submits e, which houses log in details to the authenticator
        e.preventDefault();
        auth.loginAction({auth, email, password});
    }
    
    return (
        <div className="card">
            <h2>Login</h2>
            <br />
            {/*The following form sets up the log in functionality as well as the UI
                It has various fields used to input email address, password, and a field to submit
                Also includes a register button to send the user to the register screen*/}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email-address" className="pr-2">
                                    Email address
                    </label>
                    <input
                        id="email-address"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  
                        required
                        placeholder="Email address"
                        className="text-white text-sm"
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor="password" className="pr-10">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"                                    
                        required                                                                                
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}
                        className="text-white text-sm"
                    />
                </div>
                <br/>
                <button className="text-white font-bold bg-blue-500" type="submit">Login</button>
            </form>
            <br />
            <p className="text-m text-black text-center">
                            No account yet? {' '}
                            <NavLink to="/register">
                                Sign up
                            </NavLink>
            </p>
        </div>
    );
};

export default Login;
