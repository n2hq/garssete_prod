import React, { useState } from 'react'
import AppNav from './AppNav'
import MobileNav from '../MobileNav'


const ResponsiveNav = ({ theme }: any) => {
    const [showNav, setShowNav] = useState(false)
    const [navBg, setNavBg] = useState(false)
    const [_theme, setTheme] = useState(theme)
    const openNav = () => setShowNav(true)
    const closeNav = () => setShowNav(false)




    return (
        <div>
            <AppNav
                theme={theme}
                openNav={openNav}
                navBg={navBg}
                setNavBg={setNavBg}
                setTheme={setTheme}
                _theme={_theme}
            />
            <MobileNav
                showNav={showNav}
                closeNav={closeNav}
            />
        </div>
    )
}

export default ResponsiveNav
