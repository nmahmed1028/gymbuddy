import { useAuth } from "../hooks/AuthProvider";

const Logout = () => {
    const auth = useAuth();
    auth.logOut();
    return (<></>);
};

export default Logout;
