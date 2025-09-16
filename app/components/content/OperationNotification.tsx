import React, { useState, useEffect } from 'react';

type OperationType = 'login' | 'signup' | 'update' | 'processing';

interface OperationNotificationProps {
    operationType: OperationType;
    isVisible: boolean;
    onClose: () => void;
    duration?: number; // Optional duration in milliseconds
}

export const OperationNotification: React.FC<OperationNotificationProps> = ({
    operationType,
    isVisible,
    onClose,
    duration = 5000
}) => {
    const [progress, setProgress] = useState<number>(0);
    const [dots, setDots] = useState<string>('');

    useEffect(() => {
        if (!isVisible) {
            setProgress(0);
            setDots('');
            return;
        }

        // Animate progress from 0 to 90% (we'll leave 10% for final completion)
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + 1;
            });
        }, duration / 100);

        // Animate the dots
        const dotsInterval = setInterval(() => {
            setDots(prev => {
                if (prev.length >= 3) return '';
                return prev + '.';
            });
        }, 500);

        return () => {
            clearInterval(progressInterval);
            clearInterval(dotsInterval);
        };
    }, [isVisible, duration]);

    const getOperationTitle = (): string => {
        switch (operationType) {
            case 'login': return 'Logging in';
            case 'signup': return 'Creating account';
            case 'update': return 'Updating information';
            default: return 'Processing';
        }
    };

    const getOperationMessage = (): string => {
        switch (operationType) {
            case 'login': return 'Please wait while we authenticate your account';
            case 'signup': return 'Setting up your new account, this will just take a moment';
            case 'update': return 'Applying your changes, please don\'t close this window';
            default: return 'Your request is being processed';
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-80 animate-fade-in">
                {/* Header with icon */}
                <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-3">
                        <svg className="w-6 h-6 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{getOperationTitle()}{dots}</h3>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Message */}
                <p className="text-gray-600 text-sm mb-4">{getOperationMessage()}</p>

                {/* Animated loader */}
                <div className="flex justify-center">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>

                {/* Cancel button (optional) */}
                <button
                    onClick={onClose}
                    className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

// Demo component to show how to use the notification
const NotificationDemo: React.FC = () => {
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [operationType, setOperationType] = useState<OperationType>('login');

    const simulateOperation = (type: OperationType) => {
        setOperationType(type);
        setShowNotification(true);

        // Simulate a long-running operation
        setTimeout(() => {
            setShowNotification(false);
        }, 5000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Operation Notifications</h1>
            <p className="text-gray-600 mb-8">Beautiful notifications for long-running operations</p>

            <div className="flex flex-wrap gap-4 justify-center">
                <button
                    onClick={() => simulateOperation('login')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
                >
                    Simulate Login
                </button>

                <button
                    onClick={() => simulateOperation('signup')}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
                >
                    Simulate Signup
                </button>

                <button
                    onClick={() => simulateOperation('update')}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
                >
                    Simulate Update
                </button>
            </div>

            <OperationNotification
                operationType={operationType}
                isVisible={showNotification}
                onClose={() => setShowNotification(false)}
            />

            <div className="mt-12 bg-white p-6 rounded-xl shadow-md max-w-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Features</h2>
                <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Smooth progress indicator
                    </li>
                    <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Contextual messages for each operation
                    </li>
                    <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Elegant animations and transitions
                    </li>
                    <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Option to cancel operation
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NotificationDemo;