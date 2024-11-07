import React, { useState } from 'react';

export default function DayDetails({ day, details, onAddExercise }) {
    const [exerciseName, setExerciseName] = useState('');
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');

    const AddExercise = () => {
        /*if (exerciseName && weight && reps) {
            onAddExercise({ name: exerciseName, weight, reps});
            setExerciseName('');
            setWeight('');
            setReps('');
        }*/
        const newExercise = { name: exerciseName, weight, reps};
        onAddExercise({day, newExercise});
        setExerciseName('');
        setWeight('');
        setReps('');
    };

    return (
        <div className = "DayDetails">
            <h2>{day} - {details.day}</h2>
            {/*<h3>{details.day} Day</h3>*/}
            <p>Location: {details.location}</p>
            <p>Time: {details.time}</p>

            <h4>Exercises</h4>
            {details.exercises.map((ex, index) => (
                <p key = {index}>{ex.name}: {ex.weight} lbs x {ex.reps} reps</p>
            ))}
            <div className = "AddExercise">
                <input
                    type = "text"
                    placeholder = "Exercise Name"
                    value = {exerciseName}
                    onChange = {(e) => setExerciseName(e.target.value)}
                />
                <input
                    type = "text"
                    placeholder = "Weight (lbs)"
                    value = {weight}
                    onChange = {(e) => setWeight(e.target.value)}
                />
                <input
                    type = "number"
                    placeholder = "Reps"
                    value = {reps}
                    onChange = {(e) => setReps(e.target.value)}
                />
                <button onClick = {AddExercise}>Add Exercise</button>
            </div>
        </div>
    );
}