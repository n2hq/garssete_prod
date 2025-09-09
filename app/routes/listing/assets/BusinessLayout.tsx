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
    profileImageData
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
            try {
                ReportTime(listing).then((data) => {

                    setOperatingHoursStatus(data);
                })
            } catch (e: any) {
                logError(e)
            }

        }
    }, [listing])
    return (
        <div>

        </div>
    )
}


export default BusinessLayout
