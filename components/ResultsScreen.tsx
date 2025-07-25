import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { calculateScores } from '../services/scoringService';
import { getLeadershipAnalysis } from '../services/geminiService';
import Spinner from './Spinner';
import LeadershipResultBar from './LeadershipResultBar';
import ResultsToolbar from './ResultsToolbar';
import { type UserData, type Answer, type ScoreResult } from '../types';
import { UserResultsContext } from '../context/UserResultsContext';

interface ResultsScreenProps {
    userData: UserData;
    answers: Answer[];
    onNext: () => void;
    onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ userData, answers, onNext, onRestart }) => {
    const { t } = useLocalization();
    const { setResults } = useContext(UserResultsContext);
    const [scores, setScores] = useState<ScoreResult[]>([]);
    const [analysis, setAnalysis] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const memoizedScores = useMemo(() => calculateScores(answers, userData), [answers, userData]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setIsLoading(true);
                setError(null);
                setScores(memoizedScores);
                setResults({ scores: memoizedScores, userData }); // Guardar en el contexto global
                const aiAnalysis = await getLeadershipAnalysis(memoizedScores, userData);
                setAnalysis(aiAnalysis);
            } catch (err) {
                console.error("Error fetching results:", err);
                setError(t('error_api'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [memoizedScores, userData, t, setResults]);

    const handlePrint = () => {
        const printableElement = document.getElementById('printable-area');
        if (printableElement) {
             window.print();
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: t('results_title'),
            text: `¡He descubierto mi estilo de liderazgo con Lidermap! Descubre el tuyo también.`,
            url: window.location.href,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                alert('La función de compartir no es compatible con este navegador.');
            }
        } catch (err) {
            console.error('Error al compartir:', err);
        }
    };

    const renderAnalysis = () => {
        if (!analysis) return null;
        
        const formattedAnalysis = analysis.split('\n').map((line, index) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                return <h4 key={index} className="text-lg font-bold text-[#2e368f] mt-4 mb-2">{line.replace(/\*\*/g, '')}</h4>;
            }
            if (line.match(/^\d\.\s/)) {
                 return <p key={index} className="ml-4 mb-1">{line}</p>;
            }
            return <p key={index} className="mb-2">{line}</p>;
        });

        return <div className="prose prose-sm max-w-none">{formattedAnalysis}</div>;
    };

    if (isLoading) {
        return <div className="flex flex-col items-center justify-center p-8 bg-white/50 rounded-lg shadow-md"><Spinner /><p className="mt-4">{t('results_loading')}</p></div>;
    }

    if (error) {
        return <div className="text-center p-8 bg-white/50 rounded-lg shadow-md"><p className="text-red-500">{error}</p></div>;
    }

    return (
        <div id="printable-area" className="animate-fade-in p-4 sm:p-6 bg-white/50 rounded-lg shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#2e368f] mb-4">{t('results_title')}</h2>
            <p className="text-center mb-6">{t('results_subtitle')}</p>

            <div className="space-y-4 mb-8">
                {scores.map(result => (
                    <LeadershipResultBar key={result.style} result={result} />
                ))}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-inner mb-8">
                 <h3 className="text-xl font-bold text-[#2e368f] mb-3">{t('results_analysis_title')}</h3>
                {renderAnalysis()}
            </div>
            
            <div className="no-print">
                <ResultsToolbar
                    onSave={handlePrint}
                    onRestart={onRestart}
                    onDownload={handlePrint}
                    onNext={onNext}
                    onShare={handleShare}
                />
            </div>
        </div>
    );
};

export default ResultsScreen;