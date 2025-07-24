import React, { useState } from 'react'
import Logo from '../Logo'
import { BiSearch } from 'react-icons/bi'
import Hamburger from '../Hamburger'
import { Link, useLocation } from '@remix-run/react'
import MobileNav from '../MobileNav'
import UserMenu from '../usermenu/UserMenu'
import { WhiteLogo } from '../WhiteLogo'

const navlnk = [
    {
        title: "Search",
        lnk: "/web/search"
    },
    {
        title: "Hotels",
        lnk: "/web/search?q=hotels"
    },
    {
        title: "Travel",
        lnk: "/web/search?q=travel"
    }
]

const GenericNav = () => {
    const [showNav, setShowNav] = useState(false)
    const [navBg, setNavBg] = useState(false)
    const [_theme, setTheme] = useState("light")
    const openNav = () => setShowNav(true)
    const closeNav = () => setShowNav(false)
    const location = useLocation()

    const params = new URLSearchParams(location.search);
    const query = params.get("q") || ""; // This will be "travel"

    return (
        <div>
            <div className={`px-[10px] z-[10] fixed w-full
        bg-white shadow-lg `}>
                <div className={`max-w-[1100px] mx-auto w-full`}>
                    <div className={`w-full flex place-content-between
                    h-[60px] gap-x-2`}>

                        {/** left */}
                        <div className={`flex place-items-center text-black
                        `}>
                            <WhiteLogo />
                        </div>

                        {/** center */}
                        <div className={`flex place-items-center
                        gap-1 grow`}>
                            <div className={`w-full`}>
                                <form
                                    action='/web/search'
                                    className={`w-full flex rounded-full border px-1
                                border-gray-300 overflow-hidden bg-white
                                place-items-center gap-1`}>
                                    <input
                                        name='q'
                                        defaultValue={query}
                                        placeholder='Business name, address, country, state...'
                                        type="text"
                                        className={`h-[40px] w-full px-3
                                        grow outline-none`}
                                    />

                                    <button
                                        type='submit'
                                        className={`bg-blue-500 min-w-[30px] w-[60px] h-[30px]
                                        flex place-items-center place-content-center
                                        rounded-full text-white`}
                                    >
                                        <BiSearch />
                                    </button>
                                </form>
                            </div>
                            <div className={` hidden md:flex place-items-center
                                min-w-fit gap-1`}>
                                {
                                    navlnk.map((link, index) => {
                                        const url = location.pathname + location.search

                                        return (
                                            <Link
                                                key={index}
                                                className={`text-[14px] hover:bg-gray-200/50
                                                px-[10px] py-[6px] rounded-full
                                                font-semibold
                                                ${link.lnk.toString() === (url) &&
                                                    url.toString() !== "" && 'bg-gray-700 text-white'}
                                                    
                                                `}

                                                to={link.lnk}>
                                                {
                                                    link.title
                                                }
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/** right */}
                        <div className={`flex place-items-center
                        gap-1 md:gap-4`}>
                            <UserMenu theme={'light'} />
                            <Hamburger
                                theme={'light'}
                                openNav={openNav}
                                navBg={navBg}
                            />

                        </div>
                    </div>
                </div>

            </div>

            <MobileNav
                showNav={showNav}
                closeNav={closeNav}
            />
            <div className={`h-[65px] `}></div>
        </div>
    )
}

export default GenericNav

