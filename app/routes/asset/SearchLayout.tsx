import React from 'react'
import Navbar from '~/components/header/new/Navbar'
import SearchNavbar from '~/components/header/new/SearchNavbar'
import SrchNavbar from '~/components/header/new/SrchNavbar'
import { appConfig } from '~/lib/lib'
import HomeNav from '~/routes/assets/header/HomeNav'

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`h-full w-full`}>
            <SrchNavbar />

            <div className={`md:hidden mt-[${appConfig.NAVBAR_HEIGHT}px] fixed w-full
            bg-white z-[10000]`}>
                <HomeNav />
            </div>
            <div className={`h-[120px] md:h-[60px]`}></div>
            <main className={`h-full flex w-full flex-col `}>

                {children}
            </main>
        </div>
    )
}

export default SearchLayout
