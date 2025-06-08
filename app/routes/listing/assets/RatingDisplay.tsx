import React from 'react'
import { formatNumber } from '~/lib/lib'
import { RatingDisplayProp, RatingDisplayType } from '~/lib/types'



const RatingDisplay = ({ data }: RatingDisplayProp) => {

    return (
        <div className={`
             md:border py-[12px] px-[12px] md:mb-3  rounded`}>
            <div className={`flex place-content-between gap-1
                                        `}>
                <div className={`flex flex-col`}>
                    <div className={`font-sans text-[16px]
                                                font-bold text-blue-700`}>
                        Category
                    </div>
                    <div className={` -mt-[4px]
                                                font-normal text-black capitalize
                                                text-[12px] tracking-normal`}>
                        {data?.category}
                    </div>
                </div>
                <div className={`w-full flex flex-col place-items-end
                                        place-content-center`}>
                    <div className={`font-bold tracking-tighter
                                            text-[15px] font-sans text-black
                                            `}>
                        Very Good
                    </div>
                    <div className={`text-[11px] mt-[-2px]`}>
                        {formatNumber(Number(data?.ratingCount))} reviews
                    </div>
                </div>
                <div className={`min-w-10 w-10 h-10 mt-[-1px]
                                        bg-blue-800 text-white flex
                                        place-content-center place-items-center
                                         rounded px-[3px]
                                        `}>
                    {formatNumber(Number(data?.rating))}
                </div>
            </div>
        </div>
    )
}

export default RatingDisplay
