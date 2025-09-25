import React, { useEffect, useState } from 'react'
import { BiUser } from 'react-icons/bi'
import DropDown from './DropDown'
import { useAuth } from '~/context/AuthContext'
import { Link } from '@remix-run/react'
import AccountUserImage from './AccountUserImage'

const UserMenu = ({ theme, userProfileImgData }: any) => {
    const [open, setOpen] = useState(false)
    const auth = useAuth()

    if (!auth) { return null }

    const showMenu = () => setOpen(true)
    const closeMenu = async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setOpen(false)
    }

    {/** handle escape */ }
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [open])

    return (
        <div>
            {
                auth.user ?
                    <button
                        onClick={(e) => showMenu()}
                        onBlur={(e) => closeMenu()}

                        className={`w-[30px] h-[30px] bg-gray-400 hover:bg-gray-300 rounded-full text-white
                flex place-items-center place-content-center text-[13px]
                relative cursor-pointer`}>
                        {
                            userProfileImgData !== null ?
                                <AccountUserImage userProfileImgData={userProfileImgData} /> :
                                <BiUser className={`object-cover w-[80%] h-[80%]`} />
                        }
                    </button> :
                    <Link to={`/web/signin`}>
                        <button className={`text-black border-white/50 border rounded-full border-gray-600 bg-blue-200  hover:text-white text-[12px] px-3 py-[5px] tracking-tigher font-bold hover:bg-blue-200/20`}>
                            Sign In
                        </button>
                    </Link>
            }

            <DropDown open={open} />
        </div>
    )
}

export default UserMenu
