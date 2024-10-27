import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase";
import { useAuth } from "../../hooks/AuthProvider";

const Profile = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    const user = useAuth().curUser;
    const handleSubmit = async (event) => {
        event.preventDefault();
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
                    defaultValue="" // TODO lookup name
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                            defaultValue="" // TODO lookup username
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </fieldset>
                <div className="mt-[25px] flex justify-end">
                    <Dialog.Close asChild>
                    <button 
                    className="text-white font-bold bg-blue-500 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                    onClick={handleSubmit}
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
            {editProfileBtn}
        </>
      );
}

export default Profile;
