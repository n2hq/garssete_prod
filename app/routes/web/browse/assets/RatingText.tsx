import React from 'react'

const RatingText = ({ listing }: any) => {
    return (
        <div className={`flex flex-col text-black/60 -space-y-2 place-items-center place-content-center `}>
            {
                listing?.average_rating &&
                <div className={`font-bold text-[12px]`}>{listing?.average_rating}</div>
            }

            <div className={` tracking-tighter text-[12px]`}>
                {`${listing?.total_reviews === null ? 0 : listing?.total_reviews} review${Number(listing?.total_reviews) > 1 ? 's' : ''}`}
            </div>
        </div>
    )
}

export default RatingText
