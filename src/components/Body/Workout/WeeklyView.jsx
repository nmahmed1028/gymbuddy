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
                            <p>Day Category: {weeklyPlan[day].workoutType}</p>
                            <p>Location: {weeklyPlan[day].location}</p>
                            <p>Start Time: {weeklyPlan[day].startTime}</p>
                            <p>End Time: {weeklyPlan[day].endTime}</p>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
