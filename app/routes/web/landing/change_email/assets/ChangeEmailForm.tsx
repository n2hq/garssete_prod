import { Link } from '@remix-run/react'
import React from 'react'
import { WhiteLogo } from '~/components/header/WhiteLogo'
import { whiteLogoColor } from '~/lib/css'
import ChangeEmailFail from './ChangeEmailFail'
import ChangeEmailSuccess from './ChangeEmailSuccess'

const ChangeEmailForm = ({ guid, email, response }: any) => {
    return (
        <div className={`w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[100px] mb-[20px]  `}>
            <div className={`hidden lg:block `}>

            </div>
            <div className={`place-content-center flex lg:place-content-end col-span-12 md:col-span-1`}>
                <form>
                    <div className={`w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px] `}>
                        <div className={whiteLogoColor}>
                            <WhiteLogo />
                        </div>

                        <div className={`text-[22px] text-center
                        mt-[30px] font-bold text-black`}>
                            Change Email
                        </div>

                        <div className={`text-[15px] text-center
                        mt-[0px] font-light text-black`}>
                            Use your new email to login again!
                        </div>

                        <section className={`w-full`}>
                            <div className={`w-full flex flex-col 
                        place-items-center mt-[30px]`}>



                                {
                                    response === undefined ?
                                        <ChangeEmailFail guid={guid} /> :
                                        <ChangeEmailSuccess email={email} />
                                }

                            </div>

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

export default ChangeEmailForm
