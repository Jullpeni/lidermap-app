import React, { useState } from 'react';
import Header from './components/Header';
import NavMenu from './components/NavMenu';
import DiagnosticoScreen from './components/DiagnosticoScreen';
import RedactorScreen from './components/RedactorScreen';
import ConsejoScreen from './components/ConsejoScreen';
import VamosEquipoScreen from './components/VamosEquipoScreen';
import PostLabScreen from './components/PostLabScreen';
import { type Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('diagnostico');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const renderScreen = () => {
    switch (currentPage) {
      case 'diagnostico':
        return <DiagnosticoScreen />;
      case 'redactor':
        return <RedactorScreen />;
      case 'consejo':
        return <ConsejoScreen />;
      case 'equipo':
        return <VamosEquipoScreen />;
      case 'postlab':
        return <PostLabScreen />;
      default:
        return <DiagnosticoScreen />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#00a9d3] to-white min-h-screen w-full text-gray-800">
      <div className="container mx-auto max-w-7xl p-4 relative">
        <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
        <NavMenu isOpen={isMenuOpen} onNavigate={navigateTo} onClose={() => setIsMenuOpen(false)} currentPage={currentPage} />
        <main className="mt-8">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
};

export default App;