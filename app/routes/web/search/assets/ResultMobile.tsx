import React, { useEffect, useState } from 'react'
import { config } from '~/lib/lib'
import StarRating from './ResultItemStarRating'
import RatingBox from './RatingBox'
import { BsBank } from 'react-icons/bs'
import { RiDoubleQuotesL } from 'react-icons/ri'

const ResultMobile = ({ listing, index }: any) => {
    const [imgscr, setImgsrc] = useState('')

    useEffect(() => {
        if (listing?.image_url === "" || listing?.image_url === null) {
            setImgsrc(`https://accuvice.ng/wp-content/uploads/2016/06/placeholder.gif`)
        } else {
            setImgsrc(config.IMG_BASE_URL + listing.image_url)
        }
    }, [listing])
    return (
        <div className={`w-full h-fit my-4`}>
            <div className={`flex gap-3`}>
                <div className={`w-[100px] min-w-[110px]
                    bg-black z-0 h-[110px] 
                    rounded overflow-hidden`}>
                    <img
                        src={imgscr}
                        alt={listing?.title}
                        className={`object-cover w-full h-full text-sm
                            rounded z-0`}
                    />
                </div>
                <div className={`flex-1 min-w-0 `}>
                    {/** title */}
                    <div className={`text-[19px] 
                    font-bold leading-[1.2em]
                    truncate overflow-hidden
                    `}>
                        {index + 1}. {listing?.title}
                    </div>
                    <div className={`mt-2 flex gap-2
                         place-items-center`}>
                        <RatingBox rating={listing?.average_rating} />
                        <div>{listing?.average_rating}</div>
                        <div>({listing?.total_reviews} reviews)</div>
                    </div>
                    <div className={`capitalize mt-1`}>
                        {listing?.category}
                    </div>
                    {
                        listing?.established &&
                        <div className={`flex gap-2 mt-[5px] place-items-center`}>
                            <div>
                                <BsBank />
                            </div>
                            <div className={`flex flex-col gap-y-0 leading-3`}>
                                <div className={`text-[12px] font-bold`}>
                                    Since {listing?.established}
                                </div>
                                <div className={`text-[12px]`}>
                                    In Business
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className={`mt-2 md:mt-3 mb-0 text-[14px] leading-[1.2em]
                                flex place-content-start`}>
                <div className={`relative top-[-3px] z-0 flex`}>
                    <RiDoubleQuotesL className={`tracking-tighter text-[20px]`} />
                </div>
                <div>
                    {
                        listing?.short_description ?
                            `${listing?.short_description?.substring(0, 150)}...` :
                            ''
                    }
                </div>
            </div>
        </div>
    )
}

export default ResultMobile



