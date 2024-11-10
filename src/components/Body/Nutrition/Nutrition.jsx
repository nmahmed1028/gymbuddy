/*
    This component is used to display the Nutrition page.
 */
import React, { useState } from 'react';
import WeeklyView from './WeeklyView';
import DayDetails from './DayDetails';
import Modal from 'react-modal';
import './Nutrition.css'

export default function Nutrition() {
    const [weeklyPlan, setWeekly] = useState({
        Sunday: {breakfast: [], lunch: [], dinner: []},
        Monday: {breakfast: [], lunch: [], dinner: []},
        Tuesday: {breakfast: [], lunch: [], dinner: []},
        Wednesday: {breakfast: [], lunch: [], dinner: []},
        Thursday: {breakfast: [], lunch: [], dinner: []},
        Friday: {breakfast: [], lunch: [], dinner: []},
        Saturday: {breakfast: [], lunch: [], dinner: []},
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
        <div className = "nutrition">
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

