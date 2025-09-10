import React, { useEffect, useState } from 'react'
import Header from './Header'
import Masonry from './Masonry';
import PreDescription from './ShortDescription';
import Description from './Description';
import Address from './Address';
import Review from './Review';
import Rating from '../../../context/RatingContext';
import StarRating from './StarRating';
import BusinessFeatures from './BusinessFeatures';
import ShortDescription from './ShortDescription';
import UserReviews from './BusinessRatings';
import BusinessRatings from './BusinessRatings';
import ImageBlock from './ImageBlock';
import { list } from 'postcss';
import { ListingCarousel } from './ListingCarousel';
import BusinessPhrases from './BusinessPhrases';

import Services from './Services';
import SocialMedia from './SocialMedia';
import RatingDisplay from './RatingDisplay';
import { RatingDisplayType } from '~/lib/types';
import RatingBox from '~/routes/web/search/assets/RatingBox';
import { formatNumber, logError } from '~/lib/lib';
import RatingBoxRounded from './RatingBoxRounded';
import ClaimBusiness from './ClaimBusiness';
import LocationWithHours from './LocationWithHours';
import { ReportTime } from '~/lib/ReportTime';
import RatingBoxSquare from './RatingBoxSquare';
import Videos from './Videos';
import Products from './products/Products';



const BusinessLayout = ({
    listing,
    images,
    ratingsData,
    videoGallery,
    products,
    profileImageData,
    reportTime
}: any) => {
    //console.log(profileImageData)
    const [ratingDisplayData, setRatingDisplayData] = useState<RatingDisplayType>()
    const [operatingHoursStatus, setOperatingHoursStatus] = useState<any | undefined>(undefined)

    useEffect(() => {
        if (listing && ratingsData) {
            setRatingDisplayData({
                totalReviews: 0,
                category: listing?.category,
                rating: ratingsData.rating_average,
                ratingCount: ratingsData.rating_count
            })
        }
        //console.log(JSON.stringify(listing.category))
    }, [listing, ratingsData])

    useEffect(() => {
        if (listing && reportTime) {

            setOperatingHoursStatus(reportTime);

        }
    }, [listing, reportTime])
    return (
        <div className={`mt-5`}>
            <div className={`px-[15px] w-full`}>
                <div className={`max-w-[1100px] w-full mx-auto bg-white`}>


                    {
                        ratingsData &&
                        <div className={`mt-4 flex gap-2 place-items-center`}>
                            <RatingBoxSquare rating={Number(ratingsData?.rating_average)} />
                            <div className={`flex place-items-center place-content-center
                                    gap-1 text-black/60 text-[14px]`}>
                                <div>{formatNumber(Number(ratingsData?.rating_average))}</div>
                                <div>(<span className='underline'>{formatNumber(ratingsData?.rating_count)} reviews</span>)</div>
                            </div>
                        </div>
                    }

                    {
                        listing && (profileImageData) &&
                        <Header
                            listing={listing}
                            profileImageData={profileImageData}
                            operatingHoursStatus={operatingHoursStatus}
                            ratingsData={ratingsData}
                        />
                    }


                </div>

            </div>

            {
                videoGallery.length > 0 &&
                <Videos
                    videoGallery={videoGallery}
                    listing={listing}
                />
            }

            {
                images?.length > 0 && listing &&
                <div className={`bg-black h-fit md:hidden
                            mt-4`}>
                    <ListingCarousel
                        images={images}
                        listing={listing}
                    />

                </div>
            }

            <div className={` md:pt-4 md:px-[12px]`}>
                <div className={`max-w-[1100px] w-full mx-auto bg-white`}>
                    <div className={`grid grid-cols-12 gap-0 md:gap-4 relative
                    `}>
                        <div className={` col-span-12 lg:col-span-8`}>
                            <div className={`hidden md:block mt-0`}>
                                {
                                    images?.length > 0 && listing &&
                                    <ImageBlock
                                        images={images}
                                        listing={listing}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default BusinessLayout
