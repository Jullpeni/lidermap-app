
import React, { useState } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { questions, TOTAL_QUESTIONS } from '../constants/questions';
import ProgressBar from './ProgressBar';
import { type Answer } from '../types';

interface QuestionnaireScreenProps {
    answers: Answer[];
    setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
    onComplete: (answers: Answer[]) => void;
}

const answerOptions = [
    'answer_never',
    'answer_rarely',
    'answer_sometimes',
    'answer_often',
    'answer_always',
];

const QuestionnaireScreen: React.FC<QuestionnaireScreenProps> = ({ answers, setAnswers, onComplete }) => {
    const { t } = useLocalization();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleAnswerSelect = (value: number) => {
        const newAnswers = [...answers];
        newAnswers[currentIndex] = { value };
        setAnswers(newAnswers);
        // Automatically move to the next question
        setTimeout(() => {
            if (currentIndex < TOTAL_QUESTIONS - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        }, 300);
    };

    const handleNext = () => {
        if (currentIndex < TOTAL_QUESTIONS - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };
    
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleComplete = () => {
        onComplete(answers);
    };

    const isLastFive = currentIndex >= TOTAL_QUESTIONS - 5;
    const currentQuestion = questions[currentIndex];
    const currentAnswerValue = answers[currentIndex]?.value;

    return (
        <div className="flex flex-col items-center animate-fade-in p-4 bg-white/50 rounded-lg shadow-md">
            <ProgressBar current={currentIndex + 1} total={TOTAL_QUESTIONS} />
            
            <div className="w-full text-center my-8 min-h-[120px] flex items-center justify-center">
                <h3 className="text-xl md:text-2xl font-semibold text-[#2e368f]">
                    {`${currentIndex + 1}. ${t(currentQuestion.textKey)}`}
                </h3>
            </div>

            <div className="w-full space-y-3 mb-8">
                {answerOptions.map((key, index) => (
                    <button
                        key={key}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                            currentAnswerValue === index
                                ? 'bg-[#2e368f] text-white border-[#2e368f]'
                                : 'bg-white/70 border-gray-300 hover:border-[#2e368f] hover:bg-blue-50'
                        }`}
                    >
                        {t(key)}
                    </button>
                ))}
            </div>

            {isLastFive && (
                <p className="text-sm text-yellow-700 bg-yellow-100 p-2 rounded-md mb-4 text-center">
                    {t('questionnaire_last_five_warning')}
                </p>
            )}

            <div className="flex justify-between w-full">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0 || isLastFive}
                    className="bg-[#2e368f] text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {t('prev_button')}
                </button>
                
                {currentIndex === TOTAL_QUESTIONS - 1 ? (
                    <button
                        onClick={handleComplete}
                        disabled={currentAnswerValue === -1}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {t('finish_button')}
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        disabled={currentAnswerValue === -1}
                        className="bg-[#2e368f] text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {t('next_button')}
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuestionnaireScreen;
