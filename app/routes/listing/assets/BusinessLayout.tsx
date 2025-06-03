import React from 'react'
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


const BusinessLayout = ({
    listing,
    images,
    ratingsData
}: any) => {
    return (
        <div className={``}>
            <div className={`px-[15px] w-full`}>
                <div className={`max-w-[1100px] w-full mx-auto bg-white`}>
                    {
                        ratingsData && <StarRating ratingsData={ratingsData} rating={Number(ratingsData.rating_average)} />
                    }
                    {
                        listing && <Header listing={listing} />
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

                    <div className={`grid grid-cols-12 gap-0 md:gap-0 relative
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
                                <div className={`md:hidden ${images?.length <= 0 && 'mt-5'}  md:mt-0 mb-5`}>
                                    {listing && <Address businessProfile={listing} />}
                                    {/* {
                                        listing && <Review listing={listing} />
                                    } */}

                                </div>

                                <div className={`px-[15px] md:px-[0px]`}>
                                    <ShortDescription listing={listing} />
                                    <BusinessFeatures listing={listing} />
                                    <Description listing={listing} />

                                    {listing && <BusinessRatings listing={listing} />}
                                </div>
                            </div>

                        </div>

                        <div className={`col-span-12 lg:col-span-4 hidden lg:block`}>
                            <div className={` sticky top-[100px]`}>
                                {listing && <Address businessProfile={listing} />}
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
