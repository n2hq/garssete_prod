import { navlinks } from '~/lib/json'
import { Link, useLocation } from '@remix-run/react'
import React from 'react'
import { CenterNavProps } from '~/lib/types'

const cnLinks = [
    {
        label: "Page Search",
        url: "/web/search",
    }
]
const CenterNav = ({ theme, navBg }: any) => {
    const location = useLocation();
    return (
        <>
            <div className={`hidden lg:flex place-items-center space-x-14 h-full `}>
                {
                    cnLinks.map((link, index) => {
                        return (
                            <Link key={index} to={link.url}>
                                <span className={`${theme === 'light' ? 'text-black' : 'text-black'}
                                font-normal tracking-tight text-[13px] font-sans
                                hover:text-black/40 bg-gray-50 px-3 
                                py-[5px] rounded-full border-[1px] border-blue-500/30
                               ${location.pathname === link.url && 'bg-blue-300'}
                                `}>
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
