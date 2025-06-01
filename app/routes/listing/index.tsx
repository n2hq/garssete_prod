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
import HomeNav from '../zassets/header/HomeNav'

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
                {/* <ResponsiveNav theme='light' /> */}
                <div className={`hidden md:block`}>
                    <GenericNav />
                </div>
                <div className={`md:hidden`}>
                    <HomeNav />
                </div>

                {
                    listing.gid !== null && listing.gid !== undefined &&
                    < BusinessLayout
                        listing={listing}
                        images={gallery}
                        ratingsData={ratingsData}
                    />
                }



                <Related
                    category={listing?.category}
                    limit={6}
                    title={`Related: ${listing?.category}`}
                    subtitle={"Related based on the same category."}
                />
                <Footer />
            </GalleryProvider>
        </RatingProvider>
    )
}

export default index