import { Link, useLocation } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { BiBriefcase, BiCategory, BiSearch } from 'react-icons/bi'
import { FaAngleDown, FaBuysellads, FaDemocrat } from 'react-icons/fa'
import { appConfig } from '~/lib/lib'
import UserMenu from '../usermenu/UserMenu'
import { TbPasswordUser, TbWritingSign } from 'react-icons/tb'
import { FiShoppingCart } from 'react-icons/fi'
import HamburgerSecondary from '../HamburgerSecondary'
import MobileNav from '../MobileNav'
import { BsHeart, BsSearchHeart } from 'react-icons/bs'
import HomeNav from '~/routes/assets/header/HomeNav'
import { lnks } from '~/lib/json'



const acctLnks = [
    { title: "Account", lnk: "/web/account/profile", icon: <TbPasswordUser /> },
]

const NormalNavbar = () => {
    const [showNav, setShowNav] = useState(false)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const query = params.get("q") || ""
    const closeNav = () => setShowNav(false)

    return (
        <div>
            <div className={` bg-[#001e5a] text-white  fixed top-0 left-0 w-full z-[10000] shadow-xl `} style={{ height: `${appConfig.NAVBAR_HEIGHT}px` }}>

                <MobileNav
                    showNav={showNav}
                    closeNav={closeNav}
                />


                <div className={`max-w-full mx-auto flex items-center justify-between h-full gap-4 px-4 sm:px-6`}>

                    {/* Left - Logo and Menu Button */}
                    <div className="flex items-center gap-2 lg:border-r border-blue-700 pr-4">
                        <div className={`relative w-[25px] h-[25px] overflow-hidden `}>
                            <img
                                src={`/images/gslogowhite.jpeg`}
                                alt="Garssete"
                                width={30}
                                height={30}
                                className={` object-cover w-full h-full`}
                            />
                        </div>
                        <Link to="/" className="text-xl font-extrabold tracking-tight">
                            GARSSETE
                        </Link>
                    </div>

                    {/* Center - Nav Links (hidden on small screens) */}
                    <div className="hidden xl:flex gap-8">
                        <NavLinks links={lnks} />
                    </div>

                    {/* Center - Search Box (responsive) */}
                    <div className="flex-grow hidden sm:flex justify-center">
                        <SearchBox query={query} />
                    </div>

                    {/* Right - UserMenu */}
                    <div className="flex items-center lg:border-l border-blue-700 pl-4 gap-2">
                        <UserMenu theme='light' />
                        <HamburgerSecondary theme='dark' openNav={() => setShowNav(true)} navBg={false} />
                    </div>
                </div>


            </div>

            {/** mobile only searchbar */}
            <div className={`md:hidden  fixed w-full
            bg-white z-[3000]`}>


            </div>
            <MobileNav
                showNav={showNav}
                closeNav={closeNav}
            />
        </div>
    )
}

export default NormalNavbar



export const NavLinks = ({ links }: any) => {
    const [signedIn, setSignedIn] = useState(false)


    useEffect(() => {
        const tokens = localStorage.getItem("authTokens")
        if (tokens !== null) {
            setSignedIn(true)
        }

    }, [])
    return (
        <div className="flex gap-6">
            {links.map((link: any, i: number) => (
                <NavLink key={i} link={link} index={i} />
            ))}
            {
                signedIn &&
                acctLnks.map((link: any, i: number) => (
                    <NavLink key={i} link={link} index={i} />
                ))}

        </div>
    )
}

export const NavLink = ({ link, index }: any) => {
    const location = useLocation();


    return <Link key={index} to={link.lnk} className={`flex items-center font-semibold text-[15px] hover:underline `}>
        {link.icon}
        <span className={`mx-1 ${location.pathname === link.lnk && 'underline'}`}>{link.title}</span>
        <FaAngleDown className="text-xs" />
    </Link>
}


export const SearchBox = ({ query }: any) => {
    return (
        <form action="/web/search" className="text-sm w-full max-w-md">
            <div className="flex items-center bg-white rounded-full px-4 py-1 gap-2">
                <input
                    name="q"
                    defaultValue={query}
                    type="text"
                    placeholder="Business name, address, country, state..."
                    className="flex-grow text-gray-700 text-[12px] outline-none bg-transparent"
                />
                <button className="bg-gray-600 w-8 h-8 flex items-center justify-center rounded-full text-white text-lg">
                    <BiSearch />
                </button>
            </div>
        </form>
    )
}
