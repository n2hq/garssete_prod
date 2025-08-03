import { Link } from '@remix-run/react'
import React from 'react'
import { HiBars3BottomRight } from 'react-icons/hi2'
const Hamburger = ({ theme, openNav, navBg }: any) => {
    return (
        <>
            <div className={`flex items-center`}
                onClick={openNav}
            >


                <button className={`text-white   bg-gray-900 border border-white/50 hover:bg-blue-700 hover:text-black text-[12px] hover:border-[1px] hover:border-yellow-300/20 rounded-none px-3 py-[4px] tracking-tigher`}>
                    <HiBars3BottomRight

                        className={`${theme === "light" ? 'text-black' : 'text-white'} w-9 h-[19px] cursor-pointer`}
                    />
                </button>
            </div>
        </>
    )
}

export default Hamburger
