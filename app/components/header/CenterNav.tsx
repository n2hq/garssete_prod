import React from 'react'
import { navlinks } from '~/lib/json'
import { Link } from '@remix-run/react'
import { CenterNavProps } from '~/lib/types'


const CenterNav = ({ navBg }: CenterNavProps) => {
    return (
        <>
            <div className={`hidden lg:flex place-items-center space-x-14 h-full `}>
                {
                    navlinks.map((link, index) => {
                        return (
                            <Link key={index} to={link.url}>
                                <span className={`${navBg ? 'text-white' : 'text-white'}
                                font-light tracking-normal text-[13px] font-sans
                                hover:text-white/40`}>
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
