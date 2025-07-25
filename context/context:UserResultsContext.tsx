import React, { createContext, useState, ReactNode } from 'react';
import { type UserData, type ScoreResult } from '../types';

interface UserResults {
    scores: ScoreResult[];
    userData: UserData;
}

interface UserResultsContextType {
    results: UserResults | null;
    setResults: (results: UserResults | null) => void;
}

export const UserResultsContext = createContext<UserResultsContextType>({
    results: null,
    setResults: () => {},
});

export const UserResultsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [results, setResults] = useState<UserResults | null>(null);

    return (
        <UserResultsContext.Provider value={{ results, setResults }}>
            {children}
        </UserResultsContext.Provider>
    );
};