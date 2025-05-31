import React, { useEffect, useState } from 'react'
import Logo from '../Logo'
import CenterNav from './CenterNav'
import Hamburger from '../Hamburger'
import UserMenu from '../usermenu/UserMenu'



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
        <div className={`${_theme === 'dark' ? 'bg-[#001e5a]' : 'bg-white'}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0
        `}>

            <div className={` mx-auto w-full
              h-full flex place-items-center place-content-between
              `}>
                <Logo theme={_theme} />
                <CenterNav theme={_theme} navBg={navBg} />
                <div className={`flex place-items-center gap-4`}>
                    <UserMenu theme={_theme} />
                    <Hamburger theme={_theme} openNav={openNav} navBg={navBg} />
                </div>
            </div>

        </div>
    )
}

export default AppNav
