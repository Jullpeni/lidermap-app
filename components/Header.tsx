import React from 'react';

interface HeaderProps {
    onMenuToggle: () => void;
    showMenuButton?: boolean;
}

const PenielLogo: React.FC<{className?: string}> = ({className}) => (
     <svg className={className} viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
        <style>
            {`.lidermap-text { font-family: Poppins, sans-serif; font-size: 24px; font-weight: 700; fill: #2e368f; }
              .peniel-text { font-family: Poppins, sans-serif; font-size: 10px; font-weight: 400; fill: #555; }`}
        </style>
        <text x="50" y="25" className="lidermap-text">Lidermap</text>
        <text x="52" y="38" className="peniel-text">de Método PENIEL</text>
    </svg>
);

const MenuIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
    </svg>
);


const Header: React.FC<HeaderProps> = ({ onMenuToggle, showMenuButton = true }) => {
    return (
        <header className="relative flex items-center justify-center h-20">
            {showMenuButton && (
                 <button
                    onClick={onMenuToggle}
                    className="absolute top-1/2 -translate-y-1/2 left-0 text-[#2e368f] p-2 rounded-full hover:bg-black/10 transition-colors"
                    aria-label="Abrir menú"
                >
                    <MenuIcon className="w-8 h-8" />
                </button>
            )}
            <div className="w-48">
                <PenielLogo />
            </div>
        </header>
    );
};

export default Header;