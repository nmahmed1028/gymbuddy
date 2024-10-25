import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../firebase.js';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { useAuth } from "../hooks/AuthProvider";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = useAuth();
    const handleSubmit = (e) => {
        e.preventDefault();
        auth.loginAction({auth, email, password});
    }
    
    return (
        <div className="card">
            <h2>Login</h2>
            <br />
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
