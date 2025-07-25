
import React from 'react';

const IconSave = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
        <polyline points="17 21 17 13 7 13 7 21"></polyline>
        <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
);

const IconEdit = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);

const IconDownload = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

const IconRocket = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 11.5L11 5l7 7-7 7-6.5-6.5z"></path>
        <path d="M22 22l-1.5-1.5"></path>
        <path d="M13 6.5l6-6"></path>
    </svg>
);

const IconShare = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
);

interface ResultsToolbarProps {
    onSave: () => void;
    onRestart: () => void;
    onDownload: () => void;
    onNext: () => void;
    onShare: () => void;
}

const Tooltip: React.FC<{text: string, children: React.ReactNode}> = ({text, children}) => (
    <div className="relative flex flex-col items-center group">
        {children}
        <div className="absolute bottom-full flex-col items-center hidden mb-2 group-hover:flex">
            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded-md">{text}</span>
            <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
        </div>
    </div>
)

const ResultsToolbar: React.FC<ResultsToolbarProps> = ({ onSave, onRestart, onDownload, onNext, onShare }) => {
    const buttonClass = "p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white";

    return (
        <div className="bg-[#212121] rounded-lg p-2 shadow-lg">
            <div className="flex justify-around items-center text-gray-300">
                <Tooltip text="Guardar como PDF">
                    <button onClick={onSave} className={buttonClass} aria-label="Guardar resultados como PDF">
                        <IconSave />
                    </button>
                </Tooltip>
                <Tooltip text="Reiniciar cuestionario">
                    <button onClick={onRestart} className={buttonClass} aria-label="Reiniciar cuestionario">
                        <IconEdit />
                    </button>
                </Tooltip>
                <Tooltip text="Descargar PDF">
                    <button onClick={onDownload} className={buttonClass} aria-label="Descargar resultados en PDF">
                        <IconDownload />
                    </button>
                </Tooltip>
                <Tooltip text="Siguiente paso">
                     <button onClick={onNext} className={buttonClass} aria-label="Ir al siguiente paso">
                        <IconRocket />
                    </button>
                </Tooltip>
                <Tooltip text="Compartir resultados">
                    <button onClick={onShare} className={buttonClass} aria-label="Compartir resultados">
                        <IconShare />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default ResultsToolbar;
