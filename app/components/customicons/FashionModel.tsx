import React from 'react';

const FashionModel = ({
    size = 24,
    color = 'currentColor',
    style = {},
    className = '',
    outline = false
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={outline ? 'none' : color}
            stroke={color}
            strokeWidth={outline ? '1.5' : '0'}
            className={className}
            style={style}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Elegant female figure silhouette */}
            <path d="M12 5C13.6569 5 15 3.65685 15 2C15 0.343146 13.6569 -1 12 -1C10.3431 -1 9 0.343146 9 2C9 3.65685 10.3431 5 12 5Z" />
            <path d="M8 8L7 22" />
            <path d="M16 8L17 22" />
            <path d="M12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8Z" />
            <path d="M12 8V12" />
            <path d="M10 12C10 10.3431 11.3431 9 13 9H15C16.6569 9 18 10.3431 18 12V14C18 15.6569 16.6569 17 15 17H13C11.3431 17 10 15.6569 10 14V12Z" />
        </svg>
    );
};

export default FashionModel;