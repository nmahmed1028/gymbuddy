import { useAuth } from "../hooks/AuthProvider";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const { loginAction } = useAuth();
    const [formData, setFormData] = useState({ username: "", password: "" });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        loginAction(formData);
    };
    
    return (
        <div className="card">
            <h2>Login</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <br/>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <br/>
                <br/>
                <button type="submit">Login</button>
            </form>
            <br />
            <Link to="/register" className="register">Register</Link>
        </div>
    );
};

export default Login;
