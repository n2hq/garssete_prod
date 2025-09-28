import React, { useEffect, useState } from 'react'
import { formatNumber, searchCategories } from '~/lib/lib'
import { RatingDisplayProp, RatingDisplayType } from '~/lib/types'



const RatingDisplay = ({ data }: RatingDisplayProp) => {

    const [ratingText, setRatingText] = useState('')
    const [hasDecimalNumber, setHasDecimalNumber] = useState(false)


    const hasDecimal = (value: number) => {
        const strValue = value.toFixed(1).replace(/\.0$/, ""); // show "4" instead of "4.0"
        const hasDecimal = strValue.includes(".");
        return hasDecimal
    }

    useEffect(() => {
        if (data) {
            //const hasDec = hasDecimal(Number(data?.rating))
            const hasDec = hasDecimal(Number(data?.rating))
            setHasDecimalNumber(hasDec)
        }
    }, [data])


    useEffect(() => {
        const getRatingVal = (ratingVal: number) => {
            if (ratingVal > 4.5) {
                setRatingText('Excellent')
            } else if (ratingVal >= 4 && ratingVal < 4.5) {
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
            <div className={`bg-blue-100 w-full px-3 py-3 border border-b-0 rounded-t-2xl grid grid-cols-2`}>
                {/** left */}
                <div className={`block`}>
                    <div className={`text-[16px] font-semibold`}>
                        Category
                    </div>
                    <div className={`text-sm capitalize line-clamp-1`}>
                        {searchCategories(data?.category || "")?.name}
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
                        <div className={`bg-blue-950 font-poppins h-[40px] w-[40px] rounded-xl text-white flex place-items-center place-content-center ${hasDecimalNumber ? 'text-[26px]' : 'text-[36px]'}`}>
                            {formatNumber(Number(data?.rating))}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default RatingDisplay
