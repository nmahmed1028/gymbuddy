import React, { useState } from 'react';

export default function DayDetails({ day, details, onSaveChanges }) {
    const [dayDetails, setDayDetails] = useState({
        day: details.day,
        breakfast: details.breakfast || [],
        lunch: details.lunch || [],
        dinner: details.dinner || [],
        snack: details.snacks || [],
    });

    const handleMealChange = (mealType, index, field, value) => {
        setDayDetails(prevDetails => {
            const updatedMeal = [...prevDetails[mealType]];
            updatedMeal[index] = {
                ...updatedMeal[index],
                [field]: value,
            };
            return { ...prevDetails, [mealType]: updatedMeal };
        });
    };
    

    const handleAddMeal = (mealType) => {
        setDayDetails((prevDetails) => ({
            ...prevDetails,
            [mealType]: [...(prevDetails[mealType] || []), {food: "", calories: ""}],
        }));
    };

    const handleSaveChanges = () => {
        onSaveChanges(day, dayDetails);
    };

    return (
        <div className = "day-details">
            <h2>{day}</h2>
            {["breakfast", "lunch", "dinner", "snack"].map(mealType =>(
                <div key = {mealType}>
                    <h4>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h4>
                    {dayDetails[mealType].map((item, index) => (
                        <div key = {index} className = {mealType}>
                            <input
                                type = "text"
                                placeholder = "Food Name"
                                value = {item.food}
                                onChange = {(e) => handleMealChange(mealType, index, "food", e.target.value)}
                            />
                            <input
                                type = "number"
                                placeholder = "Calories"
                                value = {item.calories}
                                onChange = {(e) => handleMealChange(mealType, index, "calories", e.target.value)}
                            />
                        </div>
                    ))}
                    <button onClick = {() => handleAddMeal(mealType)} className = "add-meal-button">Add Item</button>
                </div>
            ))}
            <button onClick = {handleSaveChanges} className = "save-changes-button">Save Changes</button>
        </div>
    );
}