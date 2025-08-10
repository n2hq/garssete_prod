import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { FcSettings } from 'react-icons/fc'
import { useAuth } from '~/context/AuthContext'



const AccountSignout = () => {

    const auth = useAuth()


    if (!auth) { return null }

    const { signoutReload } = auth

    return (
        <div
            onClick={() => signoutReload()}
            className={`flex hover:bg-gray-100 px-[10px] py-[5px] 
        hover:cursor-pointer gap-2 place-items-center`}>
            <div className={`bg-gray-200 h-[30px] w-[30px] rounded-full
                flex place-items-center place-content-center border`}>
                <FaSignOutAlt className={`text-[20px]`} />
            </div>
            <div className={`truncate text-[13px] text-gray-500`}>
                Signout
            </div>
        </div>
    )
}

export default AccountSignout
