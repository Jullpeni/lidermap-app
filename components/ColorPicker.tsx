import React from 'react';

interface ColorPickerProps {
    label: string;
    color: string;
    onChange: (value: string) => void;
    inputClassName?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange, inputClassName }) => {
    const defaultInputStyle = "w-full p-1 border border-gray-300 rounded-md text-sm";
    
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="flex items-center gap-2 mt-1">
                <input
                    type="color"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-10 h-10 p-0.5 border border-gray-300 rounded-md cursor-pointer"
                    style={{ backgroundColor: color }}
                />
                <input
                    type="text"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    className={inputClassName || defaultInputStyle}
                    maxLength={7}
                />
            </div>
        </div>
    );
};

export default ColorPicker;