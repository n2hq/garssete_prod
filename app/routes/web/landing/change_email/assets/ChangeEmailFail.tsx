import { Link } from '@remix-run/react'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import { FcCancel } from 'react-icons/fc'
import { GiCancel } from 'react-icons/gi'
import { MdCancel, MdOutlineCancel } from 'react-icons/md'
import { TbCancel, TbFlagCancel } from 'react-icons/tb'

const ChangeEmailFail = () => {
    return (
        <div className=' flex place-content-center place-items-center w-full'>
            <div className=' max-w-[300px]'>
                <div className=' text-xl leading-[1.2em] text-center font-light flex place-items-center gap-x-1 place-content-center '>
                    <div className={`w-[30px] h-[30px] bg-gray-300 flex place-content-center 
                    place-items-center rounded-full text-black  border-[5px]`}>
                        <MdOutlineCancel className='text-[40px]' />
                    </div>
                    <span>Link Has Expired.</span>
                </div>




                <div className=' mt-6 text-[15px] '>
                    Try changing your email again.
                </div>
                {/* <div className=' mt-4'>
                    <Link to={`/web/account/email_address`}
                        className={`text-2xl mb-2 pb-1 
                            flex content-center items-center gap-2 hover:underline`}
                    >
                        <span className={`border-b`}>
                            Go to Account
                        </span>
                        <BsArrowRight className=' relative top-[1px]' />
                    </Link>
                </div> */}

            </div>
        </div>
    )
}

export default ChangeEmailFail
