import { getUserFriends, acceptFriendRequest } from "@firebasegen/default-connector";
import { useState, useEffect } from "react";

export default function FriendList() {
    const userId = "replace w/ user id"; //update dynamically
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFriends = async () => {
        try {
            setLoading(true);
            const result = await getUserFriends({
                variables: { userId },
            });
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, [userId]);

    const handleAcceptRequest = async (friendId) => {
        await acceptFriendRequest({
            variables: { userId, friendId },
        });
        fetchFriends(); // Refetch after accepting
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching friends</p>;

    return (
        <div className="friend-list">
            <h2>Friend List</h2>
            {(!data?.friends || data.friends.length === 0) ? (
                <p className="empty-state">No friends added yet</p>
            ) : (
                data.friends.map((friend) => {
                    const isUser1 = friend.user1.id === userId;
                    const otherUser = isUser1 ? friend.user2 : friend.user1;

                    return (
                        <div key={friend.id} className="friend-item">
                            <p>{otherUser.username}</p>
                            <p>Status: {friend.status}</p>
                            {friend.status === "pending" && (
                                <button onClick={() => handleAcceptRequest(otherUser.id)}>
                                    Accept Request
                                </button>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
}