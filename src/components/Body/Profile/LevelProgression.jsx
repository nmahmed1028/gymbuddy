import React from 'react';
import { Progress } from "@/components/ui/progress";

const LevelProgression = ({ level, totalPoints, progress }) => {
    const getPointsForNextLevel = (currentLevel) => {
        if (currentLevel >= 50) return null;
        return Math.floor(100 * (1 + (currentLevel * 0.2)));
    };

    const nextLevelPoints = getPointsForNextLevel(level);

    return (
        <div className="flex justify-between items-center w-full gap-4 px-8">
            <h2 className="text-left whitespace-nowrap">Experience Level</h2>
            <div className="flex-grow">
                <p className="text-left">Level: {level}{level >= 50 ? " (Max)" : ""}</p>
                <Progress 
                    value={progress} 
                    className="bg-gray-100 h-3 mb-1"
                    indicatorClassName="bg-orange-500"
                />
                {nextLevelPoints && (
                    <p className="text-sm text-gray-600 text-right">
                        Next Level: {nextLevelPoints} points
                    </p>
                )}
            </div>
        </div>
    );
};

export default LevelProgression; 