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
import Products from './Products';
import Services from './Services';
import SocialMedia from './SocialMedia';
import RatingDisplay from './RatingDisplay';
import { RatingDisplayType } from '~/lib/types';
import RatingBox from '~/routes/web/search/assets/RatingBox';
import { formatNumber } from '~/lib/lib';
import RatingBoxRounded from './RatingBoxRounded';
import ClaimBusiness from './ClaimBusiness';
import LocationWithHours from './LocationWithHours';
import { ReportTime } from '~/lib/ReportTime';


const BusinessLayout = ({
    listing,
    images,
    ratingsData
}: any) => {

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
        if (listing) {
            ReportTime(listing).then((data) => {
                setOperatingHoursStatus(data);
            })

        }
    }, [listing])
    return (
        <div className={``}>
            <div className={`px-[15px] w-full`}>
                <div className={`max-w-[1100px] w-full mx-auto bg-white`}>


                    {
                        ratingsData &&
                        <div className={`mt-4 flex gap-2 place-items-center`}>
                            <RatingBoxRounded rating={ratingsData?.rating_average} />
                            <div className={`flex place-items-center place-content-center
                                    gap-1 text-black/60 text-[14px]`}>
                                <div>{formatNumber(Number(ratingsData?.rating_average))}</div>
                                <div>(<span className='underline'>{formatNumber(ratingsData?.rating_count)} reviews</span>)</div>
                            </div>
                        </div>
                    }

                    {
                        listing && <Header listing={listing} />
                    }

                    {
                        operatingHoursStatus !== undefined &&
                        <div className={`mt-[4px] leading-[1.2em]`}>
                            {
                                operatingHoursStatus.openStatus === "selected_hours" ?
                                    <div>
                                        {operatingHoursStatus.todayHoursFormatted} / {operatingHoursStatus.abbreviation} {operatingHoursStatus.gmtOffsetName}
                                    </div> :
                                    <div>
                                        {
                                            operatingHoursStatus.openStatus === "always_open" && 'Always Open'
                                        }
                                        {
                                            operatingHoursStatus.openStatus === "permanently_closed" && 'Permanently Closed'
                                        }
                                        {
                                            operatingHoursStatus.openStatus === "temporarily_closed" && 'Temporarily Closed'
                                        }
                                    </div>
                            }

                        </div>
                    }
                </div>
            </div>

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

                            {/*  {
                            images && listing &&
                            <Masonry
                                images={images}
                                listing={listing}
                            />
                        } */}

                            <div className={``}>
                                <div className={`lg:hidden ${images?.length <= 0 && 'mt-5'}  md:mt-0 mb-5`}>
                                    {ratingDisplayData && <RatingDisplay data={ratingDisplayData} />}
                                    {listing && <Address businessProfile={listing} />}
                                    {listing && <ClaimBusiness listing={listing} />}
                                    {/* {
                                        listing && <Review listing={listing} />
                                    } */}

                                </div>

                                <div className={`px-[15px] md:px-[0px]`}>
                                    <ShortDescription listing={listing} />

                                    {
                                        listing && operatingHoursStatus && <LocationWithHours listing={listing} operatingHoursStatus={operatingHoursStatus} />
                                    }

                                    <Description listing={listing} />

                                    {listing && <SocialMedia listing={listing} />}

                                    {listing && <BusinessFeatures listing={listing} />}


                                    {listing && <BusinessPhrases listing={listing} />}

                                    {listing && <Products listing={listing} />}

                                    {listing && <Services listing={listing} />}





                                    {listing && <BusinessRatings listing={listing} />}
                                </div>
                            </div>

                        </div>

                        <div className={`col-span-12 lg:col-span-4 hidden lg:block`}>


                            <div className={` sticky top-[100px]`}>
                                {ratingDisplayData && <RatingDisplay data={ratingDisplayData} />}
                                {listing && <Address businessProfile={listing} />}
                                {listing && <ClaimBusiness listing={listing} />}
                                {/* <Review /> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default BusinessLayout
