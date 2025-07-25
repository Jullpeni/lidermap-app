
import { questions } from '../constants/questions';
import { leadershipStyles, jobRoleWeights } from '../constants/leadership';
import { type Answer, type UserData, type ScoreResult, LeadershipStyleName } from '../types';

export const calculateScores = (answers: Answer[], userData: UserData): ScoreResult[] => {
    const rawScores: { [key in LeadershipStyleName]?: { total: number; count: number } } = {};

    questions.forEach((question, index) => {
        const answerValue = answers[index].value;
        if (answerValue >= 0) { // 0-4 are valid answers
            if (!rawScores[question.style]) {
                rawScores[question.style] = { total: 0, count: 0 };
            }
            rawScores[question.style]!.total += answerValue;
            rawScores[question.style]!.count += 1;
        }
    });

    const jobWeight = jobRoleWeights[userData.jobRole] || 1.0;
    
    // Age factor: slightly boosts scores for people-oriented styles for older users,
    // and task-oriented for younger users. It's a subtle effect.
    const ageFactor = (style: LeadershipStyleName) => {
        const peopleOriented = [LeadershipStyleName.DEMOCRATIC, LeadershipStyleName.RELATIONSHIP_ORIENTED, LeadershipStyleName.TRANSFORMATIONAL];
        const taskOriented = [LeadershipStyleName.AUTOCRATIC, LeadershipStyleName.TASK_ORIENTED, LeadershipStyleName.BUREAUCRATIC];
        
        if (userData.age > 40 && peopleOriented.includes(style)) return 1.05;
        if (userData.age < 30 && taskOriented.includes(style)) return 1.05;
        return 1.0;
    };

    const finalScores = leadershipStyles.map(({ name }) => {
        const scoreData = rawScores[name];
        if (!scoreData || scoreData.count === 0) {
            return { style: name, score: 0 };
        }

        const maxPossibleScore = scoreData.count * 4; // Max answer value is 4
        const basePercentage = (scoreData.total / maxPossibleScore) * 100;
        
        // Apply weights and factors
        let finalScore = basePercentage * jobWeight * ageFactor(name);
        
        // Clamp score between 1 and 100 for better presentation
        finalScore = Math.max(1, Math.min(100, finalScore));

        return { style: name, score: finalScore };
    });

    return finalScores.sort((a, b) => b.score - a.score);
};
