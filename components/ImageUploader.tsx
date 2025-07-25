import React, { useState } from 'react';
import { useLocalization } from '../context/LocalizationContext';

interface ImageData {
    base64: string;
    mimeType: string;
}

interface ImageUploaderProps {
    onImagesChange: (images: ImageData[]) => void;
}

const MAX_FILES = 5;
const MIN_SIZE_KB = 100;
const MAX_SIZE_KB = 300;
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesChange }) => {
    const { t } = useLocalization();
    const [previews, setPreviews] = useState<string[]>([]);
    const [error, setError] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        const files = Array.from(event.target.files || []);

        if (files.length > MAX_FILES) {
            setError(`No puede subir más de ${MAX_FILES} imágenes.`);
            return;
        }

        const validFilesPromises = files.map(file => {
            return new Promise<{ base64: string; mimeType: string, preview: string } | null>((resolve) => {
                // Validation
                if (!ALLOWED_TYPES.includes(file.type)) {
                    return resolve(null);
                }
                const fileSizeKB = file.size / 1024;
                if (fileSizeKB < MIN_SIZE_KB || fileSizeKB > MAX_SIZE_KB) {
                    return resolve(null);
                }

                // Read file
                const reader = new FileReader();
                reader.onload = (e) => {
                    const dataUrl = e.target?.result as string;
                    const base64 = dataUrl.split(',')[1];
                    resolve({ base64, mimeType: file.type, preview: dataUrl });
                };
                reader.onerror = () => resolve(null);
                reader.readAsDataURL(file);
            });
        });
        
        Promise.all(validFilesPromises).then(results => {
            const validResults = results.filter(r => r !== null) as { base64: string; mimeType: string; preview: string }[];
            if(validResults.length !== files.length){
                setError(t('postlab_error_upload'));
            }
            setPreviews(validResults.map(r => r.preview));
            onImagesChange(validResults.map(r => ({ base64: r.base64, mimeType: r.mimeType })));
        });
    };

    return (
        <div>
            <input
                type="file"
                multiple
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2e368f] file:text-white hover:file:bg-opacity-90"
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {previews.map((src, index) => (
                        <img key={index} src={src} alt={`Preview ${index}`} className="w-full h-20 object-cover rounded-md" />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;