/*
    This component is used to display the Workout page.
 */
import React, { useState } from 'react';
import WeeklyView from './WeeklyView';
import DayDetails from './DayDetails';
import Modal from 'react-modal';
import './Workout.css';


export default function Workout() {
    const [weeklyPlan, setWeekly] = useState({
        Sunday: {day: "", location: "", time: "", exercises: [], workoutType: ""},
        Monday: {day: "", location: "", time: "", exercises: [], workoutType: ""},
        Tuesday: {day: "", location: "", time: "", exercises: [], workoutType: ""},
        Wednesday: {day: "", location: "", time: "", exercises: [], workoutType: ""},
        Thursday: {day: "", location: "", time: "", exercises: [], workoutType: ""},
        Friday: {day: "", location: "", time: "", exercises: [], workoutType: ""},
        Saturday: {day: "", location: "", time: "", exercises: [], workoutType: ""},
    });

    const [selectedDay, setSelected] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleDaySelect = (day) => {
        setSelected(day);
        setModalOpen(true);
    }
    
    const handleModalClose = () => setModalOpen(false);

    const handleSaveChanges = (day, dayDetails) => {
        setWeekly(prevPlan => ({
            ...prevPlan,
            [day]: dayDetails
        }));
        setModalOpen(false);
    };

    return (
        <div className = "Workout">
            <WeeklyView weeklyPlan = {weeklyPlan} onDaySelect = {handleDaySelect}/>
            <Modal isOpen = {modalOpen} onRequestClose = {handleModalClose} contentLabel = "Day Details">
                {selectedDay && (
                    <DayDetails
                        day = {selectedDay}
                        details = {weeklyPlan[selectedDay]}
                        onSaveChanges = {handleSaveChanges}
                    />
                )}
                <button onClick = {handleModalClose} className = "close-button">Close</button>
            </Modal>
        </div>
    );
}

