import React from 'react'

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
import { LoaderFunction } from '@remix-run/node'
import { getHomeListingByCategory, getLatestBusinesses, getListingByCategory, logError } from '~/lib/lib'
import { useLoaderData } from '@remix-run/react'
import { ListingType } from '~/lib/types'
import { late } from 'zod'
import TopDestinations from './homepage/assets/topdestinations/TopDestinations'


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

const homepage = () => {
    const loader: any = useLoaderData()
    const hotels = loader.hotels
    const latestBusinesses = loader.latestBusinesses

    return (
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
    )
}

export default homepage
