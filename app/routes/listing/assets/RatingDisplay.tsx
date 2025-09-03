import React, { useEffect, useState } from 'react'
import { formatNumber } from '~/lib/lib'
import { RatingDisplayProp, RatingDisplayType } from '~/lib/types'



const RatingDisplay = ({ data }: RatingDisplayProp) => {
    const [ratingText, setRatingText] = useState('')
    useEffect(() => {
        const getRatingVal = (ratingVal: number) => {
            if (ratingVal > 4.5) {
                setRatingText('Excellent')
            }
            if (ratingVal >= 4 && ratingVal < 4.5) {
                setRatingText('Superb')
            } else if (ratingVal > 3.5 && ratingVal < 4) {
                setRatingText('Very Good')
            } else if (ratingVal > 2 && ratingVal <= 3.5) {
                setRatingText('Good')
            } else if (ratingVal > 1 && ratingVal < 2) {
                setRatingText('Poor')
            } else {
                setRatingText('Bad')
            }
        }
        if (data?.rating !== null) {
            getRatingVal(Number(data?.rating))
        } else {
            getRatingVal(0)
        }
    }, [data])

    return (
        <div>
            <div className={`bg-blue-100 w-full px-3 py-3 border border-b-0 rounded-t-md grid grid-cols-2`}>
                {/** left */}
                <div className={`block`}>
                    <div className={`text-[16px] font-semibold`}>
                        Category
                    </div>
                    <div className={`text-sm capitalize line-clamp-1`}>
                        {data?.category} {data?.category}
                    </div>
                </div>


                {/** right */}
                <div className={`flex place-content-between gap-x-1.5`}>
                    {/** left */}
                    <div className={`text-right w-full flex flex-col place-content-center`}>
                        <div className={`text-base font-semibold`}>
                            {data?.ratingCount === 0 ? 'No reviews yet' : ratingText}
                        </div>
                        <div className={`text-sm`}>
                            {formatNumber(Number(data?.ratingCount))} review
                            {Number(data?.ratingCount) > 1 ? 's' : ''}
                        </div>
                    </div>

                    {/** right */}
                    <div className={``}>
                        <div className={`bg-blue-950 h-full w-[40px] rounded-md text-white flex place-items-center place-content-center text-[26px]`}>
                            {Number(data?.rating).toPrecision(2)}
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className={`md:border-t md:border-l md:border-r py-[12px] px-[12px] md:mb-0 rounded-t border-b-[1px] bg-blue-50 rounded-b-none`}>
                <div className={`flex place-content-between gap-1
                `}>
                    <div className={`flex flex-col place-items-center -space-y-1.5
                    place-content-start w-full `}>
                        <div className={`font-sans text-[13px] font-semibold text-blue-900 flex place-items-start  w-full -ml-[1.5px]`}>Category</div>
                        <div className={` font-normal text-black capitalize text-[11px] tracking-normal  w-full`}>
                            {data?.category}
                        </div>
                    </div>
                    <div className={`w-full flex flex-col place-items-end place-content-center -space-y-1.5 `}>
                        <div className={`font-bold tracking-tighter text-[12px] font-sans text-black `}>
                            {data?.ratingCount === 0 ? 'No reviews yet' : ratingText}
                        </div>
                        <div className={`text-[11px] `}>
                            {formatNumber(Number(data?.ratingCount))} review
                            {Number(data?.ratingCount) > 1 ? 's' : ''}
                        </div>
                    </div>
                    <div className={`flex place-items-center px-[3px]`}>
                        <div className={`min-w-10 w-10 h-10 mt-[-1px] bg-blue-800 flex place-content-center text-white place-items-center rounded text-[15px]`}>
                            {formatNumber(Number(data?.rating))}
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default RatingDisplay
