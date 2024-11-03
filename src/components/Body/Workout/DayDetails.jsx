import React, { useState } from 'react';
import ExerciseForm from './ExerciseForm';

export default function DayDetails({ day, details, onAddExercise }) {
    const [showForm, setForm] = useState(false);

    const handleAddExercise = (exercise) => {
        onAddExercise(day, exercise);
        setForm(false);
    }

    return (
        <div className = "DayDetails">
            <h2>{day} - {details.day}</h2>
            <p>Location: {details.location}</p>
            <p>Time: {details.time}</p>

            <h3>Exercises</h3>
            <ul>
                {details.exercises.map((exercise, index) =>(
                    <li key = {index}>{exercise.name} - {exercise.weight} lbs x {exercise.reps} reps</li>
                ))}
            </ul>

            <button onClick = {() => setShowForm(!showForm)}>
                {showForm ? "Cancel": "Add Exercise"}
            </button>

            {showForm && <ExerciseForm onAddExercise = {handleAddExercise}/>}
        </div>
    );
}