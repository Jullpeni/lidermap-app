
import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'light';
}

const sizeClasses = {
    sm: 'w-6 h-6 border-[3px]',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4',
};

const variantClasses = {
    primary: 'border-gray-200 border-t-[#2e368f]',
    light: 'border-white/30 border-t-white',
};

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', variant = 'primary' }) => {
    return (
        <div className={`rounded-full animate-spin ${sizeClasses[size]} ${variantClasses[variant]}`}></div>
    );
};

export default Spinner;
