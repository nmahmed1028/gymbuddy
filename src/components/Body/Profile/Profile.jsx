import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/AuthProvider";
import { getUserByEmail } from "@firebasegen/default-connector";
import UserProfile from './UserProfile';
import Goals from './Goals';
import LevelProgression from './LevelProgression';

const Profile = () => {
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
    const [newDietaryRestriction, setNewDietaryRestriction] = useState('');
    const email = useAuth().curUser.email;

    // Load user data
    useEffect(() => {
        const loadUserData = async () => {
            try {
                console.log("Loading user data for:", email);
                const userData = await getUserByEmail({ keyEmail: email });
                if (userData.user) {
                    setDisplayName(userData.user.displayname);
                    setUsername(userData.user.username);
                    setDietaryRestrictions(userData.user.dietaryRestrictions || []);
                    setLocation(userData.user.location || '');
                } else {
                    console.log("User not found, creating new user with email:", email);
                    await upsertUser({ email, username: email });
                }
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        };
        loadUserData();
    }, [email]);

    return (
        <div className="flex flex-col">
            <div className="w-full mb-10">
                <LevelProgression level={1} totalPoints={0} progress={0} />
            </div>

            <div className="flex flex-row justify-between">
                <div className="flex flex-col w-1/2 pr-4">
                    <UserProfile 
                        email={email} 
                        displayName={displayName} 
                        setDisplayName={setDisplayName} 
                        username={username} 
                        setUsername={setUsername} 
                        location={location}
                        setLocation={setLocation}
                        dietaryRestrictions={dietaryRestrictions}
                        setDietaryRestrictions={setDietaryRestrictions}
                        newDietaryRestriction={newDietaryRestriction}
                        setNewDietaryRestriction={setNewDietaryRestriction}
                    />
                </div>

                <div className="flex flex-col w-1/2 pl-4">
                    <Goals email={email} />
                </div>
            </div>
        </div>
    );
}

export default Profile;
