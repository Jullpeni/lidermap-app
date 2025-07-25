
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { type ScoreResult, type UserData, type Language, LeadershipStyleName } from '../types';

// IMPORTANT FIX for blank screen issue on Vercel.
// Calling `process.env` in client-side code can cause a fatal error ("process is not defined")
// in deployment environments like Vercel, leading to a white screen.
// By setting a placeholder key directly, we ensure the app's Javascript can load without crashing.
// The AI features will show example data until a secure method for key management is implemented.
const apiKey = "AIzaSy_PLACEHOLDER_FOR_APP_LOAD";
const ai = new GoogleGenAI({ apiKey });

const isUsingPlaceholderKey = () => apiKey === "AIzaSy_PLACEHOLDER_FOR_APP_LOAD";

export const getLeadershipAnalysis = async (
    scores: ScoreResult[],
    userData: UserData
): Promise<string> => {
    
    if (isUsingPlaceholderKey()) {
        return Promise.resolve(`**Análisis de Liderazgo (Ejemplo)**
        Basado en tu perfil como ${userData.jobRole} de ${userData.age} años, muestras una fuerte inclinación hacia el liderazgo **${scores[0].style}** y **${scores[1].style}**.

        **5 Puntos de Mejora para tu Liderazgo**
        1. **Delegación Efectiva:** Practica delegar tareas de bajo riesgo para construir confianza en tu equipo.
        2. **Comunicación Activa:** Agenda reuniones 1-a-1 para escuchar las ideas y preocupaciones de tu equipo.
        3. **Desarrollo de Visión:** Dedica tiempo a definir y comunicar una visión clara y motivadora para los próximos 6 meses.
        4. **Flexibilidad:** Intenta adaptar tu estilo de liderazgo a diferentes situaciones y miembros del equipo.
        5. **Reconocimiento:** Reconoce públicamente los logros de tu equipo para fomentar la moral.

        **Recomendaciones para tu Desarrollo Personal**
        *   **Artículo Sugerido (Método PENIEL):** Busca en nuestra biblioteca un artículo sobre "Inteligencia Emocional en el Liderazgo".
        *   **Video Recomendado (Método PENIEL):** Te sugerimos ver el video "El Arte de Dar Feedback Constructivo".
        *   **Ejercicio Práctico (Método PENIEL):** Realiza el ejercicio de "Mapeo de Stakeholders" para entender mejor las necesidades de tu entorno laboral.
        `);
    }

    const topScores = [...scores].sort((a, b) => b.score - a.score).slice(0, 3);

    const prompt = `
    Eres un experto coach de liderazgo del Método PENIEL. Tu tono es profesional, alentador y directo.
    Analiza los siguientes resultados de una evaluación de liderazgo para un usuario y proporciona retroalimentación accionable en español.

    **Perfil del Usuario:**
    - Cargo: ${userData.jobRole}
    - Edad: ${userData.age}

    **Puntajes de Estilos de Liderazgo (de 100%):**
    ${scores.map(s => `- ${s.style}: ${s.score.toFixed(0)}%`).join('\n')}

    **Estilos de Liderazgo Principales (Top 3):**
    1. ${topScores[0].style}
    2. ${topScores[1].style}
    3. ${topScores[2].style}

    **Instrucciones de Respuesta:**
    Basado en este perfil, proporciona lo siguiente en **español** y con el formato exacto que se describe:
    1.  Un resumen conciso y alentador del perfil de liderazgo del usuario en un párrafo.
    2.  Un título en negrita: **5 Puntos de Mejora para tu Liderazgo**. Debajo, una lista numerada de 5 puntos de mejora específicos y accionables, adaptados a sus estilos de mayor y menor puntuación.
    3.  Un título en negrita: **Recomendaciones para tu Desarrollo Personal**. Debajo, recomienda 3 recursos específicos (un artículo, un video y un ejercicio) que se alineen con la filosofía del Método PENIEL. Enmarca estas como sugerencias exclusivas del Método PENIEL. No incluyas enlaces externos. Las recomendaciones deben ser conceptos o tipos de actividades. Por ejemplo: 'Lee un artículo sobre comunicación empática de la biblioteca del Método PENIEL', 'Mira un video del Método PENIEL sobre cómo delegar tareas eficazmente', 'Practica el ejercicio de "Escucha Activa" de un taller del Método PENIEL'.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw new Error('Failed to get analysis from AI service.');
    }
};

export const getImprovedText = async (originalText: string, targetLanguage: Language, targetLanguageName: string): Promise<string> => {
    if (isUsingPlaceholderKey()) {
        return Promise.resolve(`(Texto de ejemplo mejorado y traducido a ${targetLanguageName})\n\n${originalText}`);
    }
    const prompt = `
    Actúa como un experto en comunicación y redacción profesional.
    Tarea:
    1. Toma el siguiente texto del usuario.
    2. Mejóralo: aclara las ideas, asegúrate de que el tono sea profesional pero amigable y cercano. Corrige cualquier error gramatical u ortográfico.
    3. Traduce el texto MEJORADO al idioma: **${targetLanguageName}**. Asegúrate de que la traducción sea precisa y natural, respetando todas las normas ortográficas y gramaticales de ese idioma.
    4. Devuelve ÚNICAMENTE el texto final, mejorado y traducido, sin añadir ninguna explicación, saludo o introducción.

    Texto del usuario:
    ---
    ${originalText}
    ---
    `;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error('Error calling Gemini API for text improvement:', error);
        throw new Error('Failed to get improved text from AI service.');
    }
};

export const getLeadershipAdvice = async (situation: string, style: LeadershipStyleName): Promise<string> => {
    if (isUsingPlaceholderKey()) {
        return Promise.resolve(`**Análisis de la Situación (Ejemplo)**
        Entendiendo la situación que describes, y aplicando los principios del **${style}**, aquí hay algunas posibles soluciones:

        1. **Solución A:** Fomentar una reunión abierta para discutir el tema de manera transparente.
        2. **Solución B:** Asignar un pequeño grupo de trabajo para que propongan 2 o 3 soluciones y presentarlas al equipo.
        3. **Solución C:** Establecer métricas claras para evaluar el impacto del problema y el éxito de la solución implementada.
        `);
    }

    const prompt = `
    Eres un coach de liderazgo ejecutivo del Método PENIEL.
    Un usuario te presenta una situación laboral y el estilo de liderazgo que quiere aplicar.

    **Situación del Usuario:**
    ---
    ${situation}
    ---

    **Estilo de Liderazgo a Aplicar:** ${style}

    **Tu Tarea:**
    1. Analiza la situación desde la perspectiva del estilo de liderazgo proporcionado.
    2. Proporciona un análisis breve y luego una lista de 3 a 5 posibles soluciones profesionales, prácticas y accionables.
    3. Las soluciones deben ser coherentes con los principios del estilo de liderazgo seleccionado.
    4. Usa un tono profesional, constructivo y de apoyo.
    5. Formatea la respuesta en español, usando negritas para los títulos como "**Análisis de la Situación**" y "**Posibles Soluciones**", y una lista numerada para las soluciones. No agregues saludos ni despedidas.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error('Error calling Gemini API for leadership advice:', error);
        throw new Error('Failed to get advice from AI service.');
    }
};

