import React, { useEffect, useState } from 'react'
import { config, formatNumber } from '~/lib/lib'
import StarRating from './ResultItemStarRating'
import RatingBox from './RatingBox'
import { BsBank } from 'react-icons/bs'
import { RiDoubleQuotesL } from 'react-icons/ri'
import { Link } from '@remix-run/react'

const ResultMobile = ({ listing, index }: any) => {
    const [placeholder, setPlaceholder] = useState('/images/imgplaceholder2.jpg')
    const [imgscr, setImgsrc] = useState('/images/imgplaceholder2.jpg')
    const [userId, setUserId] = useState('')

    useEffect(() => {
        if (listing) {
            if (listing?.image_url !== "" || listing?.image_url !== null) {

                //console.log(config.IMG_BASE_URL)
                setImgsrc(config.IMG_BASE_URL + listing?.image_url)
            }

            if (listing?.username !== "" && listing?.username !== null && listing?.username !== undefined) {
                setUserId(listing?.username)
            } else {
                setUserId(listing?.gid)
            }
        }
    }, [listing])
    return (
        <div className={` cursor-pointer mt-6 z-0 pb-6`} onClick={(e) => {
            window.location.href = `/${userId}`
        }}>
            <div className={`w-full h-fit my-4`}>
                <div className={`flex gap-[10px]`}>
                    {/** left */}
                    <div className={`w-[90px] min-w-[90px]
                    bg-transparent z-0 h-[80px]
                    rounded-md overflow-hidden
                    relative`}
                        style={{ backgroundImage: `url(${placeholder})` }}
                    >
                        <img
                            src={imgscr}
                            alt={listing?.title}
                            className={`object-cover w-full h-full 
                                text-sm rounded z-[0]`}
                        />
                        <div className={`w-full h-[40%]
                            absolute z-[10] bottom-0 
                            bg-gradient-to-t from-black/40
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
                                <div>{(Number(listing?.average_rating))},</div>
                                <div className={`leading-[1.2em]`}>
                                    ({`${(listing?.total_reviews)} review${Number(listing?.total_reviews) > 1 ? 's' : ''}`})
                                </div>
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
                                <div className={`flex flex-col gap-y-1 leading-3`}>
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
        </div>
    )
}

export default ResultMobile



