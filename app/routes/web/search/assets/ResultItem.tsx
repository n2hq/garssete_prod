import { Link } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { BsBank } from 'react-icons/bs'
import { FiArrowRight } from 'react-icons/fi'
import { RiDoubleQuotesL } from 'react-icons/ri'
import { config, formatNumber } from '~/lib/lib'
import RatingBox from './RatingBox'

const ResultItem = ({ listing }: any) => {
    //console.log(listing?.username)
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
            <div className={`flex rounded-sm gap-4 z-0`}>
                {/** left */}
                <div className={`relative min-w-[170px] w-[100px] h-[100px] border
                    bg-white z-0 bg-cover bg-center rounded-lg shadow-md overflow-hidden`}
                    style={{ backgroundImage: `url(${placeholder})` }}
                >
                    <img
                        src={imgscr}
                        alt={listing.title}
                        className={`object-cover w-full h-full text-sm
                            rounded z-0`}
                    />
                    <div className={`w-full h-[50%]
                            absolute z-[10] bottom-0 
                            bg-gradient-to-t from-black/40
                            to-transparent
                            `}></div>
                </div>

                {/** right */}
                <div className=' w-full'>
                    <div className={`md:flex md:place-content-between 
                w-full md:gap-x-[4px]`}>
                        {/** left */}
                        <div className={`w-full md:w-[60%]`}>
                            <Link to={`/${userId}`} onClick={(e: any) => e.stopPropagation()}>
                                <div className={`font-bold text-[17px] text-brown-800
                    leading-[1.1em] hover:underline text-[#001e5a]`}>
                                    {listing.title}
                                </div>
                            </Link>
                            <div className={`mt-2 flex gap-1
                                                     place-items-center`}>
                                <RatingBox rating={listing?.average_rating} />
                                <div className={`flex place-items-center
                                gap-1 text-black/60 text-[13px]`}>
                                    <div>{listing?.average_rating}</div>
                                    <div>
                                        ({`${listing?.total_reviews === null ? 0 : listing?.total_reviews} review${Number(listing?.total_reviews) > 1 ? 's' : ''}`})
                                    </div>
                                </div>
                            </div>
                            <div className={`font-normal text-[13px] leading-[1.2em] mt-[5px]
                    `}>

                                {
                                    listing?.business_phrases ?
                                        `${listing?.business_phrases?.substring(0, 150)}...` :
                                        ''
                                }
                            </div>

                            <div className={`font-normal text-[13px] 
                                    flex place-items-center gap-1 mt-[3px]`}>

                                <div className={`capitalize flex place-items-center gap-1
                                    text-black underline`}>
                                    {listing.category}
                                </div>
                            </div>
                            {
                                listing?.established &&
                                <div className={`flex gap-2 mt-[5px] place-items-center`}>
                                    <div>
                                        <BsBank />
                                    </div>
                                    <div className={`flex flex-col gap-y-[3px] leading-3`}>
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

                        {/** right */}
                        <div className={`w-full lg:w-[40%] hidden 
                                sm:block`}>
                            <div className={`flex flex-col 
                    place-items-end place-content-end
                        font-semibold text-[15px] tracking-tighter`}>
                                {listing.phone}
                            </div>
                            <div className={`flex flex-col text-end text-[12px]
                                leading-[1.2em]`}>
                                {listing?.address_one}
                                {
                                    listing?.address_two ? `, ${listing?.address_two}` : ''
                                }
                                {
                                    listing?.city_name ? `, ${listing?.city_name}` : ''
                                }
                                {
                                    listing?.state_name ? `, ${listing?.state_name}` : ''
                                }
                                {
                                    listing?.country_name ? `, ${listing?.country_name}` : ''
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className={`mt-2 md:mt-3 mb-0 text-[13px] leading-[1.2em]
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




export default ResultItem
