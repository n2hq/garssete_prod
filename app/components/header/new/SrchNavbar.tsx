import { Link, useLocation } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { BiBriefcase, BiCategory, BiSearch } from 'react-icons/bi'
import { FaAngleDown, FaBuysellads, FaDemocrat } from 'react-icons/fa'
import { appConfig, getUserProfileImageData } from '~/lib/lib'
import UserMenu from '../usermenu/UserMenu'
import { TbPasswordUser, TbWritingSign } from 'react-icons/tb'
import { FiShoppingCart } from 'react-icons/fi'
import HamburgerSecondary from '../HamburgerSecondary'
import MobileNav from '../MobileNav'
import { BsHeart, BsSearchHeart } from 'react-icons/bs'
import HomeNav from '~/routes/assets/header/HomeNav'
import { lnks } from '~/lib/json'
import { useAuth } from '~/context/AuthContext'



const acctLnks = [
    { title: "Account", lnk: "/web/account/profile", icon: <TbPasswordUser /> },
]

const SrchNavbar = () => {
    const auth = useAuth()
    if (!auth) { return null }
    const { user } = auth

    const [showNav, setShowNav] = useState(false)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const query = params.get("q") || ""
    const closeNav = () => setShowNav(false)
    const [userProfileImgData, setUserProfileImgData] = useState<any | null>(null)

    useEffect(() => {

        const getUserImageData = async (guid: string) => {
            const userProfile: any = await getUserProfileImageData(guid)
            setUserProfileImgData(userProfile)
            //console.log(userProfile?.image_url)
        }

        if (user?.guid !== null) {

            getUserImageData(user?.guid)
        }
    }, [user])

    return (
        <div className={``}>
            <div className={` bg-[blue] text-white  fixed top-0 left-0 w-full z-[1000] shadow-lg shadow-black/30`}
                style={{ height: `${appConfig.NAVBAR_HEIGHT}px` }}>

                <MobileNav
                    showNav={showNav}
                    closeNav={closeNav}
                />
                <div className={`max-w-full mx-auto flex items-center justify-between h-full gap-4 px-4 sm:px-6`}>

                    {/* Left - Logo and Menu Button */}
                    <div className="flex items-center gap-1 lg:border-r border-blue-700 pr-4">
                        <div className={`relative w-[25px] h-[25px] overflow-hidden `}>
                            <img
                                src={`/images/gssico.png`}
                                alt="Garssete"
                                width={30}
                                height={30}
                                className={` object-cover w-full h-full`}
                            />
                        </div>
                        <Link to="/" className="text-3xl font-extrabold tracking-tight font-poppins">
                            Garssete
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
                        <UserMenu theme='light' userProfileImgData={userProfileImgData} />
                        <HamburgerSecondary theme='dark' openNav={() => setShowNav(true)} navBg={false} />
                    </div>

                </div>


                {/** displays only on mobile */}
                <div className={`md:hidden shadow-lg pb-3 z-[1000] bg-white`}>

                    <div className={`h-[10px]`}></div>

                    <div className={`px-[12px] w-full bg-white`}>
                        <form action="/web/browse">
                            <div className={`bg-gray-100 w-full rounded-full h-[38px]
                                    flex place-items-center px-2 gap-2 border
                                    border-gray-900`}>
                                <BiSearch className={`h-[20px] w-[20px] text-gray-500`} />
                                <input
                                    type="text"
                                    name="q"
                                    defaultValue={query}
                                    placeholder={`Restaurants, Hotels, Cities, Real Estates`}
                                    className={`bg-transparent w-full outline-none
                                            h-full flex place-content-center text-[14px]
                                            text-black`}
                                />
                            </div>
                        </form>
                    </div>
                </div>


            </div>



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


    return <Link key={index} to={link.lnk} className={`flex items-center font-light text-[15px] hover:underline `}>
        {link.icon}
        <span className={`mx-1 ${location.pathname === link.lnk && 'underline text-white'}`}>{link.title}</span>
        <FaAngleDown className="text-xs" />
    </Link>
}


export const SearchBox = ({ query }: any) => {
    return (
        <form action="/web/browse" className="text-sm w-full max-w-md">
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
