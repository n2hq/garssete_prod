import { Link } from '@remix-run/react'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import { FcCancel } from 'react-icons/fc'
import { GiCancel } from 'react-icons/gi'
import { MdCancel, MdOutlineCancel } from 'react-icons/md'
import { TbCancel, TbFlagCancel } from 'react-icons/tb'

const ChangeEmailFail = ({ guid }: any) => {
    return (
        <div className=' flex place-content-center place-items-center w-full'>
            <div className=' max-w-[300px]'>
                <div className=' text-xl leading-[1.2em] text-center font-light '>
                    Email has been changed!
                </div>

                <div className={`mt-4 flex place-items-center place-content-center`}>
                    <div className={`w-[60px] h-[60px] bg-gray-300 flex place-content-center 
                    place-items-center rounded-full text-black  border-[5px]`}>
                        <MdOutlineCancel className='text-[50px]' />
                    </div>
                </div>


                <div className=' mt-6 text-[15px] '>
                    Sign in with your new email. If your email is not changed, please signin again with the old email and try again.
                </div>
                <div className=' mt-4'>
                    <Link to={`/web/account/email_address`}
                        className={`text-2xl mb-2 pb-1 
                            flex content-center items-center gap-2 hover:underline`}
                    >
                        <span className={`border-b`}>
                            Go to Account
                        </span>
                        <BsArrowRight className=' relative top-[1px]' />
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default ChangeEmailFail
