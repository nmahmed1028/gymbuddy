import React, { useState } from 'react';

export default function DayDetails({ day, details, onSaveChanges }) {
    const [dayDetails, setDayDetails] = useState({
        day: details.day,
        location: details.location,
        startTime: details.startTime,
        endTime: details.endTime,
        exercises: details.exercises,
        workoutType: details.workoutType || '',
        isRestDay: details.isRestDay || false,
    });

    const handleInputChange = (field, value) => {
        setDayDetails(prevDetails => ({
            ...prevDetails, 
            [field]: value,
        }));
    };

    const handleCheckboxChange = () => {
        setDayDetails(prevDetails => ({
            ...prevDetails,
            isRestDay: !prevDetails.isRestDay,
            exercises: !prevDetails.isRestDay ? [] :prevDetails.exercises,
        }));
    }

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
            <h2>{day}</h2>
            <div className = "rest-day">
                <input
                    type = "checkbox"
                    checked = {dayDetails.isRestDay}
                    onChange = {handleCheckboxChange}
                    className = "rest-day-checkbox"
                />
                <label>Rest Day</label>
            </div>
            {!dayDetails.isRestDay && (
                <>
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
                    <div className = "time-inputs">
                        <label>
                            Time:
                            <input 
                                type = "text"
                                value = {dayDetails.startTime}
                                onChange = {(e) => handleInputChange("startTime", e.target.value)}
                                placeholder = "Start Time"
                            />
                            <span> - </span>
                            <input 
                                type = "text"
                                value = {dayDetails.endTime}
                                onChange = {(e) => handleInputChange("endTime", e.target.value)}
                                placeholder = "End Time"
                            />
                        </label>
                    </div>
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
                </>
            )}
            <button onClick = {handleAddExercise} className = "add-exercise-button">Add Exercise</button>
            <button onClick = {handleSaveChanges} className = "save-changes-button">Save Changes</button>
        </div>
    );
}