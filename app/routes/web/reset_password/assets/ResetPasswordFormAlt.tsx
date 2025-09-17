import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useOperation } from "~/context/OperationContext";
import { useAuth } from "~/context/AuthContext";
import ResetPwSchema from "./ResetPwSchema";
import { toSentenceCase } from "~/lib/lib";
import { useNotification } from "~/context/NotificationContext";

// Define the reset password schema
const ResetPasswordSchema = z.object({
    username: z
        .string({ message: "Please enter your email or username" })
        .min(1, { message: "This field is required" })
        .email({ message: "Please enter a valid email address" }),
});

// Define the form data type
type ResetPasswordData = {
    username: string;
};

export default function ResetPasswordForm() {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const [formdata, setFormdata] = useState<any | null>(null)
    const auth = useAuth()
    if (!auth) { return null }
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()
    const navigator = useNavigate()

    const [recoverySent, setRecoverySent] = useState(false)
    const successMsg = `Please check email provided to continue.`

    const { showOperation, showError, completeOperation, showSuccess } = useOperation()


    const changeHandler = (e: any) => {
        let value = e.target.value
        let name = e.target.name
        setFormdata((previousValue: any) => {
            return (
                {
                    ...previousValue, [name]: value
                }
            )
        })
    }

    const handleResetPw = async (data: any) => {
        setWorking(true)
        //notification.notify()
        showOperation('processing')
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const email = data.username


        const datr = {
            email: email,

        }


        const res = await auth.resetpw(datr)

        if (JSON.stringify(res).includes('Error')) {
            setWorking(false)
            //notification.alertCancel('', toSentenceCase(res))
            showError('Error', toSentenceCase(res))
            completeOperation()
        } else {
            //notification.alertCancel('', toSentenceCase(res))
            showSuccess('Success', toSentenceCase(res))
            await new Promise((resolve) => setTimeout(resolve, 1000));
            completeOperation()
            setWorking(false)
            setRecoverySent(true)
        }




    }

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setError,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: ({}),
        resolver: zodResolver(ResetPwSchema)
    })



    return (
        <div className="min-h-screen w-screen min-w-screen bg-black/50 flex items-center justify-center p-4">
            <div
                className={`bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm transition-all duration-700 ease-in-out transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
            >
                <div className="pb-8">
                    {/* Brand Header */}
                    <div className="flex justify-center mb-6 mt-0 py-3 bg-gray-50 border-b">
                        <div className={`text-2xl font-[600] tracking-tighter font-poppins text-gray-700`}>
                            Reset Password
                        </div>
                    </div>

                    {/* Reset Password Form */}
                    <div className="px-8">
                        {!isSubmitted ? (
                            <>
                                <p className="text-gray-600 text-center mb-6">
                                    Enter your email address and we'll send you instructions to reset your password.
                                </p>

                                <form onSubmit={handleSubmit(handleResetPw)} className="space-y-6">
                                    {/* Email/Username Input */}
                                    <div>
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            {...register("username")}
                                            id="username"
                                            type="email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                                            placeholder="your.email@example.com"
                                            autoComplete="email"
                                        />
                                        <div className={`w-full mt-2 text-red-600 text-[11px] leading-[1.3em]`}>
                                            {errors?.username && <div>{errors.username.message}</div>}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || working}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting || working ? "Sending Instructions..." : "Send Reset Instructions"}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <div className="mb-6">
                                    <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Check Your Email</h3>
                                <p className="text-gray-600 mb-6">
                                    We've sent password reset instructions to your email address. Please check your inbox and follow the instructions to reset your password.
                                </p>
                                <button
                                    onClick={() => navigator("/web/signin")}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Return to Sign In
                                </button>
                            </div>
                        )}

                        {/* Back to Sign In Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Remember your password?{" "}
                                <Link
                                    to="/web/signin"
                                    className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Security Note */}
                {/* <div className="bg-gray-50 p-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center flex items-center justify-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                        </svg>
                        Your account security is important to us
                    </p>
                </div> */}
            </div>
        </div>
    );
}