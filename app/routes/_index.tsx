import React, { useEffect, useState } from 'react'

import WhereTo from './homepage/assets/search/SearchBusiness'
import HomeLayout from './landing/assets/HomeLayout'
import SearchBusiness from './homepage/assets/search/SearchBusiness'
import TopCategories from './homepage/assets/topcategories/TopCategories'
import LatestBusinesses from './homepage/assets/latestbusinesses/LatestBusinesses'
import Inspire from './homepage/assets/inspire/Inspire'
import Shopping from './homepage/assets/shopping/Shopping'
import Hotels from './homepage/assets/hotels/Hotels'
import YourGuide from './homepage/assets/yourguide/YourGuide'
import FooterAlt from '~/components/footer/FooterAlt'
import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { getHomeListingByCategory, getLatestBusinesses, getListingByCategory, logError } from '~/lib/lib'
import { useLoaderData } from '@remix-run/react'
import { ListingType } from '~/lib/types'
import { late } from 'zod'
import TopDestinations from './homepage/assets/topdestinations/TopDestinations'
import NotificationDemo, { OperationNotification } from '~/components/content/OperationNotification'
import OperationDemo, { OperationProvider } from '~/context/OperationContext'



export const loader: LoaderFunction = async ({ request, params }) => {


  try {
    const id = params.id || null
    let hotels: ListingType[] | [] = []
    let latestBusinesses: ListingType[] | [] = []
    let gallery
    let ratingData


    try {
      hotels = await getHomeListingByCategory('hotel', 6)
      latestBusinesses = await getLatestBusinesses(10)

      //console.log(latestBusinesses)

    } catch (error: any) {
      console.log(error.message)
    }



    return {
      hotels: hotels,
      latestBusinesses: latestBusinesses

    }
  } catch (err: any) {
    logError(err)
  }

}

type OperationType = 'login' | 'signup' | 'update' | 'processing';

export const meta: MetaFunction<typeof loader> = () => {
  try {

    return [
      { title: "Garssete Inc." },
      { name: "description", content: "Business Directory Services" },
      { name: "keywords", content: "Business Directory, Location Services" },
      { property: "fb:app_id", content: "1325393508603168" },
      { property: "og:url", content: "https://garssete.com" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Garssete.com" },
      { property: "og:description", content: "Business Directory, Location Services" },
      { property: "og:image", content: "/images/logo.svg" },
      { property: "og:image:secure_url", content: "/images/logo.svg" },
      { property: "og:image:type", content: "image/svg+xml" },
      { property: "og:image:width", content: "200" },
      { property: "og:image:alt", content: "Garssete" },
      { name: "twitter:creator", content: "garssete" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Garssete Business Directory" },
      { name: "twitter:description", content: "Business Directory, Location Services" },
    ];
  } catch (e: any) {
    logError(e)
  }

  return []
};

const _index = () => {
  const loader: any = useLoaderData()
  const hotels = loader.hotels
  const latestBusinesses = loader.latestBusinesses


  return (
    <OperationProvider defaultDuration={4000}>

      <HomeLayout>

        {/** background with search */}
        <SearchBusiness />


        {/** top categories */}
        <TopCategories />


        {/** top categories */}
        <Hotels data={hotels} />


        {/** top categories */}
        <YourGuide />


        {/** latest businesses */}
        {/* <LatestBusinesses data={latestBusinesses} /> */}
        <TopDestinations />


        {/** inspire */}
        <Inspire />


        {/** shopping */}
        <Shopping />

        <div className={`h-[100px]`}>

        </div>

        {/** footer */}
        <FooterAlt />
      </HomeLayout>
    </OperationProvider>
  )
}

export default _index
