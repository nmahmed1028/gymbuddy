import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
      e.preventDefault()

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
    }

  return (
    <main >        
        <section>
            <div>
                <div className="card">                  
                    <h2>Register</h2>   
                    <br />                                                                         
                    <form>                                                                                            
                        <div>
                            <label htmlFor="email-address" className="pr-2">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                type="email"
                                label="Email address"
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
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"
                                className="text-white text-sm"          
                            />
                        </div>                                             
                        <br/>
                        <button
                            type="submit" 
                            onClick={onSubmit}    
                            className="text-white font-bold bg-blue-500"                    
                        >  
                            Sign up                                
                        </button>
                    </form>
                    <br />
                    <p>
                        Already have an account?{' '}
                        <NavLink to="/login" >
                            Sign in
                        </NavLink>
                    </p>                   
                </div>
            </div>
        </section>
    </main>
  )
}

export default Signup
