import React from 'react';

export default function WeeklyView({ weeklyPlan, onDaySelect }) {
    return (
        <div className = "weekly-view">
            {Object.keys(weeklyPlan).map(day => (
                <div key = {day} className = "day" onClick = {() => onDaySelect(day)}>
                    <h3>{day}</h3>
                    {weeklyPlan[day].isRestDay ? (
                        <p>REST DAY</p>
                    ) : (
                        <>
                            <p>Day Category: {weeklyPlan[day].workoutType || "Not Set"}</p>
                            <p>Location: {weeklyPlan[day].location}</p>
                            <p>Time: {weeklyPlan[day].time}</p>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
