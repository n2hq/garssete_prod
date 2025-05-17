import React, { useState } from 'react'
import MobileNav from '../MobileNav'
import AppNav from './AppNav'


const ResponsiveNav = () => {
    const [showNav, setShowNav] = useState(false)
    const [navBg] = useState(false)
    const openNav = () => setShowNav(true)
    const closeNav = () => setShowNav(false)



    return (
        <div>
            <AppNav openNav={openNav} navBg={navBg} />
            <MobileNav showNav={showNav} closeNav={closeNav} />
        </div>
    )
}

export default ResponsiveNav
