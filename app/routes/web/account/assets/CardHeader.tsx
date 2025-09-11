import React from 'react'
import CardTitle from './CardTitle'
import { Link } from '@remix-run/react'
import { BiUser, BiUserX } from 'react-icons/bi'
import { CgUser } from 'react-icons/cg'
import { FaUser } from 'react-icons/fa6'

const CardHeader = ({ base_url, title, }: any) => {
    return (
        <div>
            <div className={`bg-blue-100 w-full px-3 
                            flex place-content-between rounded-lg
                            place-items-center h-auto py-3 gap-[5px]
                            leading-[1.5em]`}>
                <div className={`h-full text-blue-800 text-[18px] font-poppins tracking-tight font-bold flex place-items-center gap-2`}>
                    <FaUser className={`text-[17px]`} />
                    <span className={`text-[18px]`}>
                        {title}
                    </span>
                </div>


            </div>
        </div>
    )
}

export default CardHeader
