import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "@remix-run/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useOperation } from "~/context/OperationContext";
import { useAuth } from "~/context/AuthContext";
import { ResetPasswordNewType } from "~/lib/types";
import { useNotification } from "~/context/NotificationContext";
import { headers } from "~/lib/lib";
import ResetPasswordSchema from "./ResetPasswordSchema";



// Define the form data type
type ResetPasswordData = {
    password: string;
    password2: string;
};

export default function ResetPasswordFormAlt({ guid }: any) {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formdata, setFormdata] = useState<any | null>(null)
    const auth = useAuth()
    if (!auth) { return null }
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()
    const navigator = useNavigate()
    const [successful, setSuccessful] = useState(false)

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

    const handleResetPassword = async (data: any) => {
        setWorking(true)
        //notification.notify('', 'Working...')
        showOperation('processing')
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const password = data.password


        const datr = {
            password: password
        }

        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = `/api/user/reset_password/${guid}`
        const url = BASE_URL + endpoint

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                let error = response.json().then((data) => {
                    //notification.alertCancel('Error!', data.message)
                    showError('Error', data.message)
                    completeOperation()
                })

            } else {
                //notification.alertCancel('Success!', 'Password Successfully Changed! Use new password on next login')
                reset()
                setSuccessful(true)
                setIsSubmitted(true)
                showSuccess('Success', 'Password changed.')
                completeOperation()
            }

        } catch (error: any) {
            showError('Error', error.message)
            completeOperation()
            return undefined
        } finally {
            setWorking(false)
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setWorking(false)
    }

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setError,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<ResetPasswordNewType>({
        defaultValues: ({}),
        resolver: zodResolver(ResetPasswordSchema)
    })

    return (
        <div className="min-h-screen w-screen min-w-screen bg-black/50 flex items-center justify-center p-4">
            <div
                className={`bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm transition-all duration-700 ease-in-out transform ${isVisible ? "translate-y-10 opacity-0" : " translate-y-0 opacity-100"
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
                                    Please enter your new password below.
                                </p>

                                <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-6">
                                    {/* Password Input */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                {...register("password")}
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 pr-10"
                                                placeholder="Enter your new password"
                                                autoComplete="new-password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        <div className={`w-full mt-2 text-red-600 text-[11px] leading-[1.3em]`}>
                                            {errors?.password && <div>{errors.password.message}</div>}
                                        </div>
                                    </div>

                                    {/* Confirm Password Input */}
                                    <div>
                                        <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                {...register("password2")}
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 pr-10"
                                                placeholder="Confirm your new password"
                                                autoComplete="new-password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        <div className={`w-full mt-2 text-red-600 text-[11px] leading-[1.3em]`}>
                                            {errors?.password2 && <div>{errors.password2.message}</div>}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || working}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting || working ? "Resetting Password..." : "Reset Password"}
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
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Password Reset Successful</h3>
                                <p className="text-gray-600 mb-6">
                                    Your password has been reset successfully. You can now sign in with your new password.
                                </p>
                                <button
                                    onClick={() => navigator("/web/signin")}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign In Now
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