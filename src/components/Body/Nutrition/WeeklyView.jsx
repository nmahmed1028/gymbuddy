import React from 'react';

export default function WeeklyView({ weeklyPlan, onDaySelect }) {
    return (
        <div className = "weekly-view">
            {Object.keys(weeklyPlan).map(day => (
                <div
                    key = {day}
                    className = "day"
                    onClick = {() => onDaySelect(day)}
                >
                    <h3>{day}</h3>
                    <p>Breakfast: {weeklyPlan[day].breakfast.length} items</p>
                    <p>Lunch: {weeklyPlan[day].lunch.length} items</p>
                    <p>Dinner: {weeklyPlan[day].dinner.length} items</p>
                </div>
            ))}
        </div>
    );
}
