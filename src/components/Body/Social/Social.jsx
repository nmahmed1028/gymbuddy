/*
    This component is used to display the Social page.
 */
import React, { useState } from "react";
import FriendList from "./FriendList";
import AddFriend from "./AddFriend";
import ActivityFeed from "./ActivityFeed";

export default function Social() {
    return (
        <div className = "social-page">
            <h1>Social Page</h1>
            <div className = "social-sections">
                <FriendList />
                <AddFriend />
                <ActivityFeed />
            </div>
        </div>
    )
}
