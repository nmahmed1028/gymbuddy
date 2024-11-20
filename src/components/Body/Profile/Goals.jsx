import React, { useEffect, useState } from 'react';
import { addUserGoal, getUncompleteUserGoals } from "@firebasegen/default-connector";

const Goals = ({ email }) => {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');
    const [goalType, setGoalType] = useState('daily');

    useEffect(() => {
        const loadGoals = async () => {
            const uncompletedGoals = await getUncompleteUserGoals({ email });
            console.log("Uncompleted Goals:", uncompletedGoals);
            setGoals(uncompletedGoals.dailyGoals || []);
        };
        loadGoals();
    }, [email]);

    const handleAddGoal = async () => {
        if (newGoal.trim()) {
            await addUserGoal({ email, goalType, goalText: newGoal, goalPoints: 0 });
            setGoals([...goals, { goalText: newGoal, goalType, completed: false }]);
            setNewGoal('');
        }
    };

    return (
        <div>
            <h2>Goals</h2>
            <input value={newGoal} onChange={(e) => setNewGoal(e.target.value)} placeholder="Enter your goal" />
            <button onClick={handleAddGoal}>Add Goal</button>
            <ul>
                {goals.length > 0 ? (
                    goals.map((goal, index) => (
                        <li key={index}>{goal.goalText}</li>
                    ))
                ) : (
                    <li>No goals available.</li>
                )}
            </ul>
        </div>
    );
};

export default Goals; 