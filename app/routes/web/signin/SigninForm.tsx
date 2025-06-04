import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@remix-run/react'
import React, { useState } from 'react'
import Logo from '~/components/header/Logo'
import { useAuth } from '~/context/AuthContext'
import { useNotification } from '~/context/NotificationContext'
import { LoginData } from '~/lib/types'
import SigninSchema from './SigninSchema'
import { useForm } from 'react-hook-form'
import { WhiteLogo } from '~/components/header/WhiteLogo'
import { whiteLogoColor } from '~/lib/css'

const SigninForm = () => {
    const [formdata, setFormdata] = useState<any | null>(null)
    const { signin } = useAuth()
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()
    const navigator = useNavigate()

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

    const handleSigninForm = async (data: LoginData) => {
        setWorking(true)
        notification.notify()
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const email = data.username
        const password = data.password

        const datr = {
            email: email,
            password: password
        }
        const res = await signin(datr)
        if (res === true) {
            notification.cancel()
            navigator("/")
        } else {
            //alert(res.message))
            notification.alertCancel("Complete Your Signup", res.message)
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
        formState: { errors, isSubmitting }
    } = useForm<LoginData>({
        defaultValues: ({}),
        resolver: zodResolver(SigninSchema)
    })



    return (
        <div className={`w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[150px] mb-[20px] `}>
            <div className={`hidden lg:block `}>

            </div>
            <div className={`place-content-center flex lg:place-content-end col-span-12 md:col-span-1`}>
                <form onSubmit={handleSubmit(handleSigninForm)}>
                    <div className={`w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px] `}>
                        <div className={whiteLogoColor}>
                            <WhiteLogo />
                        </div>

                        <div className={`text-[22px] text-center
                        mt-[30px] font-bold text-black`}>
                            Sign in to your account
                        </div>

                        <div className={`text-[15px] text-center
                        mt-[0px] font-light text-black`}>
                            using your <b className='font-bold text-black'>Gr<i>u</i>the</b> account
                        </div>

                        <div className={`w-full flex flex-col 
                        place-items-center mt-[30px]`}>
                            <input
                                {...register('username', {
                                    onChange: changeHandler
                                })}
                                placeholder='Email address'
                                type="text"
                                className={`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}
                            />
                            <div className={`w-[85%]`}>
                                {errors?.username && <div className='ml-1 text-red-600 text-[13px]'>{errors.username.message}</div>}
                            </div>
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
                            <div className={`w-[85%]`}>
                                {errors?.password && <div className='ml-1 text-red-600 text-[13px]'>{errors.password.message}</div>}
                            </div>
                        </div>

                        <div className={`w-full flex flex-col 
                        place-items-center mt-[25px]`}>
                            <button
                                className={`w-[85%] bg-blue-600
                            py-[12px] text-[15px] rounded-full
                            text-white hover:bg-blue-700`}
                            >
                                Sign in
                            </button>
                        </div>

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
                            <Link to={`/web/signup`} className={`w-[85%]`}>
                                <button
                                    className={`w-full 
                                                py-[2px] text-[14px] rounded-full text-center
                                                text-blue-700 hover:bg-gray-100`}
                                >
                                    Not account yet? Create an account
                                </button>
                            </Link>

                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default SigninForm
