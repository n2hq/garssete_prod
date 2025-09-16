import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type OperationType = 'login' | 'signup' | 'update' | 'processing';

interface OperationState {
    operationType: OperationType;
    isVisible: boolean;
    progress: number;
    dots: string;
    message?: string; // Optional custom message
}

interface OperationContextType {
    operationState: OperationState;
    showOperation: (type: OperationType, customMessage?: string) => void;
    hideOperation: () => void;
    completeOperation: () => void; // For immediate completion
    updateProgress: (progress: number) => void; // For manual progress control
}

const OperationContext = createContext<OperationContextType | undefined>(undefined);

interface OperationProviderProps {
    children: ReactNode;
    defaultDuration?: number;
}

export const OperationProvider: React.FC<OperationProviderProps> = ({
    children,
    defaultDuration = 5000
}) => {
    const [operationState, setOperationState] = useState<OperationState>({
        operationType: 'processing',
        isVisible: false,
        progress: 0,
        dots: '',
        message: undefined
    });

    const [duration, setDuration] = useState<number>(defaultDuration);

    useEffect(() => {
        if (!operationState.isVisible) {
            setOperationState(prev => ({ ...prev, progress: 0, dots: '' }));
            return;
        }

        // Animate progress from 0 to 90%
        const progressInterval = setInterval(() => {
            setOperationState(prev => {
                if (prev.progress >= 90) {
                    clearInterval(progressInterval);
                    return { ...prev, progress: 90 };
                }
                return { ...prev, progress: prev.progress + 1 };
            });
        }, duration / 100);

        // Animate the dots
        const dotsInterval = setInterval(() => {
            setOperationState(prev => {
                const newDots = prev.dots.length >= 3 ? '' : prev.dots + '.';
                return { ...prev, dots: newDots };
            });
        }, 500);

        return () => {
            clearInterval(progressInterval);
            clearInterval(dotsInterval);
        };
    }, [operationState.isVisible, duration]);

    const showOperation = (type: OperationType, customMessage?: string) => {
        setOperationState({
            operationType: type,
            isVisible: true,
            progress: 0,
            dots: '',
            message: customMessage
        });
    };

    const hideOperation = () => {
        setOperationState(prev => ({ ...prev, isVisible: false }));
    };

    const completeOperation = () => {
        // Quickly complete the progress animation
        setOperationState(prev => ({ ...prev, progress: 100 }));
        setTimeout(() => {
            setOperationState(prev => ({ ...prev, isVisible: false }));
        }, 300); // Short delay to show completion
    };

    const updateProgress = (progress: number) => {
        setOperationState(prev => ({ ...prev, progress }));
    };

    const value: OperationContextType = {
        operationState,
        showOperation,
        hideOperation,
        completeOperation,
        updateProgress
    };

    return (
        <OperationContext.Provider value={value}>
            {children}
            <OperationNotification />
        </OperationContext.Provider>
    );
};

// Hook to use the operation context
export const useOperation = (): OperationContextType => {
    const context = useContext(OperationContext);
    if (context === undefined) {
        throw new Error('useOperation must be used within an OperationProvider');
    }
    return context;
};

// The notification component (now consumes the context)
const OperationNotification: React.FC = () => {
    const { operationState, hideOperation } = useOperation();
    const { operationType, isVisible, progress, dots, message } = operationState;

    const getOperationTitle = (): string => {
        switch (operationType) {
            case 'login': return 'Logging in';
            case 'signup': return 'Creating account';
            case 'update': return 'Updating information';
            default: return 'Processing';
        }
    };

    const getOperationMessage = (): string => {
        if (message) return message;

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
                    onClick={hideOperation}
                    className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

// Demo component showing how to use the context
export const OperationDemo: React.FC = () => {
    const { showOperation, completeOperation, updateProgress } = useOperation();

    const simulateLogin = () => {
        showOperation('login');

        // Simulate API call
        setTimeout(() => {
            completeOperation();
        }, 3000);
    };

    const simulateSignup = () => {
        showOperation('signup', 'Creating your profile and preferences...');

        // Simulate multi-step process with manual progress updates
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 10;
            updateProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => completeOperation(), 500);
            }
        }, 500);
    };

    const simulateUpdate = () => {
        showOperation('update');

        // Simulate long process with ability to manually complete
        setTimeout(() => {
            completeOperation();
        }, 5000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Operation Context Demo</h1>
            <p className="text-gray-600 mb-8">Using context for operation notifications</p>

            <div className="flex flex-wrap gap-4 justify-center">
                <button
                    onClick={simulateLogin}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
                >
                    Simulate Login
                </button>

                <button
                    onClick={simulateSignup}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
                >
                    Simulate Signup (Manual Progress)
                </button>

                <button
                    onClick={simulateUpdate}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
                >
                    Simulate Update
                </button>
            </div>
        </div>
    );
};

// Usage in your App component
export const AppWithOperation: React.FC = () => {
    return (
        <OperationProvider defaultDuration={4000}>
            <OperationDemo />
            {/* The rest of your app components */}
        </OperationProvider>
    );
};

export default OperationDemo;