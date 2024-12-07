import FriendList from "./FriendList";
import ActivityFeed from "./ActivityFeed";
import AddFriend from "./AddFriend";
import "./Social.css";

export default function Social() {
    return (
        <div className="social-page">
            <div className="social-sections">
                <h2>Friend List</h2>
                <AddFriend />
                <FriendList />
                <h2>Activity Feed</h2>
                <ActivityFeed />
            </div>
        </div>
    );
}
