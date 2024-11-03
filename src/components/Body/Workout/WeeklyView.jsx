import React from 'react';
import './WeeklyView.css'

export default function WeeklyView({ weeklyPlan, onDaySelect }) {
    return (
        <div className = "WeeklyView">
            {Object.keys(weeklyPlan).map((day) => (
                <div key = {day} onClick = {() => onDaySelect(day)} className = "DaySummary">
                    <h3>{day}</h3>
                    <p>{weeklyPlan[day].day}</p>
                </div>
            ))}
        </div>
    );
}
