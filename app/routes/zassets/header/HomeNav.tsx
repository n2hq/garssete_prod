import React, { useEffect, useState } from 'react'
import { HiBars3BottomLeft } from 'react-icons/hi2'
import { MdMenu } from 'react-icons/md'
import Hamburger from '~/components/header/Hamburger'
import UserMenu from '~/components/header/usermenu/UserMenu'
import HamburgerMenu from './HamburgerMenu'
import { WhiteLogo } from '~/components/header/WhiteLogo'
import { IoSearchCircleOutline } from 'react-icons/io5'
import { BiSearch } from 'react-icons/bi'
import MobileNav from '~/components/header/MobileNav'

const HomeNav = () => {
    const [scrollHeight,] = useState(1)
    const [theme, setTheme] = useState('')
    const [isScroll, setIsScroll] = useState(false)
    const [showNav, setShowNav] = useState(false)
    const [navBg, setNavBg] = useState(false)
    const openNav = () => setShowNav(true)
    const closeNav = () => setShowNav(false)

    useEffect(() => {


        const handler = () => {
            if (window.scrollY >= scrollHeight) { setIsScroll(true) }
            if ((window.scrollY < scrollHeight)) { setIsScroll(false) }
        }
        window.onscroll = () => handler()
    }, [scrollHeight])

    return (
        <div>
            <MobileNav
                showNav={showNav}
                closeNav={closeNav}
            />
            <div className={`shadow-md pb-3`}>
                <div className={`flex place-content-between
                 fixed w-full mx-auto bg-white
                 px-[12px] h-[50px] z-[600]`}>
                    <div className={`h-full w-[150px]   
                    flex place-items-center `}>
                        <HamburgerMenu theme={"light"} openNav={openNav} navBg={navBg} />
                    </div>
                    <div className={`h-full flex w-full text-[#6001d2]
                    place-content-center place-items-center`}>
                        <WhiteLogo />
                    </div>
                    <div className={`h-full w-[150px] 
                    flex place-items-center place-content-end`}>
                        <UserMenu theme={"light"} />
                    </div>
                </div>
                <div className={`h-[50px]`}></div>

                <div className={`px-[12px]`}>
                    <form action="/web/search">
                        <div className={`bg-gray-100 w-full rounded-full h-[40px]
                    flex place-items-center px-2 gap-2`}>
                            <BiSearch className={`h-[20px] w-[20px]`} />
                            <input
                                type="text"
                                name="q"
                                className={`bg-transparent w-full outline-none
                            h-full flex place-content-center`}
                            />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default HomeNav
