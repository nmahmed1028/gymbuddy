import { useAuth } from "../hooks/AuthProvider";
/* This Module handles log out functionality
    The log out function uses the auth functionality of firebase to log out */
const Logout = () => {
    const auth = useAuth();
    auth.logOut();
    return (<></>);
};

export default Logout;
