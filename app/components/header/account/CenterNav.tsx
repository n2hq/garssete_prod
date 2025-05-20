import { navlinks } from '~/lib/json'
import { Link } from '@remix-run/react'
import React from 'react'
import { CenterNavProps } from '~/lib/types'

const CenterNav = ({ theme, navBg }: any) => {
    return (
        <>
            <div className={`hidden lg:flex place-items-center space-x-14 h-full `}>
                {
                    navlinks.map((link, index) => {
                        return (
                            <Link key={index} to={link.url}>
                                <span className={`${theme === 'light' ? 'text-black' : 'text-white'}
                                font-normal tracking-tight text-[13px] font-sans
                                hover:text-black/40`}>
                                    {link.label}
                                </span>
                            </Link>
                        )
                    })
                }
            </div>
        </>
    )
}

export default CenterNav
