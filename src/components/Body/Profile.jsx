import * as Dialog from "@radix-ui/react-dialog";
import { Box, Card, Inset, Text, Strong, Flex, Grid } from "@radix-ui/themes";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase";
import { useAuth } from "../../hooks/AuthProvider";
import { Progress } from "@/components/ui/progress"

/*
    This component is a profile page where users can edit their profile information.
 */
const Profile = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    const user = useAuth().curUser;

    const displayName = "John Doe"; // TODO lookup name
    const usersName = "@johndoe"; // TODO lookup username
    const email = user.email;
    const photoURL = "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"; // TODO lookup photoURL

    const mainProfileElem = (
        <div style={{ marginTop: "30px" }}>
            <Box maxWidth="250px">
                <Card size="3">
                    <Inset clip="padding-box" side="left" pb="current">
                        <img
                            src={photoURL}
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
                                <Strong>{usersName}</Strong>
                            </Text>
                            <Text as="p" size="4">
                                <Strong>{email}</Strong>
                            </Text>
                        </Grid>
                    </Inset>
                </Card>
            </Box>
        </div>
    );

    // TODO: Get progression data from database
    const progressionElem = (
        <div style={{ marginTop: "30px" }}>
            <Inset clip="padding-box" side="left" pb="current">
                <Box maxWidth="250px">
                    <p>User Progress</p>
                    <Progress value={75} size="3" variant="soft"/>
                </Box>
            </Inset>
        </div>
    );

    const experienceElem = (
        <div style={{ marginTop: "10px" }}>
            <Box maxWidth="65px">
                <Card size="3">
                    <Grid align="center" columns="2" gap="1" p="3">
                        <Inset clip="padding-box" side="left" pb="current">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Yellow_Star_with_rounded_edges.svg"
                                alt="User picture"
                                style={{
                                    display: "block",
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </Inset>
                        <Inset clip="padding-box" side="left" pb="current">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Yellow_Star_with_rounded_edges.svg"
                                alt="User picture"
                                style={{
                                    display: "block",
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </Inset>
                    </Grid>
                </Card>
            </Box>
        </div>
    );

    const goalsElem = (
        <div style={{ marginTop: "5px" }}>
            <Inset clip="padding-box" side="left" pb="current">
                <Box maxWidth="250px">
                    <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <button className="text-violet11 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none focus:shadow-black focus:outline-none">
                        Add goal
                        </button>
                    </Dialog.Trigger>
                    </Dialog.Root>
                </Box>
            </Inset>
        </div>
    );

    const handleSubmitEditProfile = async (event) => {
        // Get data from input fields
        console.log('Name:', name);
        console.log('Username:', username);
        console.log('Email:', user.email);
        try {
            const docRef = await addDoc(collection(db, "users"), {
                email: user.email,
                name: name,
                username: username
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const editProfileBtn = (
        <div style={{ marginTop: "50px" }}>
            <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
                Edit profile
                </button>
            </Dialog.Trigger>
    
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                    Edit profile
                </Dialog.Title>
                <Dialog.Description className="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal">
                    Make changes to your profile here. Click save when you're done.
                </Dialog.Description>
                <fieldset className="mb-[15px] flex items-center gap-5">
                    <label
                    className="text-violet11 w-[90px] text-right text-[15px]"
                    htmlFor="name"
                    >
                    Name
                    </label>
                    <input
                    className="text-white shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                    id="name"
                    value={name} // TODO lookup name
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                    />
                </fieldset>
                <fieldset className="mb-[15px] flex items-center gap-5">
                    <label
                    className="text-violet11 w-[90px] text-right text-[15px]"
                    htmlFor="username"
                    >
                    Username
                    </label>
                    <div className="flex items-center">
                        <span className="text-white shadow-violet7 inline-flex h-[35px] items-center justify-center rounded-l-[4px] px-[10px] text-[15px] leading-none bg-gray-800">
                            @
                        </span>
                        <input
                            className="text-white shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-r-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                            id="username"
                            value={username} // TODO lookup username
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                </fieldset>
                <div className="mt-[25px] flex justify-end">
                    <Dialog.Close asChild>
                    <button 
                    className="text-white font-bold bg-blue-500 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                    onClick={handleSubmitEditProfile}
                    >
                        Save changes
                    </button>
                    </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
            </Dialog.Root>
        </div>
    );

    return (
        <>
            {mainProfileElem}
            {progressionElem}
            {experienceElem}
            {goalsElem}
            {editProfileBtn}
        </>
      );
}

export default Profile;
