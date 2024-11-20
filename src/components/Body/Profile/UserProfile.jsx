import React, { useEffect } from 'react';
import { upsertUser, getUserByEmail } from "@firebasegen/default-connector";

const UserProfile = ({ email, displayName, setDisplayName, username, setUsername }) => {
    useEffect(() => {
        const loadUserData = async () => {
            const userData = await getUserByEmail({ keyEmail: email });
            console.log("User Data:", userData);
            if (userData.user) {
                setDisplayName(userData.user.displayname);
                setUsername(userData.user.username);
            } else {
                await upsertUser({ email, username: email });
            }
        };
        loadUserData();
    }, [email, setDisplayName, setUsername]);

    return (
        <div>
            <h2>User Profile</h2>
            <p>Display Name: {displayName}</p>
            <p>Username: {username}</p>
        </div>
    );
};

export default UserProfile; 