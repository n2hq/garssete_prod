import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { FcSettings } from 'react-icons/fc'

const AccountSignout = () => {
    return (
        <div className={`flex hover:bg-gray-100 px-[10px] py-[5px] 
        hover:cursor-pointer gap-2 place-items-center`}>
            <div className={`bg-gray-200 h-[30px] w-[30px] rounded-full
                flex place-items-center place-content-center border`}>
                <FaSignOutAlt className={`text-[20px]`} />
            </div>
            <div className={`truncate text-[13px]`}>
                Signout
            </div>
        </div>
    )
}

export default AccountSignout
