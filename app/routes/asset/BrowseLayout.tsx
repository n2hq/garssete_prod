import React from 'react'
import Navbar from '~/components/header/new/Navbar'
import SearchNavbar from '~/components/header/new/SearchNavbar'
import SrchNavbar from '~/components/header/new/SrchNavbar'
import { appConfig } from '~/lib/lib'
import HomeNav from '~/routes/assets/header/HomeNav'

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`h-full w-full`}>
            <SrchNavbar />

            {/*  <div className={`md:hidden mt-[${appConfig.NAVBAR_HEIGHT}px] fixed w-full
            bg-white z-[3000]`}>
                <HomeNav />
            </div>
            */}

            <main className={`h-auto flex w-full flex-col`}>

                {children}
            </main>
        </div>
    )
}

export default BrowseLayout
