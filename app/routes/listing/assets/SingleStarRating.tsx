import React from 'react';
import { BiArrowFromBottom, BiArrowToTop, BiRightArrow, BiSolidRightArrow, BiUpArrow } from 'react-icons/bi';
import { BsStar, BsStarFill } from 'react-icons/bs';

type StarRatingProps = {
    rating: number; // rating between 0 and 5
    maxStars?: number;
};

const SingleStarRating = ({ rating = 3.5, maxStars = 5 }: StarRatingProps) => {
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
        if (i <= rating) {
            stars.push(
                <span key={i} className="text-yellow-500 text-xl">
                    <BsStarFill />
                </span>
            );
        } else {
            stars.push(
                <span key={i} className="text-yellow-500 text-xl">
                    <BsStar />
                </span>
            );
        }
    }

    return (
        <div className=' flex w-full place-items-center gap-2 mt-0'>
            <div className={`flex  gap-x-[3px] -mt-[2px]`}>
                {stars}
            </div>
            <div className={`text-gray-400`}>
                <BiSolidRightArrow className={`text-[15px] text-yellow-400`} />
            </div>
            <div className={` text-xl`}>
                Rating: {Number(rating)}
            </div>

        </div>
    )
};

export default SingleStarRating;