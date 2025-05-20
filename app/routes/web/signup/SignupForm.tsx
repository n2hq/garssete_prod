import { Link } from '@remix-run/react'
import React from 'react'
import Logo from '~/components/header/Logo'

const SignupForm = () => {
    return (
        <div className={`w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[150px] mb-[20px] `}>
            <div className={`hidden lg:block `}>

            </div>
            <div className={`place-content-center flex lg:place-content-end col-span-12 md:col-span-1`}>
                <div className={`w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px]`}>
                    <div className=''>
                        <Logo theme='light' />
                    </div>

                    <div className={`text-[22px] text-center
                        mt-[30px] font-bold text-blue-800`}>
                        Create an account
                    </div>

                    <div className={`text-[15px] text-center
                        mt-[0px] font-light text-black`}>
                        Get a Comcerc account
                    </div>

                    <div className={`w-full flex flex-col 
                        place-items-center mt-[30px]`}>
                        <input
                            placeholder='First name'
                            type="text"
                            className={`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}
                        />
                    </div>

                    <div className={`w-full flex flex-col 
                        place-items-center mt-[15px]`}>
                        <input
                            placeholder='Last name'
                            type="text"
                            className={`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}
                        />
                    </div>

                    <div className={`w-full flex flex-col 
                        place-items-center mt-[15px]`}>
                        <input
                            placeholder='Email address'
                            type="text"
                            className={`border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`}
                        />
                    </div>

                    <div className={`w-full flex flex-col 
                        place-items-center mt-[15px] `}>
                        <input
                            placeholder='Password'
                            type="password"
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
                            Create an account
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
            </div>
        </div >
    )
}

export default SignupForm
