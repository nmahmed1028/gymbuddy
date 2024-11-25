import React, { useRef, useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { upsertUser } from "@firebasegen/default-connector";
import { Box, Card, Inset, Text, Strong, Grid } from "@radix-ui/themes";
import StateSelect from './StateSelect';
import DietaryRestrictions from './DietaryRestrictions';

const UserProfile = ({ email, displayName, setDisplayName, username, setUsername, location, setLocation, dietaryRestrictions, setDietaryRestrictions, newDietaryRestriction, setNewDietaryRestriction }) => {
    const nameRef = useRef(null);
    const usernameRef = useRef(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitEditProfile = async () => {
        const updatedUsername = usernameRef.current.value || email;
        const updatedName = nameRef.current.value || null;

        try {
            await upsertUser({
                email,
                username: updatedUsername,
                displayname: updatedName,
            });
            console.log('Profile updated successfully');
            setDisplayName(updatedName);
            setUsername(updatedUsername);
            setIsModalOpen(false); // Close the modal
        } catch (error) {
            console.error("Error updating profile: ", error);
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
                    <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">Edit Profile</button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg">
                    <Dialog.Title className="text-mauve12 m-0 text-[30px] font-medium">
                    Edit Profile
                    </Dialog.Title>
                        <input
                            type="text"
                            placeholder="Screen Name"
                            defaultValue={displayName}
                            ref={nameRef}
                            className="mb-4 text-white bg-blackA6"
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            defaultValue={username}
                            ref={usernameRef}
                            className="mb-4 text-white bg-blackA6"
                        />
                        <StateSelect state={location} setState={setLocation} className="mb-4 bg-blackA6 text-white" />
                        <DietaryRestrictions 
                            dietaryRestrictions={dietaryRestrictions} 
                            setDietaryRestrictions={setDietaryRestrictions} 
                            newDietaryRestriction={newDietaryRestriction} 
                            setNewDietaryRestriction={setNewDietaryRestriction} 
                        />
                        <button onClick={handleSubmitEditProfile} className="bg-blackA6 mt-4 text-white">Save Changes</button>
                        <Dialog.Close asChild>
                            <button className="bg-blackA6 mt-2 text-white">Cancel</button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default UserProfile; 