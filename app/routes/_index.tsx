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
import Layout from './landing/assets/layout'
import Navbar from '~/components/header/new/Navbar'
import HeroSection from './landing/assets/HeroSection'
import FeaturesSection from './landing/assets/FeaturesSection'
import DiscoverSection from './landing/assets/DiscoverSection'
import CallToActionSection from '../components/content/CallToActionSection'
import FooterSection from './landing/assets/FooterSection'
import SrchNavbar from '~/components/header/new/SrchNavbar'

export const meta: MetaFunction = () => {
  return [
    { title: "Garssete | Business Directory, Travel, Real Estate, Hotels & Restaurants!" },
    { name: "Garssete", content: "Welcome to Garssete!" },
  ];
};

const _index = () => {
  return (
    <Layout>

      <HeroSection />
      <FeaturesSection />
      <DiscoverSection />
      <CallToActionSection />
      <FooterSection />
    </Layout>
  )
}

export default _index
