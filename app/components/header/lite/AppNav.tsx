import React, { useEffect, useState } from 'react'
import Logo from '../Logo'
import CenterNav from './CenterNav'
import Hamburger from '../Hamburger'
import UserMenu from '../usermenu/UserMenu'
import { useLocation } from '@remix-run/react'



const AppNav = ({
    theme,
    openNav,
    navBg,
    setNavBg,
    setTheme,
    _theme }: any) => {

    const [scrollHeight,] = useState(1)

    useEffect(() => {
        const handler = () => {
            if (window.scrollY >= scrollHeight) { setTheme('dark') }
            if ((window.scrollY < scrollHeight)) { setTheme('light') }
        }
        window.onscroll = () => handler()
    }, [scrollHeight])

    return (
        <div className={`${_theme === 'light' ? 'bg-transparent' : 'bg-[#001e5a]'}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0`}>

            <div className={`max-w-[1100px] mx-auto w-full gap-5
              h-full flex place-items-center place-content-between
              `}>
                <Logo theme={_theme} />
                <div className={` w-full`}>
                    <CenterNav theme={_theme} navBg={navBg} />
                </div>
                <div className={`flex place-items-center gap-4`}>
                    <UserMenu theme={_theme} />
                    <Hamburger theme={_theme} openNav={openNav} navBg={navBg} />
                </div>
            </div>

        </div>
    )
}

export default AppNav
