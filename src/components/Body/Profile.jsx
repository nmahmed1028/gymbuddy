import * as Dialog from "@radix-ui/react-dialog";
import { Box, Card, Inset, Text, Strong, Flex, Grid } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { db } from "../../firebase";
import { useAuth } from "../../hooks/AuthProvider";
import { Progress } from "@/components/ui/progress"
import { upsertUser, getUserByEmail } from "@firebasegen/default-connector"

/*
    This component is a profile page where users can edit their profile information.
 */
const Profile = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [goals, setGoals] = useState([]); // Add this state for goals
    const [newGoal, setNewGoal] = useState('');
    const [goalType, setGoalType] = useState('daily'); // 'daily', 'weekly', or 'monthly'
    const [progress, setProgress] = useState(0);
    const [level, setLevel] = useState(1);
    const [totalPoints, setTotalPoints] = useState(0);

    const user = useAuth().curUser;

    const displayName = "John Doe"; // TODO lookup name
    const usersName = "@johndoe"; // TODO lookup username
    const email = user.email;
    const photoURL = "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"; // TODO lookup photoURL
    const new_user = getUserByEmail({keyEmail: email}) /* This Works, must use keyEmail: Input Email for it to work*/

    const mainProfileElem = (
        <div style={{ marginTop: "30px" }}>
            <Box maxWidth="250px">
                <Card size="3">
                    <Inset clip="padding-box" side="left" pb="current">
                        <img
                            src={photoURL}
                            alt="User picture"
                            style={{
                                display: "block",
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                            }}
                        />
                        <Grid align="center" columns="1" gap="1" p="3">
                            <Text as="p" size="6" align="left" color="black">
                                <Strong>{displayName}</Strong>
                            </Text>
                            <Text as="p" size="4" color='blue'>
                                <Strong>{usersName}</Strong>
                            </Text>
                            <Text as="p" size="4">
                                <Strong>{email}</Strong>
                            </Text>
                        </Grid>
                    </Inset>
                </Card>
            </Box>
        </div>
    );

    // Function to calculate points needed for next level
    const getPointsForNextLevel = (currentLevel) => {
        return currentLevel * 100;
    };

    // Function to calculate level and progress based on total points
    const calculateLevelAndProgress = (points) => {
        let remainingPoints = points;
        let currentLevel = 1;
        
        // Keep subtracting required points until we can't level up anymore
        while (remainingPoints >= getPointsForNextLevel(currentLevel)) {
            remainingPoints -= getPointsForNextLevel(currentLevel);
            currentLevel++;
        }
        
        // Calculate progress percentage towards next level
        const pointsNeededForNextLevel = getPointsForNextLevel(currentLevel);
        const progressPercentage = (remainingPoints / pointsNeededForNextLevel) * 100;
        
        return { 
            level: currentLevel, 
            progressPercentage: Math.min(progressPercentage, 100),
            pointsToNextLevel: pointsNeededForNextLevel,
            currentLevelPoints: remainingPoints
        };
    };

    const experienceElem = (
        <div style={{ marginTop: "10px" }}>
            <Box maxWidth="65px">
                <Card size="3">
                    <Grid align="center" columns="2" gap="1" p="3">
                        <Inset clip="padding-box" side="left" pb="current">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Yellow_Star_with_rounded_edges.svg"
                                alt="User picture"
                                style={{
                                    display: "block",
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </Inset>
                        <Inset clip="padding-box" side="left" pb="current">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Yellow_Star_with_rounded_edges.svg"
                                alt="User picture"
                                style={{
                                    display: "block",
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </Inset>
                    </Grid>
                </Card>
            </Box>
        </div>
    );

    const calculateProgress = (goals) => {
        const completedGoals = goals.filter(goal => goal.completed);
        return (completedGoals.length / goals.length) * 100;
    };

    const handleAddGoal = async () => {
        if (!newGoal.trim()) return;
        
        try {
            const docRef = await addDoc(collection(db, "goals"), {
                userId: user.email,
                goal: newGoal,
                completed: false,
                type: goalType,
                createdAt: new Date(),
                level: level // Save current level
            });
            
            const updatedGoals = [...goals, { 
                id: docRef.id, 
                goal: newGoal, 
                completed: false,
                type: goalType 
            }];
            setGoals(updatedGoals);
            
            // Update progress
            const newProgress = calculateProgress(updatedGoals);
            setProgress(newProgress);
            
            setNewGoal('');
        } catch (e) {
            console.error("Error adding goal: ", e);
        }
    };

    // Update handleToggleGoal to include monthly goals
    const handleToggleGoal = async (goalId, currentStatus) => {
        try {
            // Update in Firestore
            const goalRef = doc(db, "goals", goalId);
            await updateDoc(goalRef, {
                completed: !currentStatus
            });

            // Find the goal to get its type
            const goal = goals.find(g => g.id === goalId);
            // Monthly goals worth more than weekly goals
            const pointValue = goal.type === 'daily' ? 5 : 
                              goal.type === 'weekly' ? 10 : 
                              20; // monthly goals
            
            // Calculate new total points
            const pointChange = !currentStatus ? pointValue : -pointValue;
            const newTotalPoints = totalPoints + pointChange;
            
            // Update local state
            const updatedGoals = goals.map(goal => 
                goal.id === goalId 
                    ? { ...goal, completed: !goal.completed }
                    : goal
            );
            setGoals(updatedGoals);
            
            // Update total points and calculate new level/progress
            setTotalPoints(newTotalPoints);
            const { level: newLevel, progressPercentage } = calculateLevelAndProgress(newTotalPoints);
            setLevel(newLevel);
            setProgress(progressPercentage);
            
            // Update in Firestore
            await updateUserProgress(newTotalPoints);
        } catch (e) {
            console.error("Error updating goal: ", e);
        }
    };

    // Function to update user progress in Firestore
    const updateUserProgress = async (points) => {
        try {
            const userQuery = query(collection(db, "users"), where("email", "==", user.email));
            const userSnapshot = await getDocs(userQuery);
            
            if (!userSnapshot.empty) {
                const userDoc = userSnapshot.docs[0];
                await updateDoc(doc(db, "users", userDoc.id), {
                    totalPoints: points
                });
            } else {
                await addDoc(collection(db, "users"), {
                    email: user.email,
                    totalPoints: points
                });
            }
        } catch (e) {
            console.error("Error updating progress: ", e);
        }
    };

    // Update useEffect to load total points
    useEffect(() => {
        const loadUserData = async () => {
            try {
                // Load goals
                const goalsQuery = query(collection(db, "goals"), where("userId", "==", user.email));
                const goalsSnapshot = await getDocs(goalsQuery);
                const loadedGoals = goalsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setGoals(loadedGoals);
                
                // Load user data (total points)
                const userQuery = query(collection(db, "users"), where("email", "==", user.email));
                const userSnapshot = await getDocs(userQuery);
                if (!userSnapshot.empty) {
                    const userData = userSnapshot.docs[0].data();
                    const points = userData.totalPoints || 0;
                    setTotalPoints(points);
                    
                    // Calculate level and progress
                    const { level: loadedLevel, progressPercentage } = calculateLevelAndProgress(points);
                    setLevel(loadedLevel);
                    setProgress(progressPercentage);
                }
            } catch (e) {
                console.error("Error loading user data: ", e);
            }
        };

        loadUserData();
    }, [user.email]);

    // Update the progressionElem to show current progress
    const progressionElem = (
        <div style={{ marginTop: "30px" }}>
            <Box maxWidth="250px">
                <Card size="2">
                    <Flex direction="column" gap="2">
                        <Flex justify="between" align="center">
                            <Text size="2">Level {level}</Text>
                            <Text size="2">
                                {calculateLevelAndProgress(totalPoints).currentLevelPoints} / {calculateLevelAndProgress(totalPoints).pointsToNextLevel}
                            </Text>
                        </Flex>
                        <Progress value={progress} />
                    </Flex>
                </Card>
            </Box>
        </div>
    );

    // Update handleDeleteGoal to recalculate progress
    const handleDeleteGoal = async (goalId) => {
        try {
            await deleteDoc(doc(db, "goals", goalId));
            const updatedGoals = goals.filter(goal => goal.id !== goalId);
            setGoals(updatedGoals);
            
            // Update progress
            const newProgress = calculateProgress(updatedGoals);
            setProgress(newProgress);
        } catch (e) {
            console.error("Error deleting goal: ", e);
        }
    };

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
                    {goal.goal}
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

    // Update the goalsElem to include monthly goals
    const goalsElem = (
        <div style={{ marginTop: "5px" }}>
            <Inset clip="padding-box" side="left" pb="current">
                <Box maxWidth="250px">
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <button className="text-violet11 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none focus:shadow-black focus:outline-none">
                                Add goal
                            </button>
                        </Dialog.Trigger>

                        <Dialog.Portal>
                            <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                                <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                                    Add New Goal
                                </Dialog.Title>
                                
                                {/* Updated goal type selection */}
                                <fieldset className="mb-[15px] flex items-center gap-5 mt-4">
                                    <label className="text-violet11 w-[90px] text-right text-[15px]">
                                        Type
                                    </label>
                                    <select
                                        value={goalType}
                                        onChange={(e) => setGoalType(e.target.value)}
                                        className="text-black shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] bg-white"
                                    >
                                        <option value="daily">Daily Goal (5 pts)</option>
                                        <option value="weekly">Weekly Goal (10 pts)</option>
                                        <option value="monthly">Monthly Goal (20 pts)</option>
                                    </select>
                                </fieldset>

                                <fieldset className="mb-[15px] flex items-center gap-5">
                                    <label className="text-violet11 w-[90px] text-right text-[15px]">
                                        Goal
                                    </label>
                                    <input
                                        className="text-white shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] bg-gray-800"
                                        value={newGoal}
                                        onChange={(e) => setNewGoal(e.target.value)}
                                        placeholder="Enter your goal"
                                    />
                                </fieldset>

                                <div className="mt-[25px] flex justify-end">
                                    <Dialog.Close asChild>
                                        <button
                                            className="text-white font-bold bg-blue-500 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                                            onClick={handleAddGoal}
                                        >
                                            Add Goal
                                        </button>
                                    </Dialog.Close>
                                </div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>

                    {/* Daily Goals Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2 text-left">Daily Goals</h3>
                        <div className="space-y-2">
                            {goals
                                .filter(goal => goal.type === 'daily')
                                .map((goal, index) => (
                                    <GoalItem 
                                        key={goal.id || index}
                                        goal={goal}
                                        onToggle={handleToggleGoal}
                                        onDelete={handleDeleteGoal}
                                    />
                                ))}
                        </div>
                    </div>

                    {/* Weekly Goals Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2 text-left">Weekly Goals</h3>
                        <div className="space-y-2">
                            {goals
                                .filter(goal => goal.type === 'weekly')
                                .map((goal, index) => (
                                    <GoalItem 
                                        key={goal.id || index}
                                        goal={goal}
                                        onToggle={handleToggleGoal}
                                        onDelete={handleDeleteGoal}
                                    />
                                ))}
                        </div>
                    </div>

                    {/* Monthly Goals Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2 text-left">Monthly Goals</h3>
                        <div className="space-y-2">
                            {goals
                                .filter(goal => goal.type === 'monthly')
                                .map((goal, index) => (
                                    <GoalItem 
                                        key={goal.id || index}
                                        goal={goal}
                                        onToggle={handleToggleGoal}
                                        onDelete={handleDeleteGoal}
                                    />
                                ))}
                        </div>
                    </div>
                </Box>
            </Inset>
        </div>
    );

    const handleSubmitEditProfile = async (event) => {
        // Get data from input fields
        console.log('Name:', name);
        console.log('Username:', username);
        console.log('Email:', user.email);
        try {
            const docRef = await addDoc(collection(db, "users"), {
                email: user.email,
                name: name,
                username: username
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const editProfileBtn = (
        <div style={{ marginTop: "50px" }}>
            <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
                Edit profile
                </button>
            </Dialog.Trigger>
    
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                    Edit profile
                </Dialog.Title>
                <Dialog.Description className="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal">
                    Make changes to your profile here. Click save when you're done.
                </Dialog.Description>
                <fieldset className="mb-[15px] flex items-center gap-5">
                    <label
                    className="text-violet11 w-[90px] text-right text-[15px]"
                    htmlFor="name"
                    >
                    Name
                    </label>
                    <input
                    className="text-white shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] bg-gray-800"
                    id="name"
                    value={name} // TODO lookup name
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                    />
                </fieldset>
                <fieldset className="mb-[15px] flex items-center gap-5">
                    <label
                    className="text-violet11 w-[90px] text-right text-[15px]"
                    htmlFor="username"
                    >
                    Username
                    </label>
                    <div className="flex items-center">
                        <span className="text-white shadow-violet7 inline-flex h-[35px] items-center justify-center rounded-l-[4px] px-[10px] text-[15px] leading-none bg-gray-800">
                            @
                        </span>
                        <input
                            className="text-white shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-r-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]  bg-gray-800"
                            id="username"
                            value={username} // TODO lookup username
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                </fieldset>
                <div className="mt-[25px] flex justify-end">
                    <Dialog.Close asChild>
                    <button 
                    className="text-white font-bold bg-blue-500 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                    onClick={handleSubmitEditProfile}
                    >
                        Save changes
                    </button>
                    </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
            </Dialog.Root>
        </div>
    );

    return (
        <>
            {mainProfileElem}
            {progressionElem}
            {experienceElem}
            {goalsElem}
            {editProfileBtn}
        </>
      );
}

export default Profile;
