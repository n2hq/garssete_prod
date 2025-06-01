import React from 'react'
import HomeNav from './zassets/header/HomeNav'
import { HeaderNav } from './zassets/header/HeaderNav'
import { HomepageHero } from './zassets/header/HomepageHero'
import Recents from './home/Recents'
import { FrontPageCategories } from './zassets/FrontPageCategories'
import Footer from '~/components/footer/Footer'

const _index = () => {
  return (
    <div className=' h-screen '>
      <div className={`md:hidden`}>
        <HomeNav />
      </div>
      <div className='hidden md:block'>
        <HeaderNav />
      </div>
      <div className={`hidden md:block`}>
        <HomepageHero />
      </div>
      <Recents
        category={'services'}
        limit={8}
        title={`Recent Listings`}
        subtitle={"Recent businesses or entities added by date."}
      />

      <FrontPageCategories />
      <Footer />
    </div>
  )
}

export default _index
