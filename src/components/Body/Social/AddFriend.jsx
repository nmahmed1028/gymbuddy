import { useState } from "react";
import { addFriend } from "@firebasegen/default-connector";
import { getAuth } from "firebase/auth";

export default function AddFriendPage() {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const userEmail = auth.currentUser?.email;

  const handleAddFriend = async () => {
    try {
      await addFriend({
        userEmail: userEmail,
        friendEmail: email,
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
}

