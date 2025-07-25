
import React, { useState } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { type ScoreResult } from '../types';
import { leadershipStyles } from '../constants/leadership';

interface LeadershipResultBarProps {
    result: ScoreResult;
}

const LeadershipResultBar: React.FC<LeadershipResultBarProps> = ({ result }) => {
    const { t } = useLocalization();
    const [isExpanded, setIsExpanded] = useState(false);

    const styleInfo = leadershipStyles.find(s => s.name === result.style);

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-left font-semibold text-[#2e368f] flex items-center">
                    {result.style}
                    <svg className={`w-4 h-4 ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <span className="font-bold text-lg text-[#2e368f]">{result.score.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                    className="bg-[#2e368f] h-4 rounded-full"
                    style={{ 
                        width: `${result.score}%`,
                        background: `linear-gradient(90deg, #2e368f ${result.score-10}%, #00a9d3 100%)`
                    }}
                ></div>
            </div>
            {isExpanded && styleInfo && (
                <div className="mt-2 p-3 bg-blue-50 rounded-md text-sm text-gray-700 animate-fade-in">
                    <p>{t(styleInfo.descriptionKey)}</p>
                </div>
            )}
        </div>
    );
};

export default LeadershipResultBar;
