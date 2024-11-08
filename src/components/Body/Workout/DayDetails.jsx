import React, { useState } from 'react';

export default function DayDetails({ day, details, onSaveChanges }) {
    const [dayDetails, setDayDetails] = useState({
        day: details.day,
        location: details.location,
        time: details.time,
        exercises: details.exercises,
        workoutType: details.workoutType || '',
    });

    const handleInputChange = (field, value) => {
        setDayDetails(prevDetails => ({
            ...prevDetails, 
            [field]: value,
        }));
    };

    const handleExerciseChange = (index, field, value) => {
        setDayDetails(prevDetails => {
            const updatedExercises = [...prevDetails.exercises];
            updatedExercises[index] = {
                ...updatedExercises[index],
                [field]: value,
            };
            return { ...prevDetails, exercises: updatedExercises };
        });
    };
    

    const handleAddExercise = () => {
        setDayDetails(prevDetails => ({
            ...prevDetails,
            exercises: [...prevDetails.exercises, {name: '', weight: '', reps: '', sets: 0}],
        }));
    };

    const handleSaveChanges = () => {
        onSaveChanges(day, dayDetails);
    };

    return (
        <div className = "day-details">
            <h2>{day} -</h2>
            <label>
                Workout Type:
                <input
                    type = "text"
                    value = {dayDetails.workoutType}
                    onChange = {(e) => handleInputChange("workoutType", e.target.value)}
                    placeholder = "e.g., Back Day, Pull Day"
                />
            </label>
            <label>
                Location: 
                <input 
                    type = "text"
                    value = {dayDetails.location}
                    onChange = {(e) => handleInputChange("location", e.target.value)}
                />
            </label>
            <label>
                Time:
                <input 
                    type = "text"
                    value = {dayDetails.time}
                    onChange = {(e) => handleInputChange("time", e.target.value)}
                />
            </label>

            <h3>Exercises</h3>
            {dayDetails.exercises.map((exercise, index) => (
                <div key = {index} className = "exercise">
                    <input
                        type = "text"
                        placeholder = "Exercise Name"
                        value = {exercise.name}
                        onChange = {(e) => handleExerciseChange(index, "name", e.target.value)}
                    />
                    <input
                        type = "number"
                        placeholder = "Weight (lbs)"
                        value = {exercise.weight}
                        onChange = {(e) => handleExerciseChange(index, "weight", e.target.value)}
                    />
                    <input
                        type = "number"
                        placeholder = "Reps"
                        value = {exercise.reps}
                        onChange = {(e) => handleExerciseChange(index, "reps", e.target.value)}
                    />
                    <input
                        type = "number"
                        placeholder = "Sets"
                        value = {exercise.sets}
                        onChange = {(e) => handleExerciseChange(index, "sets", e.target.value)}
                    />
                </div>
            ))}
            
            <button onClick = {handleAddExercise} className = "add-exercise-button">Add Exercise</button>
            <button onClick = {handleSaveChanges} className = "save-changes-button">Save Changes</button>
        </div>
    );
}