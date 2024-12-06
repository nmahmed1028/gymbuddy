import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/AuthProvider";
import { db } from '../../../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import UserProfile from './UserProfile';
import Goals from './Goals';

const Profile = () => {
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
    const [newDietaryRestriction, setNewDietaryRestriction] = useState('');
    
    const email = useAuth().curUser.email;

    useEffect(() => {
        if (!email) return;

        // Set up real-time listener for user data
        const q = query(collection(db, "users"), where("email", "==", email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                setDisplayName(userData.displayname || '');
                setUsername(userData.username || '');
                setLocation(userData.location || '');
                setDietaryRestrictions(userData.dietaryRestrictions || []);
            }
        }, (error) => {
            console.error("Error fetching user data:", error);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [email]);

    return (
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
    );
}

export default Profile;
