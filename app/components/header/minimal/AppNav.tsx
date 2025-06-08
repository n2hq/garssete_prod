import React, { useEffect, useState } from 'react'
import Logo from '../Logo'
import CenterNav from './CenterNav'
import Hamburger from '../Hamburger'
import UserMenu from '../usermenu/UserMenu'
import { WhiteLogo } from '../WhiteLogo'
import { whiteLogoColor } from '~/lib/css'



const AppNav = ({
    theme,
    openNav,
    navBg,
    setNavBg,
    setTheme,
    _theme }: any) => {

    const [scrollHeight, setScrollHeight] = useState(1)

    useEffect(() => {
        const handler = () => {
            if (window.scrollY >= scrollHeight) { setTheme('dark') }
            if ((window.scrollY < scrollHeight)) { setTheme('light') }
            setScrollHeight(window.scrollY)
        }
        window.onscroll = () => handler()
    }, [scrollHeight])

    return (
        <div className={`${scrollHeight > 10 ? 'shadow-md' : ''}
        ${_theme && 'bg-white'}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0`}>

            <div className={`max-w-[1100px] mx-auto w-full 
              h-full flex place-items-center place-content-between
              ${whiteLogoColor}
              `}>
                <WhiteLogo />


            </div>

        </div>
    )
}

export default AppNav
