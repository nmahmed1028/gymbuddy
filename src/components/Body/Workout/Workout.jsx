/*
    This component is used to display the Workout page.
 */
import WeeklyView from './WeeklyView';
import DayDetails from './DayDetails';
import Modal from 'react-modal';
import './Workout.css';
import MessageBubble from '../../ui/MessageBubble';
import React, { useState, useEffect, useRef } from "react";
import { model } from "./../../../firebase";
import ChatWidget from "../../Footer/ChatWidget";

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
    const [motivationM, setMotivation] = useState("You're doing great! Keep up the good work!");

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

    const handleSend = async () => {
        const prompt = "You are Gemini, the friendly and encouraging AI assistant " + 
        "within the GymBuddy fitness app. Your role is to act like a supportive friend " + 
        "to users, focusing strictly on health and fitness topics. Help them with workout " + 
        "planning and logging, offer meal planning advice, assist with meal logging, and " + 
        "encourage them to engage with the app's social media features to build a supportive " + 
        "community. Always communicate in a warm and approachable manner, offering motivation and " + 
        "positivity to keep users engaged in their fitness journey. Do not use bold text, " + 
        "italics, special paragraph formatting, or bullet points in your responses. Your " + 
        "goal is to make working out fun and accessible for everyone, providing helpful " + 
        "advice and encouragement strictly within the realm of health and fitness. " +
        "This is the workout page, where users can view their weekly workout plan and " +
        "make changes to it as needed. Users can click on a day to view and edit the " +
        "details of that day's workout, including the location, time, exercises, and " +
        "workout type. Users can also view a motivational message at the bottom of the " +
        "page to help keep them motivated and on track with their fitness goals. " +
        "Please provide a motivational message to display at the bottom of the page. ";
        let motivation = "You're doing great! Keep up the good work!";
        try{
            await model.generateContent(prompt)
            .then((result) => {
                motivation = result.response.text();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        }
        catch (error) {
            console.error("Error:", error);
        }

        return motivation;
    }

    useEffect(() => {
        // Fetch motivation message when component mounts
        const fetchMotivation = async () => {
            const message = await handleSend();
            setMotivation(message);
        };
        fetchMotivation();
    }, []);

    return (
        <div className = "Workout">
            <WeeklyView weeklyPlan = {weeklyPlan} onDaySelect = {handleDaySelect}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
                <Modal isOpen={modalOpen} onRequestClose={handleModalClose} contentLabel="Day Details" style={{ zIndex: 20 }}>
                    {selectedDay && (
                        <DayDetails
                            day={selectedDay}
                            details={weeklyPlan[selectedDay]}
                            onSaveChanges={handleSaveChanges}
                        />
                    )}
                    <button onClick={handleModalClose} className="close-button">Close</button>
                </Modal>
                <ChatWidget isOpen={modalOpen} isPermanent={modalOpen} style={{ zIndex: 20 }} />
            </div>
            <MessageBubble message={motivationM} />
        </div>
    );
}

