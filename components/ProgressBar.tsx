
import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const { t } = useLocalization();
    const percentage = (current / total) * 100;

    return (
        <div className="w-full">
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-[#2e368f]">{t('progress_text')}</span>
                <span className="text-sm font-medium text-[#2e368f]">{current} / {total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className="bg-[#2e368f] h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
