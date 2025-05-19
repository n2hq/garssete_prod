import { Link } from '@remix-run/react'
import React from 'react'
import Logo from '~/components/header/Logo'

const ResetPasswordForm = () => {
    return (
        <div className={`w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[80px] mb-[20px] `}>
            <div className={`hidden lg:block `}>

            </div>
            <div className={`place-content-center flex lg:place-content-end col-span-12 md:col-span-1`}>
                <div className={`w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px] shadow-lg shadow-gray-500`}>
                    <div className=''>
                        <Logo theme='light' />
                    </div>

                    <div className={`text-[22px] text-center
                        mt-[50px] font-bold text-blue-800`}>
                        Forgot Password?
                    </div>

                    <div className={`text-[15px] text-center
                        mt-[0px] font-light text-black`}>
                        enter your email address below
                    </div>

                    <div className={`w-full flex flex-col 
                        place-items-center mt-[50px]`}>
                        <input
                            placeholder='Email address'
                            type="text"
                            className={`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}
                        />
                    </div>



                    <div className={`w-full flex flex-col 
                        place-items-center mt-[25px]`}>
                        <button
                            className={`w-[85%] bg-blue-600
                            py-[12px] text-[15px] rounded-full
                            text-white hover:bg-blue-700`}
                        >
                            Send recovery email
                        </button>
                    </div>

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
            </div>
        </div >
    )
}

export default ResetPasswordForm
