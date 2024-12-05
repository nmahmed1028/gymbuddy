import { getFriendActivities } from "@firebasegen/default-connector";
import { useState, useEffect } from "react";

const ActivityFeed = () => {
  const userId = "replace w/ user id"; // Update dynamically
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const result = await getFriendActivities({
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
    fetchActivities();
  }, [userId]);

  //add something later to say friend list empty if no friends 
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
