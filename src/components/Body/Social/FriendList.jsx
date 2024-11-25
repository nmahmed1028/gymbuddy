import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getUserFriends, acceptFriendRequest } from "@firebasegen/default-connector";

export default function FriendList() {
    const userId = "replace w/ user id"; //update dynamically
    const { data, loading, error, refetch } = useQuery(getUserFriends, {
        variables: { userId },
    });

    const [acceptFriend] = useMutation(acceptFriendRequest);

    const handleAcceptRequest = async (friendId) => {
        await acceptFriend({
            variables: { userId, friendId },
        });
        refetch();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching friends</p>;

    return (
        <div className = "friend-list">
            <h2>Friend List</h2>
            {data?.friends?.map((friend) => {
                const isUser1 = friend.user1.id === userId;
                const otherUser = isUser1 ? friend.user2 : friend.user1;

                return (
                    <div key = {friend.id} className = "friend-item">
                        <p>{otherUser.username}</p>
                        <p>Status: {friend.status}</p>
                        {friend.status === "pending" && (
                            <button onClick={() => handleAcceptRequest(otherUser.id)}>
                                Accept Request
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};