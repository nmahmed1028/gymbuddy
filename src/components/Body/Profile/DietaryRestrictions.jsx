import React from 'react';

const DietaryRestrictions = ({ dietaryRestrictions, setDietaryRestrictions, newDietaryRestriction, setNewDietaryRestriction }) => {
    const handleAddDietaryRestriction = () => {
        if (newDietaryRestriction.trim()) {
            setDietaryRestrictions([...dietaryRestrictions, newDietaryRestriction]);
            setNewDietaryRestriction('');
        }
    };

    const handleRemoveDietaryRestriction = (index) => {
        const updatedRestrictions = dietaryRestrictions.filter((_, i) => i !== index);
        setDietaryRestrictions(updatedRestrictions);
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-left">Dietary Restrictions</h3>
            <input
                value={newDietaryRestriction}
                onChange={(e) => setNewDietaryRestriction(e.target.value)}
                placeholder="Enter dietary restriction"
                className="text-white shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] bg-gray-800"
            />
            <button onClick={handleAddDietaryRestriction} className="text-white font-bold bg-blue-500 hover:bg-green5 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:outline-none">
                Add
            </button>
            <div className="space-y-2">
                {dietaryRestrictions.length > 0 ? (
                    dietaryRestrictions.map((restriction, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <p className="text-md text-gray-700">{restriction}</p>
                            <button onClick={() => handleRemoveDietaryRestriction(index)} className="text-red-500 hover:text-red-700 ml-2">X</button>
                        </div>
                    ))
                ) : (
                    <p className="text-md text-gray-500">No dietary restrictions set.</p>
                )}
            </div>
        </div>
    );
};

export default DietaryRestrictions; 