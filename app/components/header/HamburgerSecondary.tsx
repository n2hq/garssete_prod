import { Link } from '@remix-run/react'
import React from 'react'
import { BiMenu } from 'react-icons/bi'
import { HiBars3BottomRight } from 'react-icons/hi2'
const HamburgerSecondary = ({ theme, openNav, navBg }: any) => {
    return (
        <>
            <div className={`flex items-center`}
                onClick={openNav}
            >


                <button className={` text-[12px]  hover:border-yellow-300/20 px-1 rounded-none tracking-tigher`}>
                    <BiMenu className={`text-[30px]`} />
                </button>
            </div>
        </>
    )
}

export default HamburgerSecondary
