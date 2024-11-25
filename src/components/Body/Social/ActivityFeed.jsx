import React from "react";
import { useQuery } from "@apollo/client";
import { getFriendActivities } from "@firebasegen/default-connector";

const ActivityFeed = () => {
  const userId = "replace w/ user id"; // Update dynamically
  const { data, loading, error } = useQuery(getFriendActivities, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching activities.</p>;

  return (
    <div className="activity-feed">
      <h2>Activity Feed</h2>
      {data?.activities?.map((activity) => (
        <div key={activity.id} className="activity-item">
          <p>{activity.description}</p>
          <small>{new Date(activity.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
