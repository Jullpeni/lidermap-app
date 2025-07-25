import React, { useState } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { generateFlyerImage } from '../services/geminiService';
import Spinner from './Spinner';
import ColorPicker from './ColorPicker';

const PostLabScreen: React.FC = () => {
    const { t } = useLocalization();

    // State for all flyer inputs
    const [title, setTitle] = useState('¡Gran Evento!');
    const [subtitle, setSubtitle] = useState('No te lo pierdas');
    const [backgroundColor, setBackgroundColor] = useState('#3b82f6');
    const [textColor, setTextColor] = useState('#0f172a');
    const [mainText, setMainText] = useState('Únete a nosotros para una experiencia inolvidable llena de diversión, aprendizaje y nuevas conexiones. ¡Te esperamos!');
    const [footer, setFooter] = useState('Visítanos en www.tuevento.com | 25 de Diciembre, 2025');
    const [imagePrompt, setImagePrompt] = useState('');
    
    // State for API interaction
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateImage = async () => {
        if (!imagePrompt.trim()) {
            setError(t('postlab_error_prompt_empty'));
            return;
        }
        setIsLoading(true);
        setError('');
        setGeneratedImage(null); // Clear previous image while loading

        try {
            const imageResult = await generateFlyerImage(imagePrompt);
            setGeneratedImage(imageResult);
        } catch (err) {
            setError(t('error_api'));
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const labelClass = "block mb-1 font-semibold text-slate-700";
    const darkInputStyle = "w-full p-3 bg-gray-800 text-white rounded-lg border-2 border-gray-700 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400";
    const darkTextAreaStyle = `${darkInputStyle} min-h-[120px] resize-vertical`;
    const buttonClass = "w-full mt-6 bg-blue-600 text-white p-3 rounded-lg font-semibold cursor-pointer transition hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed";

    return (
        <div className="flex flex-col md:flex-row gap-5 animate-fade-in">
            {/* Input Section */}
            <div className="flex-[2] bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('postlab_main_title')}</h2>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="flyerTitle" className={labelClass}>{t('postlab_label_title')}</label>
                        <input type="text" id="flyerTitle" value={title} onChange={e => setTitle(e.target.value)} className={darkInputStyle} />
                    </div>
                     <div>
                        <label htmlFor="flyerSubtitle" className={labelClass}>{t('postlab_label_subtitle')}</label>
                        <input type="text" id="flyerSubtitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} className={darkInputStyle} />
                    </div>
                    <ColorPicker
                        label={t('postlab_label_bg_color')}
                        color={backgroundColor}
                        onChange={setBackgroundColor}
                        inputClassName={darkInputStyle}
                    />
                    <ColorPicker
                        label={t('postlab_label_text_color')}
                        color={textColor}
                        onChange={setTextColor}
                        inputClassName={darkInputStyle}
                    />
                    <div>
                        <label htmlFor="flyerMainText" className={labelClass}>{t('postlab_label_main_text')}</label>
                        <textarea id="flyerMainText" value={mainText} onChange={e => setMainText(e.target.value)} className={darkTextAreaStyle}></textarea>
                    </div>

                    <div>
                        <label htmlFor="flyerFooter" className={labelClass}>{t('postlab_label_footer')}</label>
                        <input type="text" id="flyerFooter" value={footer} onChange={e => setFooter(e.target.value)} className={darkInputStyle} />
                    </div>

                    <div>
                        <label htmlFor="imagePrompt" className={labelClass}>{t('postlab_label_image_prompt')}</label>
                        <input type="text" id="imagePrompt" value={imagePrompt} onChange={e => setImagePrompt(e.target.value)} placeholder={t('postlab_placeholder_image_prompt')} className={darkInputStyle} />
                    </div>
                </div>

                <button id="generateImageBtn" onClick={handleGenerateImage} disabled={isLoading} className={buttonClass}>
                    {isLoading ? t('postlab_loading') : t('postlab_generate_button')}
                </button>
                {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                {isLoading && <div className="flex justify-center mt-4"><Spinner /></div>}
            </div>

            {/* Preview Section */}
            <div className="flex-1 bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{t('postlab_preview_title')}</h2>
                <div 
                    id="flyerPreview"
                    className="aspect-[3/4] w-full max-w-[600px] mx-auto border-2 border-slate-200 rounded-xl overflow-hidden flex flex-col justify-center items-center text-center p-5 relative transition-all bg-cover bg-center"
                    style={{ 
                        backgroundColor: backgroundColor,
                        backgroundImage: generatedImage ? `url(data:image/png;base64,${generatedImage})` : 'none',
                     }}
                >
                    <div className="relative z-10" style={{ color: textColor, textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)' }}>
                        <h1 className="text-4xl font-extrabold leading-tight" style={{ color: textColor }}>{title}</h1>
                        <h2 className="text-2xl font-semibold mt-2" style={{ color: textColor }}>{subtitle}</h2>
                        <p className="text-base mt-4" style={{ color: textColor }}>{mainText}</p>
                        <p className="text-sm mt-6 absolute bottom-[-1rem] left-0 right-0" style={{ color: textColor }}>{footer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostLabScreen;