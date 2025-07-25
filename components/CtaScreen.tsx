
import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

interface CtaScreenProps {
    onRestart: () => void;
}

const PenielLogoSmall: React.FC<{className?: string}> = ({className}) => (
     <svg className={className} viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
        <style>
            {`.lidermap-text { font-family: Poppins, sans-serif; font-size: 24px; font-weight: 700; fill: #2e368f; }
              .peniel-text { font-family: Poppins, sans-serif; font-size: 10px; font-weight: 400; fill: #555; }`}
        </style>
        <text x="50" y="25" className="lidermap-text">Lidermap</text>
        <text x="52" y="38" className="peniel-text">de Método PENIEL</text>
    </svg>
);


const CtaScreen: React.FC<CtaScreenProps> = ({ onRestart }) => {
    const { t } = useLocalization();

    return (
        <div className="relative flex flex-col items-center justify-center text-center p-4 min-h-[calc(100vh-150px)] animate-fade-in bg-white/50 rounded-lg shadow-md">
            <div className="max-w-md">
                <h2 className="text-2xl font-bold text-[#2e368f] mb-4">{t('cta_title')}</h2>
                <p className="mb-8 text-gray-700 leading-relaxed">
                    {t('cta_text')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="https://linktr.ee/MetodoPeniel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
                    >
                        {t('cta_button_improve')}
                    </a>
                    <button
                        onClick={onRestart}
                        className="bg-[#2e368f] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
                    >
                        {t('cta_button_restart')}
                    </button>
                </div>
            </div>
            <div className="absolute bottom-4 right-4 w-32">
                <PenielLogoSmall />
            </div>
        </div>
    );
};

export default CtaScreen;
