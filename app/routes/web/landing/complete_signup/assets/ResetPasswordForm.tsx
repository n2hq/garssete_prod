import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Logo from '~/components/header/Logo'
import { WhiteLogo } from '~/components/header/WhiteLogo'
import { useAuth } from '~/context/AuthContext'
import { useNotification } from '~/context/NotificationContext'
import { whiteLogoColor } from '~/lib/css'
import { config, getUserProfile, headers, toSentenceCase } from '~/lib/lib'
import ResetPasswordSchema from './ResetPasswordSchema'
import { ResetPasswordNewType, ResetPasswordType, UserProfile } from '~/lib/types'


const ResetPasswordForm = ({ guid }: any) => {
    const [loading, setLoading] = useState('Loading...')
    const [userProfile, setUserProfile] = useState<any | null>(null)


    const [formdata, setFormdata] = useState<any | null>(null)
    const auth = useAuth()
    if (!auth) { return null }
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()
    const navigator = useNavigate()

    const [recoverySent, setRecoverySent] = useState(false)
    const successMsg = `Please check email provided to continue.`

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
        notification.notify('', 'Working...')
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
                    notification.alertCancel('Error!', data.message)
                })

            } else {
                notification.alertCancel('Success!', 'Password Successfully Changed! Use new password on next login')
            }

        } catch (error) {
            return undefined
        } finally {
            setWorking(false)
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setWorking(false)
    }

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


    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<ResetPasswordNewType>({
        defaultValues: ({}),
        resolver: zodResolver(ResetPasswordSchema)
    })

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
        <div className={`w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[100px] mb-[20px]  `}>
            <div className={`hidden lg:block `}>

            </div>
            <div className={`place-content-center flex lg:place-content-end col-span-12 md:col-span-1`}>
                <form onSubmit={handleSubmit(handleResetPassword)}>
                    <div className={`w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px] `}>
                        <div className={whiteLogoColor}>
                            <WhiteLogo />
                        </div>

                        <div className={`text-[22px] text-center
                        mt-[30px] font-bold text-black`}>
                            Signup Complete
                        </div>

                        <div className={`text-[15px] text-center
                        mt-[0px] font-light text-black`}>
                            you can now signin with your email
                        </div>

                        <section className={`w-full
                            ${recoverySent && 'hidden'}`}>

                            <div className={`w-full  mt-[30px] 
                        `}>
                                <div className={`bg-yellow-100/70
                                     text-center py-3 text-[14px]
                                    mx-[10px] rounded px-3`}>
                                    {loading}
                                </div>
                            </div>

                            {/* <div className={`w-full flex flex-col 
                        place-items-center mt-[30px]`}>
                                <input
                                    {...register('password', {
                                        onChange: changeHandler
                                    })}
                                    placeholder='Enter new password'
                                    type="password"
                                    className={`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}
                                />
                                {
                                    errors?.password &&
                                    <div className={`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`}>
                                        {errors?.password?.message}
                                    </div>
                                }
                            </div> */}

                            {/* <div className={`w-full flex flex-col 
                        place-items-center mt-[10px]`}>
                                <input
                                    {...register('password2', {
                                        onChange: changeHandler
                                    })}
                                    placeholder='Retype new password'
                                    type="password"
                                    className={`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}
                                />
                                {
                                    errors?.password2 &&
                                    <div className={`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`}>
                                        {errors?.password2?.message}
                                    </div>
                                }
                            </div> */}



                            {/* <div className={`w-full flex flex-col 
                        place-items-center mt-[25px]`}>
                                <button

                                    type='submit'
                                    className={`w-[85%] bg-blue-600
                            py-[12px] text-[15px] rounded-full
                            text-white hover:bg-blue-700`}
                                >
                                    Reset Password
                                </button>
                            </div> */}
                        </section>

                        {/* <section
                            className={`${recoverySent ? 'block' : 'hidden'}
                            text-black. w-[90%] text-[17px] text-center
                            mt-[50px] mb-[25px] 
                            bg-yellow-50 text-yellow-900 px-1.5 py-2
                            rounded`}
                        >
                            {successMsg}
                        </section> */}

                        <div className={`w-full flex flex-col 
                                            place-items-center mt-[30px] `}>
                            <Link className={`w-[85%]`}
                                to={`/web/signin`}>
                                <div
                                    className={`border-b w-full
                                                    px-[0px] py-1 text-[14px]
                                                    outline-none hover:underline`}
                                >
                                    Already have and account? Sign in
                                </div>
                            </Link>
                        </div>

                        <div className={`w-full flex flex-col 
                                            place-items-center mt-[20px]`}>
                            <Link to={`/web/signup`} className={`w-[85%]`}>
                                <button
                                    className={`w-full 
                                                py-[2px] text-[14px] rounded-full text-center
                                                text-blue-700 hover:bg-gray-100`}
                                >
                                    No account yet? <span className={`text-black`}>Create an account</span>
                                </button>
                            </Link>

                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default ResetPasswordForm
