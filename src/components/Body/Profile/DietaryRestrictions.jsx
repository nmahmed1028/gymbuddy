import React, { useState } from 'react';

const DietaryRestrictions = ({ dietaryRestrictions, setDietaryRestrictions }) => {
    const [newRestriction, setNewRestriction] = useState('');

    const handleAddRestriction = () => {
        if (newRestriction.trim() === '') return;
        
        // Add the new restriction to the array
        setDietaryRestrictions([...dietaryRestrictions, newRestriction.trim()]);
        // Clear the input
        setNewRestriction('');
    };

    const handleRemoveRestriction = (indexToRemove) => {
        setDietaryRestrictions(dietaryRestrictions.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="mb-4">
            <label className="block text-black mb-2">Dietary Restrictions</label>
            <div className="flex gap-2 mb-2">
                <input
                    type="text"
                    value={newRestriction}
                    onChange={(e) => setNewRestriction(e.target.value)}
                    placeholder="Add restriction"
                    className="flex-grow p-2 border rounded text-black bg-white"
                />
                <button
                    onClick={handleAddRestriction}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add
                </button>
            </div>
            
            {/* Display current restrictions */}
            <div className="space-y-2">
                {dietaryRestrictions.map((restriction, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                        <span className="text-black">{restriction}</span>
                        <button
                            onClick={() => handleRemoveRestriction(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DietaryRestrictions; 