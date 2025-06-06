import React from 'react'
import HomeNav from './assets/header/HomeNav'
import { HeaderNav } from './assets/header/HeaderNav'
import { HomepageHero } from './assets/header/HomepageHero'
import Recents from './home/Recents'
import { FrontPageCategories } from './assets/FrontPageCategories'
import Footer from '~/components/footer/Footer'
import { MetaFunction } from '@remix-run/react'
import { HomepageCarousel } from './assets/HomeCarousel'

export const meta: MetaFunction = () => {
  return [
    { title: "Grüthe | Business Directory, Travel, Real Estate, Hotels & Restaurants!" },
    { name: "Gr<i>ü</i>the", content: "Welcome to Grüthe!" },
  ];
};

const _index = () => {
  return (
    <div className=' h-screen '>
      <div className={`md:hidden`}>
        <HomeNav />
      </div>
      <div className='hidden md:block'>
        <HeaderNav />
      </div>

      {/** hero or carousel */}

      <div className={`h-full`}>
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
