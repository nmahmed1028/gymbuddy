import React from 'react';

const StateSelect = ({ state, setState }) => {
    const stateAbrv = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    
    return (
        <select value={state} className="bg-blackA6 text-white" onChange={(e) => setState(e.target.value)}>
            {stateAbrv.map((abbr) => (
                <option key={abbr} value={abbr}>{abbr}</option>
            ))}
        </select>
    );
};

export default StateSelect; 