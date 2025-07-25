
import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

interface WelcomeScreenProps {
    onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
    const { t } = useLocalization();

    return (
        <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-200px)]">
            <div className="mb-8 text-center">
                 <h1 className="text-5xl font-bold text-[#2e368f] tracking-tight">Lidermap</h1>
                 <p className="text-xl text-gray-600">de Método PENIEL</p>
            </div>

            <div className="mb-12 max-w-md px-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                    {t('welcome_description')}
                </p>
            </div>

            <button
                onClick={onStart}
                className="bg-[#2e368f] text-white font-bold py-3 px-12 rounded-full shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
            >
                {t('start_button')}
            </button>
        </div>
    );
};

export default WelcomeScreen;
