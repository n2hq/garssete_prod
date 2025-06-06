import React, { useEffect, useState } from 'react'
import { config, formatNumber } from '~/lib/lib'
import StarRating from './ResultItemStarRating'
import RatingBox from './RatingBox'
import { BsBank } from 'react-icons/bs'
import { RiDoubleQuotesL } from 'react-icons/ri'
import { Link } from '@remix-run/react'

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
        <Link to={`/${listing.gid}`}
            className={`cursor-pointer`}
        >
            <div className={`w-full h-fit my-4`}>
                <div className={`flex gap-3`}>
                    {/** left */}
                    <div className={`w-[100px] min-w-[100px]
                    bg-black z-0 h-[110px]
                    rounded-md overflow-hidden
                    relative`}>
                        <img
                            src={imgscr}
                            alt={listing?.title}
                            className={`object-cover w-full h-full 
                                text-sm rounded z-[0]`}
                        />
                        <div className={`w-full h-[40%]
                            absolute z-[10] bottom-0 
                            bg-gradient-to-t from-black/80
                            to-transparent
                            `}></div>
                    </div>

                    {/** right */}
                    <div className={`flex-1 min-w-0 `}>
                        {/** title */}
                        <div className={`text-[19px] 
                    font-bold leading-[1.2em]
                    truncate overflow-hidden
                    `}>
                            {index + 1}. {listing?.title}
                        </div>
                        <div className={`mt-2 flex gap-1
                         place-items-center`}>
                            <RatingBox rating={listing?.average_rating} />
                            <div className={`flex place-items-center
                                gap-1 text-black/60 text-[13px]`}>
                                <div>{listing?.average_rating}</div>
                                <div>({formatNumber(listing?.total_reviews)})</div>
                            </div>
                        </div>
                        <div className={`capitalize mt-1
                            text-[14px] underline`}>
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
        </Link>
    )
}

export default ResultMobile



