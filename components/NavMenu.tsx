import React from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { type Page } from '../types';
import LanguageSwitcher from './LanguageSwitcher';

interface NavMenuProps {
    isOpen: boolean;
    onNavigate: (page: Page) => void;
    onClose: () => void;
    currentPage: Page;
}

const NavMenu: React.FC<NavMenuProps> = ({ isOpen, onNavigate, onClose, currentPage }) => {
    const { t } = useLocalization();

    const menuItems: { page: Page; labelKey: string; icon: string }[] = [
        { page: 'diagnostico', labelKey: 'nav_diagnostico', icon: '📊' },
        { page: 'redactor', labelKey: 'nav_redactor', icon: '✍️' },
        { page: 'consejo', labelKey: 'nav_consejo', icon: '💡' },
        { page: 'equipo', labelKey: 'nav_equipo', icon: '🚀' },
        { page: 'postlab', labelKey: 'nav_postlab', icon: '🎨' },
    ];

    if (!isOpen) return null;

    return (
        <>
            <div 
                className="fixed inset-0 bg-black/60 z-40 transition-opacity"
                onClick={onClose}
            ></div>
            <aside className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-5">
                    <h2 className="text-xl font-bold text-[#2e368f]">Lidermap</h2>
                    <nav className="mt-8">
                        <ul>
                            {menuItems.map(item => (
                                <li key={item.page}>
                                    <button
                                        onClick={() => onNavigate(item.page)}
                                        className={`w-full text-left flex items-center p-3 my-1 rounded-lg transition-colors ${currentPage === item.page ? 'bg-[#2e368f] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                                    >
                                        <span className="mr-3 text-xl">{item.icon}</span>
                                        <span className="font-semibold">{t(item.labelKey)}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                 <div className="absolute bottom-5 left-5 w-full pr-10">
                    <LanguageSwitcher />
                </div>
            </aside>
        </>
    );
};

export default NavMenu;