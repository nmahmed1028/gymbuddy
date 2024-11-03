import React, { useState } from 'react';

export default function ExerciseForm({ onAddExercise }) {
    const [exercise, setExercise] = useState({name: "", weight: "", reps: ""});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExercise(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (exercise.name && exercise.weight && exercise.reps) {
            onAddExercise(exercise);
            setExercise({name: "", weight: "", reps: ""});
        }
    };

    return (
        <form onSubmit = {handleSubmit} className = "ExerciseForm">
            <input
                type = "text"
                name = "name"
                placeholder = "Exercise Name"
                value = {exercise.name}
                onChange = {handleChange}
            />
            <input
                type = "number"
                name = "reps"
                placeholder = "Weight"
                value = {exercise.weight}
                onChange = {handleChange}
            />
            <input
                type = "number"
                name = "reps"
                placeholder = "Reps"
                value = {exercise.reps}
                onChange = {handleChange}
            />
            <button type = "submit">Add Exercise</button>
        </form>
    );
}