import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import { config, getUserProfile, headers } from "~/lib/lib";

export default function CompleteSignup({ guid }: any) {
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState('Loading...')
    const [userProfile, setUserProfile] = useState<any | null>(null)

    useEffect(() => {
        // Trigger animation after component mounts
        setIsVisible(true);
    }, []);

    const handleVerify = async (hash: string): Promise<any> => {
        const endpoint = `/api/user/verify_signup/${hash}`;
        const url = config.BASE_URL + endpoint;

        const data = {}; // or use an actual payload if needed

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data),
            });

            const respObj = await response.json();

            if (!response.ok) {
                // Server responded with an error status
                setLoading(`${respObj.message || "Unknown error"}`)

            }

            // Optional delay
            //await new Promise(resolve => setTimeout(resolve, 2000));
            setLoading(respObj.message)


        } catch (err: any) {
            // Network or unexpected error
            setLoading(`${err.message || "Unexpected error occurred"}`)

        }
    };

    useEffect(() => {
        const getUser = async (guid: string) => {
            const userProfile = await getUserProfile(guid)
            setUserProfile(userProfile)
        }
        if (guid) {
            getUser(guid)
        }
    }, [guid])

    useEffect(() => {
        if (userProfile !== null) {
            handleVerify(userProfile.user_hash)

            /* .then((data) => {
            console.log(data)
            //setLoading(data.data.message || data.error)
        }) */
        }
    }, [userProfile])

    return (
        <div className="min-h-screen w-screen min-w-screen bg-black/50  flex items-center justify-center p-4">
            <div className={`bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm transition-all duration-700 ease-in-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="pb-8">
                    {/* failed Icon */}
                    <div className="flex justify-center mb-6 mt-0 py-4 bg-gray-50 border-b">
                        <div className={`text-2xl font-[600] tracking-tighter font-poppins text-gray-700`}>
                            Garssete
                        </div>
                    </div>

                    {/* Success Message */}
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 ">Signup Complete!</h2>
                    <p className="text-gray-600 text-center mb-8 px-8">
                        {loading}
                    </p>

                    {/* Action Button */}
                    <div className="flex justify-center">
                        <Link
                            to="/web/signin"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Continue to Login
                        </Link>
                    </div>
                </div>

                {/* Decorative Elements */}
                {/* <div className="absolute top-0 left-0 w-full h-1 bg-gray-400"></div> */}

                {/* Security Note */}
                <div className="bg-gray-50 p-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center flex items-center justify-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                        </svg>
                        Your account security is important to us
                    </p>
                </div>
            </div>
        </div>
    );
}