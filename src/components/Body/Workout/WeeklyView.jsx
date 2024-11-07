import React from 'react';
import './WeeklyView.css'

export default function WeeklyView({ weeklyPlan, onDaySelect }) {
    return (
        <div className = "WeeklyView">
            {Object.keys(weeklyPlan).map((day) => (
                <div key = {day} className = "DayCard" onClick = {() => onDaySelect(day)}>
                    <h3>{day}</h3>
                    <p>{weeklyPlan[day].day}</p>
                    <p>Location: {weeklyPlan[day].location}</p>
                    <p>Time: {weeklyPlan[day].time}</p>
                    <ul>
                        {weeklyPlan[day].exercises.map((exercise, index) => (
                            <li key = {index}>
                                {exercise.name}: {exercise.weight} lbs x {exercise.reps} reps
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
