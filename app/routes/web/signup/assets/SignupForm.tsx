import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@remix-run/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Logo from '~/components/header/Logo'
import { WhiteLogo } from '~/components/header/WhiteLogo'
import { useNotification } from '~/context/NotificationContext'
import { whiteLogoColor } from '~/lib/css'
import { config, headers } from '~/lib/lib'
import { IAddUser } from '~/lib/types'
import SignupSchema from './SignupSchema'
import { useOperation } from '~/context/OperationContext'

const SignupForm = () => {
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
        <div className={`w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[80px] mb-[20px] `}>
            <div className={`hidden lg:block `}>

            </div>
            <div className={`place-content-center flex lg:place-content-end col-span-12 md:col-span-1`}>
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className={`w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px]`}>
                        <div className={whiteLogoColor}>
                            <WhiteLogo />
                        </div>

                        <div className={`text-[22px] text-center
                        mt-[30px] font-bold text-black`}>
                            Create an account
                        </div>

                        <div className={`text-[15px] text-center
                        mt-[0px] font-light text-black`}>
                            Get a <b className='font-bold text-black'>{config.SITENAME}</b> account
                        </div>

                        <section
                            id='signup-section'
                            className={`w-full ${signedup && 'hidden'}`}
                        >
                            <div className={`w-full flex flex-col 
                        place-items-center mt-[30px]`}>
                                <input
                                    {...register('first_name', {
                                        onChange: changeHandler
                                    })}
                                    placeholder='First name'
                                    type="text"
                                    className={`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}
                                />
                                {
                                    errors?.first_name &&
                                    <div className={`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`}>
                                        {errors?.first_name?.message}
                                    </div>
                                }
                            </div>

                            <div className={`w-full flex flex-col 
                        place-items-center mt-[15px]`}>
                                <input
                                    {...register('lastname', {
                                        onChange: changeHandler
                                    })}
                                    placeholder='Last name'
                                    type="text"
                                    className={`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}
                                />
                                {
                                    errors?.lastname &&
                                    <div className={`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`}>
                                        {errors?.lastname?.message}
                                    </div>
                                }
                            </div>

                            <div className={`w-full flex flex-col 
                        place-items-center mt-[15px]`}>
                                <input
                                    {...register('email', {
                                        onChange: changeHandler
                                    })}
                                    placeholder='Email address'
                                    type="text"
                                    className={`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}
                                />
                                {
                                    errors?.email &&
                                    <div className={`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`}>
                                        {errors?.email?.message}
                                    </div>
                                }
                            </div>

                            <div className={`w-full flex flex-col 
                        place-items-center mt-[15px] `}>
                                <input
                                    {...register('password', {
                                        onChange: changeHandler
                                    })}
                                    placeholder='Password'
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
                            </div>

                            <div className={`w-full flex flex-col 
                        place-items-center mt-[25px]`}>
                                <button
                                    className={`w-[85%] bg-blue-600
                            py-[12px] text-[15px] rounded-full
                            text-white hover:bg-blue-700`}
                                >
                                    Create an account
                                </button>
                            </div>
                        </section>

                        <section
                            className={`${signedup ? 'block' : 'hidden'}
                            text-black. w-[90%] text-[16px] text-center
                            mt-[50px] mb-[25px] leading-[1.4em]
                            bg-yellow-50 text-yellow-900 px-1.5 py-4
                            rounded`}
                        >
                            {successMsg}
                        </section>

                        <div className={`w-full flex flex-col 
                        place-items-center mt-[20px] `}>
                            <Link className={`w-[85%]`}
                                to={`/web/reset_password`}>
                                <div
                                    className={`border-b w-full
                                px-[0px] py-1 text-[14px]
                                outline-none hover:underline`}
                                >
                                    Forgot Password?
                                </div>
                            </Link>
                        </div>

                        <div className={`w-full flex flex-col 
                        place-items-center mt-[20px]`}>
                            <Link to={`/web/signin`} className={`w-[85%]`}>
                                <button
                                    className={`w-full 
                            py-[2px] text-[14px] rounded-full text-center
                            text-blue-700 hover:bg-gray-100`}
                                >
                                    Alread have an account? <span>Sign in</span>
                                </button>
                            </Link>

                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default SignupForm
