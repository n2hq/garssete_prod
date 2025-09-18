import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useOperation } from "~/context/OperationContext";
import { useAuth } from "~/context/AuthContext";
import { IAddUser } from "~/lib/types";
import { useNotification } from "~/context/NotificationContext";
import { headers } from "~/lib/lib";
import SignupSchema from "./SignupSchema";


// Define the form data type
type SignupData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function SignupFormAlt() {
    const [isVisible, setIsVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false)

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState(false)
    const notification = useNotification()
    const navigate = useNavigate()
    const [signedup, setSignedup] = useState(false)
    const successMsg = `Signup is successful! Please check email provided to complete signup.`

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

    const handleSignup = async (data: any) => {
        setWorking(true)
        //notification.notify("", "")
        showOperation('processing')
        await new Promise((resolve) => setTimeout(resolve, 1000));


        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = "/api/user"
        const url = BASE_URL + endpoint



        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })



            if (!response.ok) {
                var respObj = await response.json()
                throw new Error(`${respObj.message || respObj.error}`)
            } else {
                {/** signup is successful */ }
                //notification.alertCancel('', successMsg)
                showSuccess('Success', successMsg)
                completeOperation()
                //navigate("/signup/code")
                setIsCompleted(true)
                setSignedup(true)
            }
        } catch (e: any) {

            //notification.alertCancel('', e.message)
            showError('Error', e.message)
            completeOperation()
            return undefined
        } finally {
            setWorking(false)
        }
    }

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<IAddUser>({
        defaultValues: ({}),
        resolver: zodResolver(SignupSchema)
    })

    return (
        <div className="min-h-screen w-screen min-w-screen bg-black/50 flex items-center justify-center p-4">
            <div
                className={`bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm transition-all duration-700 ease-in-out transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
            >
                <div className="pb-8">
                    {/* Brand Header */}
                    <div className="flex justify-center mb-6 mt-0 py-2 bg-gray-50 border-b">
                        <div className={`text-2xl font-[600] tracking-tighter font-poppins text-gray-700`}>
                            Sign up<i>!</i>
                        </div>
                    </div>

                    {/* Signup Form */}
                    <div className="px-8">
                        {
                            !isCompleted ? (<form onSubmit={handleSubmit(handleSignup)} className="space-y-3">
                                {/* Name Fields */}
                                <div className="">
                                    {/* First Name Input */}
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name
                                        </label>
                                        <input
                                            {...register('first_name', {
                                                onChange: changeHandler
                                            })}
                                            id="firstName"
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                                            placeholder="John"
                                        />
                                        <div className={`w-full mt-2 text-red-600 text-[11px] leading-[1.3em]`}>
                                            {errors?.first_name && <div>{errors.first_name.message}</div>}
                                        </div>
                                    </div>


                                </div>

                                <div className="">

                                    {/* Last Name Input */}
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            {...register("lastname")}
                                            id="lastName"
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                                            placeholder="Doe"
                                        />
                                        <div className={`w-full mt-2 text-red-600 text-[11px] leading-[1.3em]`}>
                                            {errors?.lastname && <div>{errors.lastname.message}</div>}
                                        </div>
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        {...register("email")}
                                        id="email"
                                        type="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                                        placeholder="your.email@example.com"
                                    />
                                    <div className={`w-full mt-2 text-red-600 text-[11px] leading-[1.3em]`}>
                                        {errors?.email && <div>{errors.email.message}</div>}
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            {...register("password")}
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 pr-10"
                                            placeholder="Create a strong password"
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



                                {/* Terms Agreement */}
                                <div className="flex items-center">
                                    <input
                                        id="terms-agreement"
                                        type="checkbox"
                                        checked={termsAgreed}
                                        onChange={(e) => setTermsAgreed(e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="terms-agreement" className="ml-2 block text-sm text-gray-700">
                                        I agree to the{" "}
                                        <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500">
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || working || !termsAgreed}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting || working ? "Creating Account..." : "Create Account"}
                                </button>
                            </form>) : (
                                <div className="text-center py-3">
                                    <div className="mb-3">
                                        <svg className="w-14 h-14 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Signup Successful</h3>
                                    <p className="text-gray-600 mb-6">
                                        Your signup is successful. Please check your email to complete signup.
                                    </p>

                                </div>
                            )
                        }

                        {/* Sign In Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
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
                {/*  <div className="bg-gray-50 p-4 border-t border-gray-100">
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