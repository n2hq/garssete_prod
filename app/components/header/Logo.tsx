import { Link } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { NavTheme } from '~/lib/types'


const Logo = ({ theme }: NavTheme) => {
    const [navTheme, setNavTheme] = useState('light')
    useEffect(() => {
        setNavTheme(theme)
    }, [theme, navTheme])
    return (
        <div className={`flex place-items-center space-x-1`}>
            <Link to="/">
                <div className={`${theme === 'light' ? 'bg-black text-white' : 'bg-white/90 text-black'}
                relative w-8 h-8 rounded-full overflow-hidden
                `}>
                    <img
                        src={`${theme === "dark" ? "/images/comcerc-logo-light.png" : "/images/comcerc-logo.png"}`}
                        alt="comcerc"
                        className={`object-cover w-full hfull`}
                    />
                </div>
            </Link>

            <Link to="/">
                <span className={`${theme === 'light' ? 'text-blue-900' : 'text-white/90'}
                font-[700] text-2xl tracking-tight relative
                `}>
                    comcerc
                </span>
            </Link>
        </div>
    )
}

export default Logo
