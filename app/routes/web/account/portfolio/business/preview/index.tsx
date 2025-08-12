import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import SearchHead from '~/components/content/SearchHead'
import ResponsiveNav from '~/components/header/lite/ResponsiveNav'
import { GalleryProvider } from '~/context/GalleryContext'
import RatingProvider from '~/context/RatingContext'
import { config, getBusinessGallery, getBusinessProfileImageData, getOperatingHours, getPage, getRatingsReviews, getSearch } from '~/lib/lib'
import BusinessLayout from './assets/BusinessLayout'
import Footer from '~/components/footer/Footer'
import Related from './assets/Related'
import GenericNav from '~/components/header/generic/GenericNav'
import HomeNav from '~/routes/assets/header/HomeNav'
import { TopAd } from '~/components/content/ads/TopAd'
import SearchNavbar from '~/components/header/new/SearchNavbar'
import Layout from '~/routes/asset/NormalLayout'
import CallToActionSection from '~/components/content/CallToActionSection'
import FooterSection from '~/routes/landing/assets/FooterSection'
import VerticalHeight from '~/routes/asset/VerticalHeight'
import ResourceNotFound from './assets/ResourceNotFound'

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = params.id || null
    let listing = await getPage(id)
    let profileImageData = await getBusinessProfileImageData(listing?.gid)
    const gallery = await getBusinessGallery(listing.gid)
    const ratingData = await getRatingsReviews(listing.gid)


    return {
        listing: listing,
        gallery: gallery,
        ratingsData: ratingData,
        profileImageData: profileImageData
    }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    const listing = data?.listing
    const profileImageData = data?.profileImageData

    const profileImageLink = config.IMG_BASE_URL + profileImageData?.image_url
    const mimetype = profileImageData?.mimetype
    //console.log(profileImageData)

    const getKeyWords = (texts: string | null): string[] | null => {
        if (texts === null || texts === undefined || texts === "") {
            return null
        }
        const cleaned = texts.replace(/&/g, ',');

        // Step 2: Split by comma and trim each part
        const arr = cleaned
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);

        return arr
    }

    const keywords: string[] | null = getKeyWords(listing?.business_phrases || null)

    return [
        { title: listing?.title || "Garssete Inc." },
        { name: "description", content: listing?.short_description },
        { name: "keywords", content: keywords },
        { property: "fb:app_id", content: "1325393508603168" },
        { property: "og:url", content: listing?.website || "https://garssete.com" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: listing?.title || "Garssete.com" },
        { property: "og:description", content: listing?.short_description },
        { property: "og:image", content: profileImageLink },
        { property: "og:image:secure_url", content: profileImageLink },
        { property: "og:image:type", content: mimetype },
        { property: "og:image:width", content: "200" },
        { property: "og:image:alt", content: listing?.title || "Garssete" },
        { name: "twitter:creator", content: "garssete" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: listing?.title || "Garssete Directory Listing" },
        { name: "twitter:description", content: listing?.short_description },
    ];
};

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
                        listing?.category !== undefined ?
                            <Related
                                category={listing?.category}
                                limit={6}
                                title={`Related: ${listing?.category}`}
                                subtitle={"Related based on the same category."}
                            /> :
                            <ResourceNotFound />
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