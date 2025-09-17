import { Link } from '@remix-run/react'
import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { MdOutlineCheck } from 'react-icons/md'

const ChangeEmailSuccess = ({ email, message }: any) => {
    return (
        <div className=' flex place-content-center place-items-center w-full '>
            <div className=' max-w-[300px]'>
                <div className={`text-lg font-semibold leading-[1.2em] text-center
                    w-full capitalize flex place-items-center gap-x-1 place-content-center`}>
                    <div className={`w-[30px] h-[30px] bg-gray-300 flex place-content-center 
                    place-items-center rounded-full text-black  border-[5px]`}>
                        <MdOutlineCheck className={`text-[40px]`} />
                    </div>
                    <span>
                        {message}
                    </span>
                </div>
                <div className={`mb-8 w-full text-center`}>
                    {email}
                </div>






                {/* <div className=' mt-3'>
                    <Link to={'/web/signin'}
                        className=' text-2xl mb-2 pb-1 border-b'
                    >
                        Sign in
                    </Link>
                </div> */}

            </div>
        </div>
    )
}

export default ChangeEmailSuccess
