import React, { useEffect, useState } from 'react'
import { formatNumber } from '~/lib/lib'
import { RatingDisplayProp, RatingDisplayType } from '~/lib/types'



const RatingDisplay = ({ data }: RatingDisplayProp) => {
    const [ratingText, setRatingText] = useState('')
    useEffect(() => {
        const getRatingVal = (ratingVal: number) => {
            if (ratingVal > 4) {
                setRatingText('Superb')
            } else if (ratingVal > 3 && ratingVal < 4) {
                setRatingText('Very Good')
            } else if (ratingVal > 2 && ratingVal < 3) {
                setRatingText('Very Good')
            } else if (ratingVal > 1 && ratingVal < 2) {
                setRatingText('Good')
            } else {
                setRatingText('Poor')
            }
        }
        if (data?.rating !== null) {
            getRatingVal(Number(data?.rating))
        } else {
            getRatingVal(0)
        }
    }, [data])

    return (
        <div className={`md:border py-[12px] px-[12px] md:mb-3  
        rounded bg-blue-50`}>
            <div className={`flex place-content-between gap-1
                `}>
                <div className={`flex flex-col place-items-center -space-y-1.5
                    place-content-start w-full `}>
                    <div className={`font-sans text-[13px] font-semibold text-blue-900 flex place-items-start  w-full -ml-[1.5px]`}>Category</div>
                    <div className={` font-normal text-black capitalize text-[11px] tracking-normal  w-full`}>
                        {data?.category}
                    </div>
                </div>
                <div className={`w-full flex flex-col place-items-end place-content-center -space-y-2 `}>
                    <div className={`font-bold tracking-tighter text-[12px] font-sans text-black `}>
                        {ratingText}
                    </div>
                    <div className={`text-[11px] `}>
                        {formatNumber(Number(data?.ratingCount))} reviews
                    </div>
                </div>
                <div className={`flex place-items-center px-[3px]`}>
                    <div className={`min-w-10 w-10 h-10 mt-[-1px] bg-blue-800 flex place-content-center text-white place-items-center rounded`}>
                        {formatNumber(Number(data?.rating))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RatingDisplay
