
import { type LeadershipStyle, LeadershipStyleName, JobRole } from '../types';

export const leadershipStyles: LeadershipStyle[] = [
    { name: LeadershipStyleName.AUTOCRATIC, descriptionKey: 'desc_autocratic' },
    { name: LeadershipStyleName.DEMOCRATIC, descriptionKey: 'desc_democratic' },
    { name: LeadershipStyleName.TRANSFORMATIONAL, descriptionKey: 'desc_transformational' },
    { name: LeadershipStyleName.TRANSACTIONAL, descriptionKey: 'desc_transactional' },
    { name: LeadershipStyleName.LAISSEZ_FAIRE, descriptionKey: 'desc_laissez_faire' },
    { name: LeadershipStyleName.BUREAUCRATIC, descriptionKey: 'desc_bureaucratic' },
    { name: LeadershipStyleName.CHARISMATIC, descriptionKey: 'desc_charismatic' },
    { name: LeadershipStyleName.NATURAL, descriptionKey: 'desc_natural' },
    { name: LeadershipStyleName.TASK_ORIENTED, descriptionKey: 'desc_task_oriented' },
    { name: LeadershipStyleName.RELATIONSHIP_ORIENTED, descriptionKey: 'desc_relationship_oriented' },
    { name: LeadershipStyleName.VISIONARY, descriptionKey: 'desc_visionary' },
];

export const jobRoleWeights: Record<JobRole, number> = {
    [JobRole.CEO]: 1.2,
    [JobRole.DIRECTOR]: 1.15,
    [JobRole.MANAGER]: 1.1,
    [JobRole.HEAD]: 1.05,
    [JobRole.SUPERVISOR]: 1.0,
    [JobRole.IN_CHARGE]: 1.0,
    [JobRole.PROJECT_MANAGER]: 1.05,
    [JobRole.TEAM_LEADER]: 1.0,
    [JobRole.FACILITATOR]: 0.95,
    [JobRole.EMPLOYEE]: 0.9,
};
