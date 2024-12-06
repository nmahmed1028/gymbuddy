import React, { useRef, useState, useEffect } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { upsertUser } from "@firebasegen/default-connector";
import { Box, Card, Inset, Text, Strong, Grid } from "@radix-ui/themes";
import StateSelect from './StateSelect';
import DietaryRestrictions from './DietaryRestrictions';
import { db } from '../../../firebase';
import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';

const UserProfile = ({ email, displayName, setDisplayName, username, setUsername, location, setLocation, dietaryRestrictions, setDietaryRestrictions }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userDoc, setUserDoc] = useState(null);
    const [editableProfile, setEditableProfile] = useState({
        displayname: displayName || '',
        username: username || email?.split('@')[0] || '',
        location: location || '',
        dietaryRestrictions: dietaryRestrictions || []
    });

    useEffect(() => {
        setEditableProfile({
            displayname: displayName || '',
            username: username || email?.split('@')[0] || '',
            location: location || '',
            dietaryRestrictions: dietaryRestrictions || []
        });
    }, [displayName, username, location, dietaryRestrictions, email]);

    const handleSaveProfile = async () => {
        if (!email) {
            console.error('No authenticated user found');
            alert('Please log in to update profile');
            return;
        }

        try {
            const finalUsername = editableProfile.username.trim() || email.split('@')[0];
            
            const userData = {
                email,
                username: finalUsername,
                displayname: editableProfile.displayname,
                location: editableProfile.location || '',
                dietaryRestrictions: editableProfile.dietaryRestrictions || [],
                updatedAt: new Date()
            };

            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const existingDoc = querySnapshot.docs[0];
                const userRef = doc(db, "users", existingDoc.id);
                await updateDoc(userRef, userData);
            } else {
                await addDoc(collection(db, "users"), userData);
            }

            setDisplayName(userData.displayname);
            setUsername(finalUsername);
            setLocation(userData.location);
            setDietaryRestrictions(userData.dietaryRestrictions);

            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving profile:", error);
            alert('Failed to save profile: ' + error.message);
        }
    };

    return (
        <div style={{ marginTop: "30px" }}>
            <Box maxWidth="250px">
                <Card size="3">
                    <Inset clip="padding-box" side="left" pb="current">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                            alt="User picture"
                            style={{
                                display: "block",
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                            }}
                        />
                        <Grid align="center" columns="1" gap="1" p="3">
                            <Text as="p" size="6" align="left" color="black">
                                <Strong>{displayName}</Strong>
                            </Text>
                            <Text as="p" size="4" color='blue'>
                                <Strong>{"@" + username}</Strong>
                            </Text>
                            <Text as="p" size="4" style={{ lineHeight: '1.3' }}>
                                <Strong>{email}</Strong>
                            </Text>
                            <Text as="p" size="4" style={{ lineHeight: '1.3' }}>
                                <Strong>Location: {location}</Strong>
                            </Text>
                        </Grid>
                    </Inset>
                </Card>
            </Box>
            <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
                <Dialog.Trigger asChild>
                    <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-4">
                        Edit Profile
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg">
                        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium mb-4">
                            Edit Profile
                        </Dialog.Title>
                        
                        {/* Grid container for the three fields */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-black mb-2">Display Name</label>
                                <input
                                    type="text"
                                    placeholder="Display Name"
                                    value={editableProfile.displayname}
                                    onChange={(e) => setEditableProfile(prev => ({ ...prev, displayname: e.target.value }))}
                                    className="w-full p-2 border rounded text-black bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-black mb-2">Username</label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={editableProfile.username}
                                    onChange={(e) => setEditableProfile(prev => ({ ...prev, username: e.target.value }))}
                                    className="w-full p-2 border rounded text-black bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-black mb-2">State</label>
                                <StateSelect 
                                    state={editableProfile.location}
                                    setState={(value) => setEditableProfile(prev => ({ ...prev, location: value }))}
                                />
                            </div>
                        </div>

                        {/* Dietary Restrictions below the grid */}
                        <DietaryRestrictions
                            dietaryRestrictions={editableProfile.dietaryRestrictions}
                            setDietaryRestrictions={(value) => setEditableProfile(prev => ({ ...prev, dietaryRestrictions: value }))}
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={handleSaveProfile}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Save Changes
                            </button>
                            <Dialog.Close asChild>
                                <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                                    Cancel
                                </button>
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default UserProfile; 