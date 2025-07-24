import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import SearchHead from '~/components/content/SearchHead'
import ResponsiveNav from '~/components/header/lite/ResponsiveNav'
import { GalleryProvider } from '~/context/GalleryContext'
import RatingProvider from '~/context/RatingContext'
import { getBusinessGallery, getPage, getRatingsReviews, getSearch } from '~/lib/lib'
import BusinessLayout from './assets/BusinessLayout'
import Footer from '~/components/footer/Footer'
import Related from './assets/Related'
import GenericNav from '~/components/header/generic/GenericNav'
import HomeNav from '../assets/header/HomeNav'
import { TopAd } from '~/components/content/ads/TopAd'
import SearchNavbar from '~/components/header/new/SearchNavbar'
import Layout from '../asset/NormalLayout'
import CallToActionSection from '../landing/assets/CallToActionSection'
import FooterSection from '../landing/assets/FooterSection'
import VerticalHeight from '../asset/VerticalHeight'

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = params.id || null
    let listing = await getPage(id)
    const gallery = await getBusinessGallery(listing.gid)
    const ratingData = await getRatingsReviews(listing.gid)

    return {
        listing: listing,
        gallery: gallery,
        ratingsData: ratingData
    }
}

const index = () => {
    const data: any = useLoaderData()
    const listing: any = data.listing
    const gallery: any = data.gallery
    const ratingsData: any = data.ratingsData

    return (
        <RatingProvider>
            <GalleryProvider>
                <Layout>
                    
                
                <div className={`md:hidden`}>
                    <HomeNav />
                </div>

                <TopAd />

                {
                    listing.gid !== null && listing.gid !== undefined &&
                    < BusinessLayout
                        listing={listing}
                        images={gallery}
                        ratingsData={ratingsData}
                    />
                }



                {
                    listing &&
                    <Related
                        category={listing?.category}
                        limit={6}
                        title={`Related: ${listing?.category}`}
                        subtitle={"Related based on the same category."}
                    />
                    }
                <VerticalHeight />
                <CallToActionSection />
                <FooterSection />
            </Layout>
            </GalleryProvider>
            
        </RatingProvider>
    )
}

export default index