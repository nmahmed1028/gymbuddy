import React, { useEffect, useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { Box, Inset } from "@radix-ui/themes";
import { addUserGoal, getUncompleteUserGoals } from "@firebasegen/default-connector";

// Create a separate GoalItem component for cleaner code
const GoalItem = ({ goal, onToggle, onDelete }) => (
    <div className="text-left bg-white rounded-md p-2 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
            <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => onToggle(goal.id, goal.completed)}
                className="w-4 h-4 rounded border-gray-300"
            />
            <p className={`text-black ${goal.completed ? 'line-through text-gray-500' : ''}`}>
                {goal.goalText}
            </p>
        </div>
        <button
            onClick={() => onDelete(goal.id)}
            className="bg-red-500 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
        >
            Delete
        </button>
    </div>
);

const Goals = ({ email }) => {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');
    const [goalType, setGoalType] = useState('daily');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadGoals = async () => {
            try {
                const uncompletedGoals = await getUncompleteUserGoals({ email });
                console.log("Uncompleted Goals:", uncompletedGoals);
                
                // Combine all types of goals
                const allGoals = [
                    ...(uncompletedGoals.dailyGoals || []),
                    ...(uncompletedGoals.weeklyGoals || []),
                    ...(uncompletedGoals.mothlyGoals || [])  // Note: typo in API ("mothly")
                ];
                setGoals(allGoals);
            } catch (error) {
                console.error("Error loading goals:", error);
            }
        };
        loadGoals();
    }, [email]);

    const handleAddGoal = async () => {
        if (!newGoal.trim()) return;
        
        try {
            // Calculate points based on goal type
            const goalPoints = goalType === 'daily' ? 5 : 
                             goalType === 'weekly' ? 10 : 20;

            await addUserGoal({ 
                email, 
                goalType, 
                goalText: newGoal, 
                goalPoints 
            });

            // Refresh goals after adding
            const uncompletedGoals = await getUncompleteUserGoals({ email });
            const allGoals = [
                ...(uncompletedGoals.dailyGoals || []),
                ...(uncompletedGoals.weeklyGoals || []),
                ...(uncompletedGoals.mothlyGoals || [])
            ];
            setGoals(allGoals);
            setNewGoal('');
        } catch (error) {
            console.error("Error adding goal:", error);
        }
    };

    return (
        <div style={{ marginTop: "5px" }} className="flex justify-end">
            <Inset clip="padding-box" side="left" pb="current">
                <Box maxWidth="250px">
                    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <Dialog.Trigger asChild>
                            <button className="text-violet11 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none focus:shadow-black focus:outline-none">
                                Add goal
                            </button>
                        </Dialog.Trigger>

                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg z-50">
                                <Dialog.Title>Add Goal</Dialog.Title>
                                <fieldset className="mb-[15px] flex items-center gap-5">
                                    <select
                                        value={goalType}
                                        onChange={(e) => setGoalType(e.target.value)}
                                        className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-[100px] items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                    >
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                    <input
                                        value={newGoal}
                                        onChange={(e) => setNewGoal(e.target.value)}
                                        className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                        placeholder="Enter your goal"
                                    />
                                </fieldset>

                                <div className="mt-[25px] flex justify-end">
                                    <button
                                        onClick={() => {
                                            handleAddGoal();
                                            setIsModalOpen(false);
                                        }}
                                        className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                                    >
                                        Add Goal
                                    </button>
                                    <Dialog.Close asChild>
                                        <button className="ml-2">Cancel</button>
                                    </Dialog.Close>
                                </div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>

                    {/* Goals sections */}
                    {['daily', 'weekly', 'monthly'].map((type) => (
                        <div key={type} className="mt-6">
                            <h3 className="text-lg font-semibold mb-2 text-left">
                                {type.charAt(0).toUpperCase() + type.slice(1)} Goals
                            </h3>
                            <div className="space-y-2">
                                {goals
                                    .filter(goal => goal.goalType === type)
                                    .map((goal, index) => (
                                        <GoalItem 
                                            key={goal.id || index}
                                            goal={goal}
                                            onToggle={() => {}} // TODO: Implement toggle
                                            onDelete={() => {}} // TODO: Implement delete
                                        />
                                    ))}
                            </div>
                        </div>
                    ))}
                </Box>
            </Inset>
        </div>
    );
};

export default Goals; 