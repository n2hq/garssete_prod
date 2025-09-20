// app/components/NetworkErrorBoundary.tsx
import { useRouteError, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { FaWifi } from 'react-icons/fa';
import { GrNetwork } from 'react-icons/gr';


export interface NetworkError extends Error {
    status?: number;
    statusText?: string;
}

// Type guard to check if an error is a NetworkError
export function isNetworkError(error: unknown): error is NetworkError {
    return error instanceof Error && (
        error.message === 'Failed to fetch' ||
        error.name === 'NetworkError' ||
        (error as NetworkError).status === 408
    );
}

export class CustomNetworkError extends Error {
    status: number;
    statusText: string;

    constructor(message: string, status: number = 408, statusText: string = 'Network Error') {
        super(message);
        this.name = 'NetworkError';
        this.status = status;
        this.statusText = statusText;
    }
}


export function NetworkErrorBoundary() {
    const error = useRouteError();
    const navigate = useNavigate();

    // Log error for debugging
    useEffect(() => {
        console.error('Routing error:', error);
    }, [error]);

    // Check if this is a network error using our type guard
    const isNetworkError = error instanceof CustomNetworkError ||
        (error instanceof Error && error.message === 'Failed to fetch');

    if (!isNetworkError) {
        // Re-throw if it's not a network error
        throw error;
    }

    // Safe access to status properties
    const status = error instanceof CustomNetworkError ? error.status : 408;
    const message = error instanceof CustomNetworkError ? error.message : 'Network connection failed';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1100px] mx-auto w-full space-y-8 text-center flex place-items-center place-content-center font-poppins">
                <div className={`flex place-items-center place-content-center flex-col`}>
                    <FaWifi size={30} />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 font-poppins text-center">
                        {status === 408 ? 'Network Connection Lost' : 'Connection Error'}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 text-center font-poppins">
                        {message}
                    </p>
                </div>
                <div className="mt-8 space-y-4">
                    <button
                        onClick={() => navigate(0)} // Reload the current page
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Retry Connection
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Go to Homepage
                    </button>
                </div>
            </div>
        </div>
    );
}