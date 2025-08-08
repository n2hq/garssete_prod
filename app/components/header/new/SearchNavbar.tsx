import { Link, useLocation } from '@remix-run/react'
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { appConfig } from '~/lib/lib'
import UserMenu from '../usermenu/UserMenu'
import Hamburger from '../Hamburger'
import MobileNav from '../MobileNav'

const SearchNavbar = () => {
    const [theme, setTheme] = useState('dark')
    const [showNav, setShowNav] = useState(false)
    const [navBg, setNavBg] = useState(false)
    const openNav = () => setShowNav(true)
    const closeNav = () => setShowNav(false)
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";

    return (
        <div
            className={`fixed top-0 left-0 w-full z-[10000] shadow-xl`}
            style={{ height: `${appConfig.NAVBAR_HEIGHT}px` }}
        >
            <div className={`flex justify-between items-center w-full h-full py-3 px-8 bg-black text-white gap-3`}>
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

                <form
                    action='/web/search'
                    className={`text-gray-200 text-[12px] sm:flex gap-3 grow place-content-center hidden`}>
                    <div className={`w-full lg:w-[60%] bg-white h-full flex rounded-full pl-6 pr-[3px] place-content-center place-items-center gap-3`}>
                        <input
                            name='q'
                            defaultValue={query}
                            type="text"
                            placeholder='Business name, address, country, state...'
                            className={`h-[35px] w-full pr-3 text-[12px] grow outline-none  text-gray-700 `}
                        />
                        <button className='bg-gray-500 min-w-[30px] w-[38px] h-[30px] text-[19px]
                                        flex place-items-center place-content-center
                                        rounded-full text-white'>
                            <BiSearch />
                        </button>
                    </div>
                </form>


                <div className={`flex items-center gap-4`}>


                    {/* <Link to={`/signin`}>
                      <button className={`text-white bg-red-700 border-[1px] border-white/30 hover:bg-red-400 hover:text-white text-[12px] hover:border-yellow-300/30 rounded-none px-3 py-[5px] tracking-tigher`}>
                          Sign Up
                    </button>
                  </Link> */}

                    <UserMenu theme={'light'} />

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

export default SearchNavbar
