import { Link } from '@remix-run/react'
import React from 'react'
import { FcSettings } from 'react-icons/fc'

const AccountSettings = () => {
    return (
        <Link to={`/web/account/profile`}>
            <div className={`flex hover:bg-gray-100 px-[10px] py-[5px] 
        hover:cursor-pointer gap-2 place-items-center`}>
                <div className={`bg-gray-200 h-[30px] w-[30px] rounded-full
                flex place-items-center place-content-center border`}>
                    <FcSettings className={`text-[20px]`} />
                </div>
                <div className={`truncate text-[13px] text-gray-500`}>
                    Account & Settings
                </div>
            </div>
        </Link>
    )
}

export default AccountSettings
