import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@remix-run/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Logo from '~/components/header/Logo'
import { WhiteLogo } from '~/components/header/WhiteLogo'
import { useAuth } from '~/context/AuthContext'
import { useNotification } from '~/context/NotificationContext'
import { whiteLogoColor } from '~/lib/css'
import { toSentenceCase } from '~/lib/lib'
import ResetPwSchema from './ResetPwSchema'
import { useOperation } from '~/context/OperationContext'

const ResetPasswordForm = () => {
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
        <div className={`w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[80px] mb-[20px] z-[10] `}>
            <div className={`hidden lg:block `}>

            </div>
            <div className={`place-content-center flex lg:place-content-end col-span-12 md:col-span-1`}>
                <form onSubmit={handleSubmit(handleResetPw)}>
                    <div className={`w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px] `}>
                        <div className={whiteLogoColor}>
                            <WhiteLogo />
                        </div>

                        <div className={`text-[22px] text-center
                        mt-[30px] font-bold text-black`}>
                            Reset Password
                        </div>

                        <div className={`text-[15px] text-center
                        mt-[0px] font-light text-black`}>
                            enter your email address below
                        </div>

                        <section className={`w-full
                            ${recoverySent && 'hidden'}`}>
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
                                {
                                    errors?.username &&
                                    <div className={`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`}>
                                        {errors?.username?.message}
                                    </div>
                                }
                            </div>



                            <div className={`w-full flex flex-col 
                        place-items-center mt-[25px]`}>
                                <button

                                    type='submit'
                                    className={`w-[85%] bg-blue-600
                            py-[12px] text-[15px] rounded-full
                            text-white hover:bg-blue-700`}
                                >
                                    Send recovery email
                                </button>
                            </div>
                        </section>

                        <section
                            className={`${recoverySent ? 'block' : 'hidden'}
                            text-black. w-[90%] text-[17px] text-center
                            mt-[50px] mb-[25px] 
                            bg-yellow-50 text-yellow-900 px-1.5 py-2
                            rounded`}
                        >
                            {successMsg}
                        </section>

                        <div className={`w-full flex flex-col 
                                            place-items-center mt-[20px] `}>
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
