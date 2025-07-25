import React, { useState, useContext, useEffect } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { UserResultsContext } from '../context/UserResultsContext';
import { getMotivationalPhrases } from '../services/geminiService';
import Spinner from './Spinner';
import { leadershipStyles } from '../constants/leadership';
import { LeadershipStyleName } from '../types';

const VamosEquipoScreen: React.FC = () => {
    const { t } = useLocalization();
    const { results } = useContext(UserResultsContext);
    
    const [keyword, setKeyword] = useState('');
    const [selectedStyle, setSelectedStyle] = useState<LeadershipStyleName | ''>('');
    const [phrases, setPhrases] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Set default style if results are available
        if (results && results.scores.length > 0) {
            setSelectedStyle(results.scores[0].style);
        }
    }, [results]);

    const handleGenerate = async () => {
        if (!keyword.trim() || !selectedStyle) {
            setError('Por favor, ingrese una palabra clave y seleccione un estilo de liderazgo.');
            return;
        }
        setIsLoading(true);
        setError('');
        setPhrases([]);
        try {
            const result = await getMotivationalPhrases(keyword, selectedStyle);
            setPhrases(result);
        } catch (err) {
            setError(t('error_api'));
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const selectedStyleInfo = leadershipStyles.find(s => s.name === selectedStyle);

    const inputStyle = "w-full p-3 bg-white text-gray-800 rounded-lg border-2 border-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-[#2e368f]";
    const buttonClass = "bg-[#2e368f] text-white font-bold rounded-full shadow-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-opacity-90 enabled:hover:scale-105 min-w-[180px] h-[52px] flex justify-center items-center";

    return (
        <div className="animate-fade-in p-4 bg-white/50 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-[#2e368f] mb-2">{t('equipo_title')}</h2>
            <p className="text-center mb-6">{t('equipo_intro')}</p>

            <div className="space-y-4">
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder={t('equipo_placeholder')}
                    className={inputStyle}
                />
                <div>
                     <label htmlFor="style-select-equipo" className="font-semibold text-gray-700 mb-1 block">{t('equipo_style_label')}</label>
                     <select
                        id="style-select-equipo"
                        value={selectedStyle}
                        onChange={(e) => setSelectedStyle(e.target.value as LeadershipStyleName)}
                        className={`${inputStyle} appearance-none w-full`}
                    >
                        <option value="" disabled>{!results ? t('consejo_select_style_default') : 'Seleccione un estilo'}</option>
                        {leadershipStyles.map(style => (
                            <option key={style.name} value={style.name}>{style.name}</option>
                        ))}
                    </select>
                </div>
                
                {selectedStyleInfo && (
                    <div className="p-3 bg-blue-50 rounded-md text-sm text-gray-700 animate-fade-in">
                        <p>{t(selectedStyleInfo.descriptionKey)}</p>
                    </div>
                )}

                 <div className="pt-2 flex justify-center">
                    <button onClick={handleGenerate} disabled={isLoading || !keyword || !selectedStyle} className={buttonClass}>
                        {isLoading ? <Spinner size="sm" variant="light" /> : t('generate_button')}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                
                {phrases.length > 0 && (
                    <div className="mt-6 animate-fade-in">
                        <h3 className="text-xl font-bold text-[#2e368f] mb-3">{t('equipo_output_title')}</h3>
                        <div className="p-4 bg-white rounded-lg border border-gray-200 space-y-3">
                            {phrases.map((phrase, index) => (
                                <p key={index} className="italic text-gray-800 border-l-4 border-[#00a9d3] pl-3">
                                    "{phrase}"
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VamosEquipoScreen;