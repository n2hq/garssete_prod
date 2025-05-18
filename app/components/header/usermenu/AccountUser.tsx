import { Link } from '@remix-run/react'
import React from 'react'

const AccountUser = () => {
    return (
        <Link to={`/account/profile`}>
            <div className={`flex hover:bg-gray-100 px-[10px] py-[5px] 
        hover:cursor-pointer gap-2 place-items-center`}>
                <div className={`bg-black h-[30px] w-[30px] rounded-full`}>

                </div>
                <div className={`truncate text-[13px] inline-block
                    `}>
                    Nestor Caspian
                </div>
            </div>
        </Link>

    )
}

export default AccountUser
