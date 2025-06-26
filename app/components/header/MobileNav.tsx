import React, { useEffect } from 'react'
import Logo from './Logo'
import { HiHome, HiPlay } from 'react-icons/hi2'
import { FaTimes } from 'react-icons/fa'
import { MobileNavProps } from '~/lib/types'
import { mobileLinks, navlinks } from '~/lib/json'
import { Link, useLocation } from '@remix-run/react'
import LeftNav from '~/routes/web/account/assets/LeftNav'
import { CgChevronRight } from 'react-icons/cg'
import { BiSearch } from 'react-icons/bi'
import { useAuth } from '~/context/AuthContext'
import { WhiteLogo } from './WhiteLogo'
import { FcCancel } from 'react-icons/fc'
import { GiCancel } from 'react-icons/gi'
import { TiCancelOutline } from 'react-icons/ti'
import { IoClose } from 'react-icons/io5'


const cnLinks = [
    {
        title: "Home",
        link: "/",
        icon: <HiHome />
    },
    {
        title: "Page Search",
        link: "/web/search",
        icon: <BiSearch />
    }
]

const MobileNav = ({
    showNav,
    closeNav
}: MobileNavProps) => {
    const navOpen = showNav ? 'translate-x-0' : 'translate-x-[-100%]'
    const bgOverlay = showNav ? 'block' : 'hidden'

    const auth = useAuth()
    if (!auth) { return null }
    const { user } = auth

    const location = useLocation();

    {/** handle escape button */ }
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeNav()
            }
        }

        if (showNav) {
            document.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [showNav, closeNav])

    return (
        <>
            <div>

                {/**overlay */}
                <div onClick={closeNav} className={`transform ${bgOverlay} fixed transition-all duration-500 inset-0 z-[4000] bg-black opacity-20 w-full`}></div>

                {/** navlinks */}
                <div className={`${navOpen} transform transition-all duration-500
                delay-0 fixed  justify-start  h-full
                w-full md:w-[400px] bg-white z-[4001] ${showNav ? 'shadow-lg shadow-black/50' : ''}
                overflow-y-auto
                `}>
                    <div className={`bg-white pt-4 pb-4`}>


                        <div className={`px-4 md:pl-12 text-[#6001d2]
                            flex place-content-between h-[60px] 
                            `}>
                            <div className={`h-full flex justify-center items-center`}>
                                <WhiteLogo />
                            </div>
                            <div className={`h-full flex justify-center items-center`}>
                                <div
                                    onClick={closeNav}
                                    className={`w-[40px] h-[40px] bg-blue-200
                                    rounded-full flex justify-center items-center`}>
                                    <IoClose className={`text-[20px]`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className={` border-t-[1px] border-yellow-500/20`} />

                    <div className={`flex flex-col mt-5 mx-[15px]`}>
                        {
                            cnLinks.map((link, index) => {
                                return (
                                    <div key={index} className={`mt-[0px]`}>
                                        <Link to={link.link}>
                                            <div className={` flex place-items-center gap-3
                                                hover:bg-gray-200/60 py-1 rounded
                                                place-content-between pr-1
                                                ${location.pathname === link.link && 'bg-[#2e374a]/15'}`}>
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

                        {
                            user && <LeftNav />
                        }
                    </div>

                    <div className={`mt-20`}>

                    </div>

                </div>
            </div>
        </>
    )
}

export default MobileNav
