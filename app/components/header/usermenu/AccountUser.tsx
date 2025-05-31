import { Link } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { useAuth } from '~/context/AuthContext'
import { getUserProfile } from '~/lib/lib'

const AccountUser = () => {
    const { user } = useAuth()
    const [name, setName] = useState('')

    useEffect(() => {
        setName(user?.first_name + ' ' + user?.last_name)
    }, [user])
    return (
        <Link to={`/web/account/profile`}>
            <div className={`flex hover:bg-gray-100 px-[10px] py-[5px] 
        hover:cursor-pointer gap-2 place-items-center`}>
                <div className={`bg-black h-[30px] w-[30px] rounded-full`}>

                </div>
                <div className={`truncate text-[13px] inline-block
                    text-gray-500`}>
                    {name}
                </div>
            </div>
        </Link>

    )
}

export default AccountUser
