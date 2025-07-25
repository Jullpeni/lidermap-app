import React, { useState, useContext, useEffect } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { UserResultsContext } from '../context/UserResultsContext';
import { getLeadershipAdvice } from '../services/geminiService';
import Spinner from './Spinner';
import { leadershipStyles } from '../constants/leadership';
import { LeadershipStyleName } from '../types';

const ConsejoScreen: React.FC = () => {
    const { t } = useLocalization();
    const { results } = useContext(UserResultsContext);
    
    const [situation, setSituation] = useState('');
    const [selectedStyle, setSelectedStyle] = useState<LeadershipStyleName | ''>('');
    const [advice, setAdvice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Set default style if results are available
        if (results && results.scores.length > 0) {
            setSelectedStyle(results.scores[0].style);
        }
    }, [results]);

    const handleGenerate = async () => {
        if (!situation.trim() || !selectedStyle) {
            setError('Por favor, describa la situación y seleccione un estilo de liderazgo.');
            return;
        }
        setIsLoading(true);
        setError('');
        setAdvice('');
        try {
            const result = await getLeadershipAdvice(situation, selectedStyle);
            setAdvice(result);
        } catch (err) {
            setError(t('error_api'));
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const renderAdvice = () => {
        if (!advice) return null;
        return advice.split('\n').map((line, index) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                return <h4 key={index} className="text-lg font-bold text-[#2e368f] mt-4 mb-2">{line.replace(/\*\*/g, '')}</h4>;
            }
             if (line.match(/^\d\.\s/)) {
                 return <p key={index} className="ml-4 mb-1">{line}</p>;
            }
            return <p key={index} className="mb-2">{line}</p>;
        });
    };
    
    const selectedStyleInfo = leadershipStyles.find(s => s.name === selectedStyle);

    const inputStyle = "w-full p-3 bg-white text-gray-800 rounded-lg border-2 border-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-[#2e368f]";
    const buttonClass = "bg-[#2e368f] text-white font-bold rounded-full shadow-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-opacity-90 enabled:hover:scale-105 min-w-[180px] h-[52px] flex justify-center items-center";

    return (
        <div className="animate-fade-in p-4 bg-white/50 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-[#2e368f] mb-2">{t('consejo_title')}</h2>
            <p className="text-center mb-6">{t('consejo_intro')}</p>

            <div className="space-y-4">
                <textarea
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    placeholder={t('consejo_placeholder')}
                    className={`${inputStyle} min-h-[120px]`}
                    rows={5}
                />
                <div>
                     <label htmlFor="style-select" className="font-semibold text-gray-700 mb-1 block">{t('consejo_style_label')}</label>
                     <select
                        id="style-select"
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
                    <button onClick={handleGenerate} disabled={isLoading || !situation || !selectedStyle} className={buttonClass}>
                        {isLoading ? <Spinner size="sm" variant="light" /> : t('generate_button')}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                
                {advice && (
                    <div className="mt-6 animate-fade-in">
                        <h3 className="text-xl font-bold text-[#2e368f] mb-2">{t('consejo_output_title')}</h3>
                        <div className="p-4 bg-white rounded-lg border border-gray-200 min-h-[150px] whitespace-pre-wrap">
                            {renderAdvice()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsejoScreen;