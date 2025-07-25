export type Language = 'es' | 'en' | 'fr' | 'it' | 'zh';

export type Page = 'diagnostico' | 'redactor' | 'consejo' | 'equipo' | 'postlab';

export type DownloadFormat = 'txt' | 'pdf' | 'docx' | 'rtf';

export const targetLanguages: { code: Language; name: string }[] = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'it', name: 'Italiano' },
    { code: 'zh', name: '中文 (Mandarín)' },
];

export enum JobRole {
    CEO = 'CEO (Director Ejecutivo)',
    DIRECTOR = 'Director de área',
    MANAGER = 'Gerente de área',
    HEAD = 'Jefe de departamento',
    SUPERVISOR = 'Supervisor',
    IN_CHARGE = 'Encargado',
    PROJECT_MANAGER = 'Project Manager',
    TEAM_LEADER = 'Team Leader',
    FACILITATOR = 'Facilitador',
    EMPLOYEE = 'Empleado',
}

export enum LeadershipStyleName {
    AUTOCRATIC = 'Liderazgo Autocrático',
    DEMOCRATIC = 'Liderazgo Democrático',
    TRANSFORMATIONAL = 'Liderazgo Transformacional',
    TRANSACTIONAL = 'Liderazgo Transaccional',
    LAISSEZ_FAIRE = 'Liderazgo Laissez-Faire',
    BUREAUCRATIC = 'Liderazgo Burocrático',
    CHARISMATIC = 'Liderazgo Carismático',
    NATURAL = 'Liderazgo Natural',
    TASK_ORIENTED = 'Liderazgo Orientado a las Tareas',
    RELATIONSHIP_ORIENTED = 'Liderazgo Orientado a las Relaciones',
    VISIONARY = 'Liderazgo Visionario',
}

export interface UserData {
    name: string;
    email: string;
    age: number;
    jobRole: JobRole;
}

export interface Question {
    id: number;
    textKey: string;
    style: LeadershipStyleName;
}

export interface Answer {
    value: number; // 0 (Nunca) to 4 (Siempre), -1 for unanswered
}

export interface LeadershipStyle {
    name: LeadershipStyleName;
    descriptionKey: string;
}

export interface Translations {
    [key: string]: string | { [key: string]: string };
}

export interface AllTranslations {
    es: Translations;
    en: Translations;
    fr: Translations;
    it: Translations;
    zh: Translations;
}

export interface ScoreResult {
    style: LeadershipStyleName;
    score: number;
}