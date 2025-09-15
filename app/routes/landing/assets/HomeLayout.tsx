import React from 'react'
import Navbar from '~/components/header/new/Navbar'
import NormalNavbar from '~/components/header/new/NormalNavbar'
import SearchNavbar from '~/components/header/new/SearchNavbar'
import SrchBarHome from '~/components/header/new/SrchBarHome'
import SrchNavbar from '~/components/header/new/SrchNavbar'
import { appConfig } from '~/lib/lib'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`h-full w-full`}>
      <SrchBarHome />

      <main className={`h-full flex w-full flex-col mt-[${appConfig.NAVBAR_HEIGHT}px]`}

      >

        {children}
      </main>
    </div>
  )
}

export default HomeLayout
