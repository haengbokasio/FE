import React from 'react';

interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const BaseCard: React.FC<BaseCardProps> = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`rounded-lg shadow-md bg-white p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default BaseCard;