import React from 'react'
import Logo from './Logo'
import { HiPlay } from 'react-icons/hi2'
import { FaTimes } from 'react-icons/fa'
import { MobileNavProps } from '~/lib/types'
import { mobileLinks, navlinks } from '~/lib/json'
import { Link } from '@remix-run/react'
import LeftNav from '~/routes/web/account/assets/LeftNav'
import { CgChevronRight } from 'react-icons/cg'




const MobileNav = ({
    showNav,
    closeNav
}: MobileNavProps) => {
    const navOpen = showNav ? 'translate-x-0' : 'translate-x-[-100%]'
    const bgOverlay = showNav ? 'block' : 'hidden'

    return (
        <>
            <div>

                {/**overlay */}
                <div onClick={closeNav} className={`transform ${bgOverlay} fixed transition-all duration-500 inset-0 z-[4000] bg-black opacity-20 w-full`}></div>

                {/** navlinks */}
                <div className={`${navOpen} transform transition-all duration-500
                delay-0 fixed  justify-start  h-full
                w-[400px] md:w-[400px] bg-white z-[4001] ${showNav ? 'shadow-lg shadow-black/50' : ''}
                overflow-y-auto
                `}>
                    <div className={`bg-white pt-4 pb-4`}>


                        <div className={`pl-8 md:pl-12`}>
                            <Logo theme='light' />
                        </div>
                    </div>

                    <hr className={` border-t-[1px] border-yellow-500/20`} />

                    <div className={`flex flex-col mt-10 mx-[15px]`}>
                        {
                            mobileLinks.map((link, index) => {
                                return (
                                    <div key={index} className={`mt-[0px]`}>
                                        <Link to={link.link}>
                                            <div className={` flex place-items-center gap-3
                                                hover:bg-gray-200/60 py-1 rounded
                                                place-content-between pr-1`}>
                                                <div className={`w-[40px] h-[40px] rounded-full
                                            place-content-center place-items-center border-gray-300 text-[22px]`}>
                                                    {link.icon}
                                                </div>
                                                <div className={`text-[15px] grow`}>
                                                    {link.title}
                                                </div>
                                                <div className={`text-[17px]`}>
                                                    <CgChevronRight />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div>
                        <hr className={`mt-[20px]`} />
                        <div className={`mt-[20px]`}></div>

                        <LeftNav />
                    </div>

                    <div className={`mt-20`}>

                    </div>

                </div>
            </div>
        </>
    )
}

export default MobileNav
