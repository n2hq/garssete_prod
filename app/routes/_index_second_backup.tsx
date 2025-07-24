import React from 'react'
import HomeNav from './assets/header/HomeNav'
import { HeaderNav } from './assets/header/HeaderNav'
import { HomepageHero } from './assets/header/HomepageHero'
import Recents from './home/Recents'
import { FrontPageCategories } from './assets/FrontPageCategories'
import Footer from '~/components/footer/Footer'
import { MetaFunction } from '@remix-run/react'
import { HomepageCarousel } from './assets/HomeCarousel'
import { TopAd } from '~/components/content/ads/TopAd'

export const meta: MetaFunction = () => {
  return [
    { title: "Garssete | Business Directory, Travel, Real Estate, Hotels & Restaurants!" },
    { name: "Garssete", content: "Welcome to Garssete!" },
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
      {/* <div className={`md:hidden`}>
        <HomepageCarousel />
      </div> */}
      <div className={``}>
        <HomepageHero />
      </div>
      <Recents
        category={'services'}
        limit={8}
        title={`Recent Listings`}
        subtitle={"Recent businesses or entities added by date."}
      />

      <div className={`mt-[48px]`}></div>
      <TopAd />

      <FrontPageCategories />
      <Footer />
    </div>
  )
}

export default _index
