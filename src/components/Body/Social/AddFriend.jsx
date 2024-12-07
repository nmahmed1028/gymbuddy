import { useState } from "react";
import { addFriend } from "@firebasegen/default-connector";
import { getAuth } from "firebase/auth";

export default function AddFriendPage() {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const userEmail = auth.currentUser?.email;

  const handleAddFriend = async () => {
    try {
      if (email.trim() === "") {
        alert("Please enter a valid email address");
        return;
      }

      if (email.toLowerCase() === userEmail?.toLowerCase()) {
        alert("You cannot add yourself as a friend!");
        return;
      }
      
      //debug, logs input vals (remove later)
      console.log("Current user email:", userEmail);
      console.log("Friend email:", email.trim());
      
      const result = await addFriend({
        userEmail: userEmail,
        friendEmail: email.trim(),
      });
      
      console.log("Add friend result:", result); //debug, logs success result (remove later)
      
      alert("Friend request sent!");
      setEmail("");
    } catch (err) {
      //debug, logs error
      console.error("Full error object:", err);
      console.error("Error details:", {
        code: err.code,
        message: err.message,
        status: err.status,
        stack: err.stack
      });
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

