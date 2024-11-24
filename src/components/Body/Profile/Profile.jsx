import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/AuthProvider";
import { upsertUser, getUserByEmail, getUncompleteUserGoals } from "@firebasegen/default-connector";
import UserProfile from './UserProfile';
import Goals from './Goals';
import LevelProgression from './LevelProgression';
import DietaryRestrictions from './DietaryRestrictions';
import StateSelect from './StateSelect';

const Profile = () => {
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
    const [newDietaryRestriction, setNewDietaryRestriction] = useState('');
    const email = useAuth().curUser.email;

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load user data and goals
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userData = await getUserByEmail({ keyEmail: email });
                if (userData.user) {
                    setDisplayName(userData.user.displayname);
                    setUsername(userData.user.username);
                    setDietaryRestrictions(userData.user.dietaryRestrictions || []);
                    setLocation(userData.user.location || ''); // Assuming location is stored
                } else {
                    await upsertUser({ email, username: email });
                }
                const uncompletedGoals = await getUncompleteUserGoals({ email });
                // setGoals(uncompletedGoals.dailyGoals);
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        };
        loadUserData();
    }, [email]);

    // Function to handle profile submission
    const handleSubmitEditProfile = async () => {
        try {
            await upsertUser({
                email,
                username,
                displayname: displayName,
                location,
                dietaryRestrictions,
            });
            console.log('Profile updated successfully');
            setIsModalOpen(false); // Close the modal
        } catch (error) {
            console.error("Error updating profile: ", error);
        }
    };

    return (
        <div className="flex flex-col"> {/* Main container for the profile page */}
            {/* Level Progression Bar */}
            <div className="w-full mb-10"> {/* Full width for the level bar */}
                <LevelProgression level={1} totalPoints={0} progress={0} />
            </div>

            <div className="flex flex-row justify-between"> {/* Flex container for user info and goals */}
                <div className="flex flex-col w-1/2 pr-4"> {/* Left column for user profile */}
                    <UserProfile 
                        email={email} 
                        displayName={displayName} 
                        setDisplayName={setDisplayName} 
                        username={username} 
                        setUsername={setUsername} 
                    />
                    
                    {/* Edit Profile Button (EP Bar) */}
                    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <Dialog.Trigger asChild>
                            <button className="edit-profile-button">Edit Profile</button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg">
                                <Dialog.Title>Edit Profile</Dialog.Title>
                                <input 
                                    type="text" 
                                    placeholder="Screen Name" 
                                    value={displayName} 
                                    onChange={(e) => setDisplayName(e.target.value)} 
                                    className="mb-4" // Add margin-bottom for spacing
                                />
                                <input 
                                    type="text" 
                                    placeholder="Username" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    className="mb-4" // Add margin-bottom for spacing
                                />
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    value={email} 
                                    readOnly 
                                    className="mb-4" // Add margin-bottom for spacing
                                />
                                <StateSelect state={location} setState={setLocation} className="mb-10" /> {/* Increased margin-bottom for spacing */}
                                <DietaryRestrictions 
                                    dietaryRestrictions={dietaryRestrictions} 
                                    setDietaryRestrictions={setDietaryRestrictions} 
                                    newDietaryRestriction={newDietaryRestriction} 
                                    setNewDietaryRestriction={setNewDietaryRestriction} 
                                />
                                <button onClick={handleSubmitEditProfile} className="mt-4">Save Changes</button>
                                <Dialog.Close asChild>
                                    <button className="mt-2">Cancel</button>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>

                <div className="flex flex-col w-1/2 pl-4"> {/* Right column for goals */}
                    {/* Just render the Goals component */}
                    <Goals email={email} />
                </div>
            </div>
        </div>
    );
}

export default Profile;