export const getMotivationalPhrases = async (keyword: string, style: LeadershipStyleName): Promise<string[]> => {
    if (isUsingPlaceholderKey()) {
        return Promise.resolve([
            `Frase 1 sobre "${keyword}" con estilo ${style}.`,
            `Frase 2 sobre "${keyword}" con estilo ${style}.`,
            `Frase 3 sobre "${keyword}" con estilo ${style}.`
        ]);
    }

    const prompt = `
    Eres un experto en comunicación y liderazgo del Método PENIEL.
    Tu tarea es generar 5 frases motivadoras cortas y poderosas para un equipo de trabajo.

    **Reglas:**
    1. Las frases deben estar relacionadas con la palabra clave proporcionada.
    2. Las frases deben reflejar el tono y los principios del estilo de liderazgo seleccionado.
    3. Cada frase debe estar en una nueva línea. No numerar las frases.
    4. Responde únicamente con las 5 frases en español. Sin introducciones ni texto adicional.

    **Palabra Clave:** ${keyword.replace('#', '')}
    **Estilo de Liderazgo:** ${style}
    `;

     try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.split('\n').filter(phrase => phrase.trim() !== '');
    } catch (error) {
        console.error('Error calling Gemini API for motivational phrases:', error);
        throw new Error('Failed to get phrases from AI service.');
    }
};

export const generateFlyerImage = async (prompt: string): Promise<string> => {
     if (isUsingPlaceholderKey()) {
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 800;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#E0F2FE';
            ctx.fillRect(0, 0, 600, 800);
            ctx.fillStyle = '#1A202C';
            ctx.font = 'bold 48px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Placeholder Image', 300, 400);
            ctx.font = '24px sans-serif';
            ctx.fillText(`Prompt: ${prompt.substring(0, 30)}...`, 300, 450);
        }
        return canvas.toDataURL().split(',')[1];
    }

    const fullPrompt = `Generate a background image for a flyer. The style must be modern, minimalist, and use abstract graphic elements. The theme is: "${prompt}". The image should be suitable to have text overlaid on top of it, so it should not be too busy or contain any text itself.`;

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: fullPrompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '3:4', // Aspect ratio based on the new design
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("La API no generó ninguna imagen.");
        }

    } catch (error) {
        console.error('Error calling Imagen API:', error);
        throw new Error('Failed to generate flyer from AI service.');
    }
};