import React from 'react';
import { Progress } from "@/components/ui/progress";

const LevelProgression = ({ level, totalPoints, progress }) => {
    return (
        <div className="flex justify-between items-center w-full">
            <h2 className="text-left">Experience Level</h2>
            <div className="text-right w-full">
                <p>Level: {level}</p>
                <Progress value={progress} />
            </div>
        </div>
    );
};

export default LevelProgression; 