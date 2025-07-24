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
    const [scrollHeight, setScrollHeight] = useState(1)
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
            setScrollHeight(window.scrollY)
        }
        window.onscroll = () => handler()
    }, [scrollHeight])

    return (
        <div>
            <MobileNav
                showNav={showNav}
                closeNav={closeNav}
            />
            <div className={`shadow-lg pb-3 z-[1000]`}>
                <div className={`${scrollHeight > 50 ? 'shadow-lg' : ''} flex place-content-between
                 fixed w-full mx-auto bg-white
                 px-[15px] h-[50px] z-[1000]`}>
                    <div className={`h-full w-[150px]   
                    flex place-items-center `}>
                        <HamburgerMenu theme={"light"} openNav={openNav} navBg={navBg} />
                    </div>
                    <div className={`h-full flex w-full 
                    place-content-center place-items-center`}>
                        <WhiteLogo />
                    </div>
                    <div className={`h-full w-[150px] 
                    flex place-items-center place-content-end`}>
                        <UserMenu theme={"light"} />
                    </div>
                </div>
                <div className={`h-[50px]`}></div>

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
    )
}

export default HomeNav
