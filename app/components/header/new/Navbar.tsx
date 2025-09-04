import { Link } from '@remix-run/react'
import React, { useState } from 'react'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { useAuth } from '~/context/AuthContext'
import { appConfig } from '~/lib/lib'
import UserMenu from '../usermenu/UserMenu'
import Hamburger from '../Hamburger'
import MobileNav from '../MobileNav'

const Navbar = () => {
    const [theme, setTheme] = useState('dark')
    const [showNav, setShowNav] = useState(false)
    const [navBg, setNavBg] = useState(false)
    const openNav = () => setShowNav(true)
    const closeNav = () => setShowNav(false)


    const auth = useAuth()
    if (!auth) { return null }



    return (
        <div
            className={`fixed top-0 left-0 w-full z-50 shadow-xl`}
            style={{ height: `${appConfig.NAVBAR_HEIGHT}px` }}
        >
            <div className={`flex justify-between items-center w-full h-full py-3 px-8 bg-black text-white`}>
                <div className={`flex items-center gap-4 md:gap-6`}>
                    <Link to={`/`}
                        className={`cursor-pointer hover:!text-gray-300`}
                    >
                        <div className={`flex items-center gap-3`}>
                            <img
                                src={`/images/logo.svg`}
                                alt="Garssete"
                                width={24}
                                height={24}
                                className={`w-5 h-5`}
                            />

                            <div className={`text-[15px] font-normal tracking-tighter`}>
                                GARS
                                <span className={`hover:!text-gray-300`}>
                                    SETTE
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className={`text-black hidden text-[12px] lg:flex md:gap-3`}>
                    <div className='hover:underline'>
                        <a href="/web/browse">Search</a>
                    </div>
                    <div className='hover:underline'>
                        <a href="/web/terms">Terms</a>
                    </div>
                    <div className='hover:underline'>
                        <a href="/web/privacy">Privacy</a>
                    </div>
                    <div>
                        |
                    </div>
                    <div>
                        Connect your business with potential partners across the  globe

                    </div>
                </div>

                <div className={`flex items-center gap-4`}>
                    <UserMenu />

                    {
                        !auth?.user &&
                        <Link to={`/web/signup`}>
                            <button className={`text-white bg-red-700 border-[1px] border-white/50 hover:bg-red-400 hover:text-white text-[12px] hover:border-yellow-300/80 rounded-none px-3 py-[5px] tracking-tigher`}>
                                Sign Up
                            </button>
                        </Link>
                    }


                    <Hamburger
                        theme={'dark'}
                        openNav={openNav}
                        navBg={navBg}
                    />
                </div>
            </div>
            <MobileNav
                showNav={showNav}
                closeNav={closeNav}
            />
        </div>
    )
}

export default Navbar
