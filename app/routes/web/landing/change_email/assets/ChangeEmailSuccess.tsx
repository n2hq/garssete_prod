import { Link } from '@remix-run/react'
import React from 'react'
import { FaCheck } from 'react-icons/fa'

const ChangeEmailSuccess = ({ email }: any) => {
    return (
        <div className=' flex place-content-center place-items-center w-full '>
            <div className=' max-w-[300px]'>
                <div className={`text-xl leading-[1.2em] text-center font-light
                    w-full`}>
                    Email Change Is Successful.
                </div>
                <div className={`mb-8 w-full text-center`}>
                    {email}
                </div>

                <div className={`mt-4 flex place-items-center place-content-center`}>
                    <div className={`w-[70px] h-[70px] bg-gray-300 flex place-content-center 
                        place-items-center rounded-full text-black  border-[5px]
                        border-black text-3xl`}>
                        <FaCheck />
                    </div>
                </div>



                <div className=' mt-6 text-[15px] '>
                    Click below to sign in.
                </div>
                <div className=' mt-3'>
                    <Link to={'/web/signin'}
                        className=' text-2xl mb-2 pb-1 border-b'
                    >
                        Sign in
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default ChangeEmailSuccess
