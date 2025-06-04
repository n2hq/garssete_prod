import React from 'react'
import { HiBars3BottomLeft } from 'react-icons/hi2'

const HamburgerMenu = ({ theme, openNav, navBg }: any) => {
    return (
        <>
            <div className={`flex items-center space-x-0`}
            >
                <HiBars3BottomLeft
                    onClick={openNav}
                    className={`${theme === "light" ? 'text-black' : 'text-white'} w-8 h-8 cursor-pointer`}
                />
            </div>
        </>
    )
}

export default HamburgerMenu
