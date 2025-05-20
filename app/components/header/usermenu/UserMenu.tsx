import React, { useState } from 'react'
import { BiUser } from 'react-icons/bi'
import DropDown from './DropDown'
import { useAuth } from '~/context/AuthContext'
import { Link } from '@remix-run/react'

const UserMenu = ({ theme }: any) => {
    const [open, setOpen] = useState(false)
    const auth = useAuth()

    const showMenu = () => setOpen(true)
    const closeMenu = async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setOpen(false)
    }

    return (
        <div>
            {
                auth.user ?
                    <button
                        onClick={(e) => showMenu()}
                        onBlur={(e) => closeMenu()}
                        className={`w-[25px] h-[25px] bg-gray-400 hover:bg-gray-300 rounded-full text-white
                flex place-items-center place-content-center text-[13px]
                relative cursor-pointer`}>
                        <BiUser className={`object-cover w-[70%] h-[70%]`} />
                    </button> :
                    <Link to={`/web/signin`}>
                        <div className={`rounded-full border-[1px] px-3
                     text-[13px] py-[5px] cursor-pointer
                    ${theme === "dark" && 'text-white border-gray-400/80 hover:bg-white hover:text-blue-800'}
                    ${theme !== "dark" && 'text-white border-gray-500/50 hover:text-white/60 hover:shadow-lg bg-blue-800'}
                    `}>
                            Sign in
                        </div>
                    </Link>
            }

            <DropDown open={open} />
        </div>
    )
}

export default UserMenu
