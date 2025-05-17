import React, { useEffect, useState } from 'react'
import Logo from '../Logo'
import CenterNav from '../CenterNav'
import SigninMenu from '../SigninMenu'
import { NavProps } from '~/lib/types'


const AppNav = ({ openNav }: NavProps) => {
    const [navBg, setNavBg] = useState(false)
    const [scrollHeight,] = useState(1)

    useEffect(() => {
        const handler = () => {
            if (window.scrollY >= scrollHeight) { setNavBg(true) }
            if ((window.scrollY < scrollHeight)) { setNavBg(false) }
        }
        window.onscroll = () => handler()
    }, [scrollHeight])

    return (
        <div className={`${navBg ? 'bg-gray-800' : 'bg-black/30'}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition-all ease-in-out duration-0`}>

            <div className={`max-w-[1100px] mx-auto w-full
              h-full flex place-items-center place-content-between
              `}>
                <Logo theme='dark' />
                <CenterNav navBg={navBg} />
                <SigninMenu openNav={openNav} navBg={navBg} />
            </div>

        </div>
    )
}

export default AppNav
