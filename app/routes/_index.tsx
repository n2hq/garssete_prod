import React from 'react'
import HomeNav from './zassets/header/HomeNav'
import { HeaderNav } from './zassets/header/HeaderNav'
import { HomepageHero } from './zassets/header/HomepageHero'

const _index = () => {
  return (
    <div className=' h-screen '>
      <div className={`md:hidden`}>
        <HomeNav />
      </div>
      <div className='hidden md:block'>
        <HeaderNav />
      </div>
      <div className={`md:block`}>
        <HomepageHero />
      </div>
    </div>
  )
}

export default _index
