import React from 'react'
import { HiBars3BottomRight } from 'react-icons/hi2'
const SigninMenu = ({ theme, openNav, navBg }: any) => {
    return (
        <>
            <div className={`flex items-center space-x-4`}
            >
                <HiBars3BottomRight
                    onClick={openNav}
                    className={`${theme === "light" ? 'text-black' : 'text-white'} w-8 h-8 cursor-pointer`}
                />
            </div>
        </>
    )
}

export default SigninMenu
