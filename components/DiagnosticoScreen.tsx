import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import UserInfoScreen from './UserInfoScreen';
import QuestionnaireScreen from './QuestionnaireScreen';
import ResultsScreen from './ResultsScreen';
import CtaScreen from './CtaScreen';
import { type UserData, type Answer } from '../types';
import { TOTAL_QUESTIONS } from '../constants/questions';

type Screen = 'welcome' | 'userInfo' | 'questionnaire' | 'results' | 'cta';

const DiagnosticoScreen: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [answers, setAnswers] = useState<Answer[]>(Array(TOTAL_QUESTIONS).fill({ value: -1 }));

  const handleStart = () => {
    setCurrentScreen('userInfo');
  };

  const handleUserInfoSubmit = (data: UserData) => {
    setUserData(data);
    setCurrentScreen('questionnaire');
  };

  const handleQuestionnaireComplete = (finalAnswers: Answer[]) => {
    setAnswers(finalAnswers);
    setCurrentScreen('results');
  };

  const handleResultsNext = () => {
    setCurrentScreen('cta');
  };

  const handleRestart = () => {
    setUserData(null);
    setAnswers(Array(TOTAL_QUESTIONS).fill({ value: -1 }));
    setCurrentScreen('welcome');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      case 'userInfo':
        return <UserInfoScreen onSubmit={handleUserInfoSubmit} />;
      case 'questionnaire':
        return <QuestionnaireScreen answers={answers} setAnswers={setAnswers} onComplete={handleQuestionnaireComplete} />;
      case 'results':
        if (!userData) {
          handleRestart();
          return null;
        }
        return <ResultsScreen userData={userData} answers={answers} onNext={handleResultsNext} onRestart={handleRestart} />;
      case 'cta':
        return <CtaScreen onRestart={handleRestart} />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return <div className="animate-fade-in">{renderScreen()}</div>;
};

export default DiagnosticoScreen;