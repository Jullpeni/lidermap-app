
import React, { useState, useMemo } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { type UserData, JobRole } from '../types';
import Spinner from './Spinner';

interface UserInfoScreenProps {
    onSubmit: (data: UserData) => void;
}

// INSTRUCCIÓN: Reemplace la siguiente URL con la URL de su aplicación web de Google Apps Script.
// 1. Abra su proyecto de Apps Script.
// 2. Haga clic en "Implementar" > "Nueva implementación".
// 3. Seleccione "Aplicación web" como tipo.
// 4. En "Quién tiene acceso", elija "Cualquier usuario".
// 5. Haga clic en "Implementar" y copie la URL de la aplicación web aquí.
const APPS_SCRIPT_URL = 'URL_DE_TU_WEB_APP_DE_APPS_SCRIPT_AQUI';


const UserInfoScreen: React.FC<UserInfoScreenProps> = ({ onSubmit }) => {
    const { t } = useLocalization();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [jobRole, setJobRole] = useState<JobRole | ''>('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isFormValid = useMemo(() => {
        return name.trim() !== '' && email.includes('@') && Number(age) >= 18 && jobRole !== '';
    }, [name, email, age, jobRole]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || isLoading) {
            setError(t('error_fill_all_fields'));
            return;
        }
        setIsLoading(true);
        setError('');

        const userDataPayload = { name, email, age, jobRole };

        // 1. Promesa para enviar datos al Formulario de Google (que llena Google Sheets)
        const formId = "1FAIpQLSdz5ggAfyuGD5J_NVMCO8VuG_KhExJ3tJGSA7M6eGa4fu3MvA";
        const formUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
        const formData = new FormData();
        formData.append('entry.182042127', name);
        formData.append('entry.1895692097', email);
        formData.append('entry.1503930438', age);
        formData.append('entry.60424510', jobRole);
        
        const googleFormPromise = fetch(formUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });

        // 2. Promesa para enviar datos a Google Apps Script
        const appsScriptPromise = (APPS_SCRIPT_URL && APPS_SCRIPT_URL !== 'URL_DE_TU_WEB_APP_DE_APPS_SCRIPT_AQUI')
            ? fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(userDataPayload),
                headers: { 'Content-Type': 'application/json' },
                mode: 'no-cors', // Apps Script web apps often need no-cors when called from client-side
              })
            : Promise.resolve(); // No hacer nada si la URL no está configurada

        // Ejecutar ambas promesas en paralelo y continuar sin importar el resultado
        try {
            const results = await Promise.allSettled([googleFormPromise, appsScriptPromise]);
            results.forEach((result, index) => {
                const destination = index === 0 ? "Google Form" : "Google Apps Script";
                if (result.status === 'fulfilled') {
                    console.log(`Datos enviados exitosamente a ${destination}.`);
                } else {
                    console.error(`No se pudieron enviar los datos a ${destination}.`, result.reason);
                }
            });
        } catch (err) {
            // Este bloque es una salvaguarda, pero es poco probable con allSettled
            console.error('Ocurrió un error inesperado durante los envíos.', err);
        }

        // Continuar con el flujo de la aplicación
        onSubmit({
            name,
            email,
            age: Number(age),
            jobRole: jobRole as JobRole,
        });
    };

    const inputStyle = "w-full p-3 bg-zinc-700 text-white rounded-lg border-2 border-transparent placeholder:text-zinc-400 focus:outline-none focus:border-[#00a9d3]";

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-center text-[#2e368f] mb-4">{t('user_info_title')}</h2>
            <p className="text-center mb-6">{t('user_info_intro')}</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('user_info_name_placeholder')}
                    className={inputStyle}
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('user_info_email_placeholder')}
                    className={inputStyle}
                />
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder={t('user_info_age_placeholder')}
                    min="18"
                    className={inputStyle}
                />
                <div className="relative">
                    <select
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value as JobRole)}
                        className={`${inputStyle} appearance-none w-full ${!jobRole ? 'text-zinc-400' : 'text-white'}`}
                    >
                        <option value="" disabled>{t('user_info_role_placeholder')}</option>
                        {Object.values(JobRole).map(role => (
                            <option key={role} value={role} className="text-black bg-white">{role}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                           <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                
                <div className="pt-4 flex justify-center">
                    <button
                        type="submit"
                        disabled={!isFormValid || isLoading}
                        className="bg-[#2e368f] text-white font-bold rounded-full shadow-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-opacity-90 enabled:hover:scale-105 min-w-[180px] h-[52px] flex justify-center items-center"
                    >
                        {isLoading ? <Spinner size="sm" variant="light" /> : <span>{t('next_button')}</span>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserInfoScreen;
