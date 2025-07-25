import React, { useState } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { getImprovedText } from '../services/geminiService';
import Spinner from './Spinner';
import { type Language, type DownloadFormat, targetLanguages } from '../types';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const RedactorScreen: React.FC = () => {
    const { t } = useLocalization();
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [targetLang, setTargetLang] = useState<Language>('es');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!inputText.trim()) {
            setError('Por favor, ingrese un texto para mejorar.');
            return;
        }
        setIsLoading(true);
        setError('');
        setOutputText('');
        try {
            const selectedLanguage = targetLanguages.find(l => l.code === targetLang)
            const result = await getImprovedText(inputText, targetLang, selectedLanguage?.name || 'Español');
            setOutputText(result);
        } catch (err) {
            setError(t('error_api'));
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = async (format: DownloadFormat) => {
        if (!outputText) return;
        const filename = `Lidermap_Texto_Mejorado.${format}`;

        if (format === 'txt') {
            const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
            saveAs(blob, filename);
        } else if (format === 'pdf') {
            const doc = new jsPDF();
            // jsPDF has issues with non-ASCII chars without custom fonts.
            // This is a basic implementation. For full char support, need to embed fonts.
            const lines = doc.splitTextToSize(outputText, 180);
            doc.text(lines, 10, 10);
            doc.save(filename);
        } else if (format === 'docx') {
             const doc = new Document({
                sections: [{
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [new TextRun(outputText)],
                        }),
                    ],
                }],
            });
            const blob = await Packer.toBlob(doc);
            saveAs(blob, filename);
        } else if (format === 'rtf') {
            const rtfContent = `{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Arial;}}
\\fs24 ${outputText.replace(/\n/g, '\\par ')}}`;
            const blob = new Blob([rtfContent], { type: 'application/rtf;charset=utf-8' });
            saveAs(blob, filename);
        }
    };

    const inputStyle = "w-full p-3 bg-white text-gray-800 rounded-lg border-2 border-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-[#2e368f]";
    const buttonClass = "bg-[#2e368f] text-white font-bold rounded-full shadow-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-opacity-90 enabled:hover:scale-105 min-w-[180px] h-[52px] flex justify-center items-center";

    return (
        <div className="animate-fade-in p-4 bg-white/50 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-[#2e368f] mb-2">{t('redactor_title')}</h2>
            <p className="text-center mb-6">{t('redactor_intro')}</p>

            <div className="space-y-4">
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t('redactor_placeholder')}
                    className={`${inputStyle} min-h-[150px]`}
                    rows={6}
                />
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                     <label htmlFor="target-lang" className="font-semibold text-gray-700 whitespace-nowrap">{t('redactor_translate_label')}</label>
                     <select
                        id="target-lang"
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value as Language)}
                        className={`${inputStyle} appearance-none w-full`}
                    >
                        {targetLanguages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>
                </div>
                 <div className="flex justify-center">
                    <button onClick={handleGenerate} disabled={isLoading} className={buttonClass}>
                        {isLoading ? <Spinner size="sm" variant="light" /> : t('generate_button')}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                
                {outputText && (
                    <div className="mt-6 animate-fade-in">
                        <h3 className="text-xl font-bold text-[#2e368f] mb-2">{t('redactor_output_title')}</h3>
                        <div className="p-4 bg-white rounded-lg border border-gray-200 min-h-[150px] whitespace-pre-wrap">
                            {outputText}
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row gap-2 items-center justify-center">
                            <span className="font-semibold">{t('download_button')}:</span>
                             <button onClick={() => handleDownload('txt')} className="text-sm bg-gray-600 text-white py-1 px-3 rounded-md hover:bg-gray-700">TXT</button>
                             <button onClick={() => handleDownload('pdf')} className="text-sm bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700">PDF</button>
                             <button onClick={() => handleDownload('docx')} className="text-sm bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700">DOCX</button>
                             <button onClick={() => handleDownload('rtf')} className="text-sm bg-orange-600 text-white py-1 px-3 rounded-md hover:bg-orange-700">RTF</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RedactorScreen;