/*
    This component is used to display the Workout page.
 */
import React, { useState } from 'react';
import WeeklyView from './WeeklyView';
import DayDetails from './DayDetails';
import Modal from 'react-modal';
import './Workout.css';


/*---WORKOUT LOG STRUCTURE---
WEEK VIEW
    Days, blank initially w/ button to add info
        button takes you to day view immediately
    Basic info for days
        Workout category
        Best weight
DAY VIEW
    Workout category
    Gym location
    Time/duration
    Exercise
        number of sets
        set info
            weight * reps
*/


export default function Workout() {
    const [weeklyPlan, setWeekly] = useState({
        Sunday: {day: "", location: "", time: "", exercises: []},
        Monday: {day: "", location: "", time: "", exercises: []},
        Tuesday: {day: "", location: "", time: "", exercises: []},
        Wednesday: {day: "", location: "", time: "", exercises: []},
        Thursday: {day: "", location: "", time: "", exercises: []},
        Friday: {day: "", location: "", time: "", exercises: []},
        Saturday: {day: "", location: "", time: "", exercises: []},
    });

    const [selectedDay, setSelected] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleDaySelect = (day) => {
        setSelected(day);
        setModalOpen(true);
    }
    
    const handleModalClose = () => setModalOpen(false);

    const handleAddExercise = (day, exercise) => {
        setWeekly(prevPlan => ({
            ...prevPlan,
            [day]: {
                ...prevPlan[day],
                exercises: [...prevPlan[day].exercises, exercise]
            }
        }));
    };

    return (
        <div className = "Workout">
            <WeeklyView weeklyPlan = {weeklyPlan} onDaySelect = {handleDaySelect}/>
            <Modal isOpen = {modalOpen} onRequestClose = {handleModalClose} contentLabel = "DayDetails">
                {selectedDay && (
                    <DayDetails
                        day = {selectedDay}
                        details = {weeklyPlan[selectedDay]}
                        onAddExercise = {handleAddExercise}
                    />
                )}
                <button onClick = {handleModalClose}>Close</button>
            </Modal>
        </div>
    );
}

