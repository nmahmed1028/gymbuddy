import React, { useEffect, useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { Box, Inset } from "@radix-ui/themes";
import { addUserGoal, getUncompleteUserGoals } from "@firebasegen/default-connector";
import { useAuth } from '../../../hooks/AuthProvider';
import { addDoc, collection, doc, updateDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import LevelProgression from './LevelProgression';

// Create a separate GoalItem component for cleaner code
const GoalItem = ({ goal, onToggle, onDelete }) => {
    console.log('Goal in GoalItem:', goal);
    
    return (
        <div className="text-left bg-white rounded-md p-2 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => onToggle(goal.id, goal.completed)}
                    className="w-4 h-4 rounded border-gray-300"
                />
                <p className={`text-black ${goal.completed ? 'line-through text-gray-500' : ''}`}>
                    {goal.goal}
                </p>
            </div>
            <button
                type="button"
                onClick={() => onDelete(goal.id)}
                className="bg-red-500 hover:bg-red-700 text-white text-xs px-2 py-1 rounded z-50"
            >
                Delete
            </button>
        </div>
    );
};

const Goals = () => {
    const { curUser: user } = useAuth();
    const email = user?.email;

    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');
    const [goalType, setGoalType] = useState('daily');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [level, setLevel] = useState(1);
    const [progress, setProgress] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);

    // Points for different goal types
    const GOAL_POINTS = {
        daily: 5,
        weekly: 25,
        monthly: 50
    };

    // Calculate points needed for next level (increases with each level)
    const getPointsForNextLevel = (currentLevel) => {
        if (currentLevel >= 50) return Infinity; // Cap at level 50
        return Math.floor(100 * (1 + (currentLevel * 0.2))); // 20% increase per level
    };

    // Calculate level and progress based on total points
    const calculateLevelAndProgress = (points) => {
        let remainingPoints = points;
        let currentLevel = 1;
        let pointsForCurrentLevel = 100; // Starting points needed

        // Keep adding levels until we don't have enough points for next level
        while (remainingPoints >= pointsForCurrentLevel && currentLevel < 50) {
            remainingPoints -= pointsForCurrentLevel;
            currentLevel++;
            pointsForCurrentLevel = getPointsForNextLevel(currentLevel);
        }

        // Calculate progress to next level
        const progress = currentLevel >= 50 
            ? 100 // Full progress bar at max level
            : Math.floor((remainingPoints / pointsForCurrentLevel) * 100);

        return {
            level: currentLevel,
            progress: progress
        };
    };

    useEffect(() => {
        console.log('Auth state:', { user, email });
    }, [user, email]);

    useEffect(() => {
        const loadGoals = async () => {
            if (!user?.email) return;

            try {
                console.log('Loading goals for user:', user.email);
                
                // Get goals from Firebase
                const goalsQuery = query(
                    collection(db, "goals"),
                    where("userId", "==", user.email)
                );
                
                const querySnapshot = await getDocs(goalsQuery);
                const loadedGoals = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                console.log('Loaded goals:', loadedGoals);
                setGoals(loadedGoals);
            } catch (error) {
                console.error("Error loading goals:", error);
            }
        };

        loadGoals();
    }, [user?.email]);

    const handleAddGoal = async () => {
        if (!newGoal.trim()) return;
        
        try {
            // Add to Firebase
            const docRef = await addDoc(collection(db, "goals"), {
                userId: user.email,
                goal: newGoal,
                completed: false,
                type: goalType,
                createdAt: new Date(),
                level: level
            });

            console.log('New goal ID:', docRef.id); // Debug log

            // Update local state with the new goal
            const newGoalObj = {
                id: docRef.id, // Make sure this ID is being set
                goal: newGoal,
                completed: false,
                type: goalType,
                userId: user.email
            };

            setGoals(prevGoals => [...prevGoals, newGoalObj]);
            
            setNewGoal('');
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error adding goal:", error);
            alert('Failed to add goal: ' + error.message);
        }
    };

    const handleToggleGoal = async (goalId, currentStatus) => {
        try {
            // Update in Firestore
            const goalRef = doc(db, "goals", goalId);
            const newStatus = !currentStatus;
            await updateDoc(goalRef, {
                completed: newStatus
            });

            // Find the goal to get its type
            const goal = goals.find(g => g.id === goalId);
            
            // Calculate points to add or remove
            const pointChange = newStatus ? GOAL_POINTS[goal.type] : -GOAL_POINTS[goal.type];
            const newTotalPoints = Math.max(0, totalPoints + pointChange); // Prevent negative points
            
            // Calculate new level and progress
            const { level: newLevel, progress: newProgress } = calculateLevelAndProgress(newTotalPoints);

            // Update local state
            setTotalPoints(newTotalPoints);
            setLevel(newLevel);
            setProgress(newProgress);
            
            // Update goals state
            setGoals(prevGoals => 
                prevGoals.map(g => 
                    g.id === goalId 
                        ? { ...g, completed: newStatus }
                        : g
                )
            );

            // Update user progress in Firebase
            await updateUserProgress(newTotalPoints);

        } catch (error) {
            console.error("Error updating goal:", error);
            alert('Failed to update goal status');
        }
    };

    const calculateProgress = (goals) => {
        const completedGoals = goals.filter(goal => goal.completed);
        return (completedGoals.length / goals.length) * 100;
    };

    const updateUserProgress = async (points) => {
        try {
            const userQuery = query(collection(db, "users"), where("email", "==", user.email));
            const userSnapshot = await getDocs(userQuery);
            
            if (!userSnapshot.empty) {
                const userDoc = userSnapshot.docs[0];
                await updateDoc(doc(db, "users", userDoc.id), {
                    totalPoints: points
                });
            }
        } catch (e) {
            console.error("Error updating progress: ", e);
        }
    };

    const handleDeleteGoal = async (goalId) => {
        console.log('Attempting to delete goal:', goalId);
        
        if (!goalId) {
            console.error('No goal ID provided');
            return;
        }

        try {
            // Delete from Firestore
            const goalRef = doc(db, "goals", goalId);
            await deleteDoc(goalRef);
            
            // Update local state
            setGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId));
            
            console.log('Goal deleted successfully');
            alert('Goal deleted!');
        } catch (error) {
            console.error("Error deleting goal:", error);
            alert('Failed to delete goal. Please try again.');
        }
    };

    return (
        <>
            {/* Level Progression Bar - full width at top */}
            <div className="w-full py-4">
                <LevelProgression 
                    level={level}
                    totalPoints={totalPoints}
                    progress={progress}
                />
            </div>

            {/* Regular content */}
            <div className="w-full p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Goals:</h1>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer z-10"
                    >
                        Add Goal
                    </button>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="fixed inset-0 bg-black/50" onClick={() => setIsModalOpen(false)} />
                        <div className="bg-white p-6 rounded-lg relative z-10">
                            <h2 className="text-lg font-semibold mb-4">Add Goal</h2>
                            <select
                                value={goalType}
                                onChange={(e) => setGoalType(e.target.value)}
                                className="w-full mb-4 p-2 border rounded bg-gray-100"
                            >
                                <option value="daily">Daily Goal</option>
                                <option value="weekly">Weekly Goal</option>
                                <option value="monthly">Monthly Goal</option>
                            </select>

                            <input
                                type="text"
                                value={newGoal}
                                onChange={(e) => setNewGoal(e.target.value)}
                                placeholder="Enter your goal"
                                className="w-full mb-4 p-2 border rounded bg-gray-100"
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={async () => {
                                        await handleAddGoal();
                                    }}
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    {['daily', 'weekly', 'monthly'].map((type) => (
                        <div key={type} className="mt-6">
                            <h3 className="text-lg font-semibold mb-2 text-right pr-4">
                                {type.charAt(0).toUpperCase() + type.slice(1)} Goals
                            </h3>
                            <div className="space-y-2">
                                {goals
                                    .filter(goal => goal.type === type && !goal.completed)
                                    .map((goal) => (
                                        <GoalItem 
                                            key={goal.id}
                                            goal={goal}
                                            onToggle={handleToggleGoal}
                                            onDelete={handleDeleteGoal}
                                        />
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Completed Goals:</h1>
                    </div>
                    <div className="space-y-2">
                        {goals
                            .filter(goal => goal.completed)
                            .map((goal) => (
                                <GoalItem 
                                    key={goal.id}
                                    goal={goal}
                                    onToggle={handleToggleGoal}
                                    onDelete={handleDeleteGoal}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Goals; 