// frontend/src/components/common/Card.jsx
import React from 'react';

const Card = ({ title, children, className = '', headerIcon, headerColor = 'text-bank-primary', footerText }) => {
    return (
        <div className={`panel-card ${className}`}>
            {/* Kart Başlığı */}
            {title && (
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    {headerIcon && <span className={`p-1 rounded-full ${headerColor}`}>{headerIcon}</span>}
                </div>
            )}

            {/* Kart İçeriği */}
            <div className="text-gray-700">
                {children}
            </div>

            {/* Opsiyonel Alt Bilgi */}
            {footerText && (
                <div className="mt-4 pt-3 border-t text-sm text-gray-500">
                    {footerText}
                </div>
            )}
        </div>
    );
};

// Özet Metrikler için özel bir alt bileşen
Card.Metric = ({ label, value, icon, color = 'text-bank-primary', description }) => (
    <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
        <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-xl font-bold text-gray-800">{value}</p>
            {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
        </div>
    </div>
);

export default Card;