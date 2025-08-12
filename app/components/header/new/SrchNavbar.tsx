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

const lnks = [
    { title: "Search", lnk: "/web/search", icon: <BsSearchHeart /> },
    { title: "Terms", lnk: "/web/terms", icon: <BiBriefcase /> },
    { title: "Privacy", lnk: "/web/privacy", icon: <TbWritingSign /> },
    { title: "Contact", lnk: "/web/contact", icon: <BiCategory /> },
    /* { title: "Shop", lnk: "/web/shop", icon: <FiShoppingCart /> },
    { title: "Buy Now", lnk: "/web/buynow", icon: <FaBuysellads /> } */
]

const acctLnks = [
    { title: "Account", lnk: "/web/account/profile", icon: <TbPasswordUser /> },
]

const SrchNavbar = () => {
    const [showNav, setShowNav] = useState(false)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const query = params.get("q") || ""
    const closeNav = () => setShowNav(false)

    return (
        <div>
            <div className={` bg-blue-100 text-black  fixed top-0 left-0 w-full z-[10000] shadow-sm`} style={{ height: `${appConfig.NAVBAR_HEIGHT}px` }}>

                <MobileNav
                    showNav={showNav}
                    closeNav={closeNav}
                />
                <div className={`max-w-full mx-auto flex items-center justify-between h-full gap-4 px-4 sm:px-6`}>

                    {/* Left - Logo and Menu Button */}
                    <div className="flex items-center gap-2 lg:border-r border-blue-700 pr-4">
                        <img
                            src={`/images/favicon-garssete.png`}
                            alt="Garssete"
                            width={30}
                            height={30}
                            className={`w-[25px] h-[25px]`}
                        />
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


                {/** displays only on mobile */}
                <div className={`md:hidden shadow-lg pb-3 z-[1000] bg-white`}>

                    <div className={`h-[10px]`}></div>

                    <div className={`px-[12px] w-full bg-white`}>
                        <form action="/web/search">
                            <div className={`bg-gray-100 w-full rounded-full h-[38px]
                                    flex place-items-center px-2 gap-2 border
                                    border-gray-400/20`}>
                                <BiSearch className={`h-[20px] w-[20px]`} />
                                <input
                                    type="text"
                                    name="q"
                                    placeholder={`Restaurants, Hotels, Cities, Real Estates`}
                                    className={`bg-transparent w-full outline-none
                                            h-full flex place-content-center text-[14px]
                                            `}
                                />
                            </div>
                        </form>
                    </div>
                </div>


            </div>

            <MobileNav
                showNav={showNav}
                closeNav={closeNav}
            />

        </div>
    )
}

export default SrchNavbar



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
            <div className="flex items-center bg-gray-50 rounded-full pl-4 pr-1 py-1 gap-2
            border-[1px] border-gray-500">
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
