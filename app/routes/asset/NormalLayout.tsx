import React from 'react'
import Navbar from '~/components/header/new/Navbar'
import SearchNavbar from '~/components/header/new/SearchNavbar'
import { appConfig } from '~/lib/lib'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className={`h-full w-full`}>
          <SearchNavbar />
          <main className={`h-full flex w-full flex-col mt-[${appConfig.NAVBAR_HEIGHT}px]`}
          
      >
        
              {children}
          </main>
    </div>
  )
}

export default Layout
