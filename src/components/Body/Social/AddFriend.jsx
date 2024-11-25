import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { addFriend } from "@firebasegen/default-connector";

export default function AddFriendPage() {
  const [email, setEmail] = useState("");
  const userId = "replace w user id"; //update dynamically
  const [addFriends] = useMutation(addFriend);

  const handleAddFriend = async () => {
    try {
      const friendId = "resolve-friend-id"; // replace w API to find user by email
      await addFriends({
        variables: { userId, friendId },
      });
      alert("Friend request sent!");
      setEmail("");
    } catch (err) {
      alert("Error adding friend: " + err.message);
    }
  };

  return (
    <div className="add-friend">
      <h2>Add a Friend</h2>
      <input
        type="text"
        placeholder="Enter email or username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleAddFriend}>Send Request</button>
    </div>
  );
};

