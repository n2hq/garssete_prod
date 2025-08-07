import React from 'react';
import { BiArrowFromBottom, BiArrowToTop, BiRightArrow, BiSolidRightArrow, BiUpArrow } from 'react-icons/bi';
import { BsCircle, BsCircleFill, BsStar, BsStarFill } from 'react-icons/bs';

type StarRatingProps = {
    rating: number; // rating between 0 and 5
    maxStars?: number;
    ratingsData: any
};

const StarRatingAlt = ({
    ratingsData,
    rating = 3.5,
    maxStars = 5
}: StarRatingProps) => {
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
        if (i <= rating) {
            stars.push(
                <span key={i} className="text-green-700 text-md">
                    <BsCircleFill />
                </span>
            );
        } else {
            stars.push(
                <span key={i} className={`text-green-700 text-md rounded-full
                overflow-hidden`}>
                    <BsCircle className={`bg-green-100`} />
                </span>
            );
        }
    }

    return (
        <div className=' flex w-full place-items-center gap-2'>
            <div className={` text-[17px]`}>
                {rating}
            </div>
            <div className={`flex  gap-x-[3px] -mt-[2px]`}>
                {stars}
            </div>

            <div className={`text-sm`}>
                ({Number(ratingsData.rating_count)} reviews)
            </div>
        </div>
    )
};

export default StarRatingAlt;