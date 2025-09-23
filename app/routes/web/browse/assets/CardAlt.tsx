import React, { useEffect, useState } from 'react'
import { BiPhone, BiPhoneCall, BiSolidPhone } from 'react-icons/bi'
import { BsFillPhoneFill, BsGeo, BsHeart, BsHeartFill, BsStarFill } from 'react-icons/bs'
import { FaMapLocation } from 'react-icons/fa6'
import { GrMapLocation } from 'react-icons/gr'
import { MdEmail, MdLocationPin } from 'react-icons/md'
import { config, formatNumber, getCardIcon, getRandomImage, searchCategories, strToList } from '~/lib/lib'
import { ListingType } from '~/lib/types'
import RatingBoxAlt from './RatingBoxAlt'
import { list } from 'postcss'

interface CardProp {
    listing: ListingType
    index: number
}

const defaultBGImages = [
    {
        image: '/images/lcape.jpg'
    },
    {
        image: '/images/dohamarina.webp'
    },
    {
        image: '/images/landscapex.jpeg'
    },
    {
        image: '/images/sideviewcar.jpg'
    }
]

const CardAlt = ({ listing, index }: any) => {
    const [listingData, setListingData] = useState<ListingType | null>(null)
    const [imgsrc, setImgsrc] = useState('')
    const [bgimgsrc, setBgimgsrc] = useState('')
    const [socialMedia, setSocialMedia] = useState<any | null>(null)
    const [userId, setUserId] = useState('')


    useEffect(() => {
        if (listing) {
            if (listing?.image_url !== "" && listing?.image_url !== null && listing?.image_url !== undefined) {
                //console.log(config.IMG_BASE_URL)
                //setImgsrc(config.IMG_BASE_URL + listing?.image_url)
            }

            if (listing?.bg_image_url !== "" && listing?.bg_image_url !== null && listing?.bg_image_url !== undefined) {

                setBgimgsrc(config.IMG_BASE_URL + listing?.bg_image_url)
            } else {
                const img = getRandomImage(defaultBGImages)
                //setBgimgsrc('')
                setBgimgsrc('https://i.pinimg.com/736x/80/8a/31/808a318aad215c39b4855619b0e87f10.jpg')
            }

            if (listing?.username !== "" && listing?.username !== null && listing?.username !== undefined) {
                setUserId(listing?.username)
            } else {
                setUserId(listing?.gid)
            }
        }
    }, [listing])



    useEffect(() => {
        if (listing) {
            console.log(listing)
            setListingData(listing)
            setImgsrc(config.IMG_BASE_URL + listing?.image_url)
        }
    }, [listing])

    useEffect(() => {
        if (listing?.social_media) {
            let socialMedia: any = []
            const separatedMedia = strToList(listing?.social_media, ",")

            if (separatedMedia !== null) {

                separatedMedia?.map((mediaString: any, index: number) => {
                    const mediaInfo = strToList(mediaString, "$")
                    const mediaObj = {
                        mediaName: mediaInfo[0],
                        mediaHandle: mediaInfo[1],
                        baseUrl: mediaInfo[2]
                    }
                    socialMedia.push(mediaObj)
                })
            }
            setSocialMedia(socialMedia)

        }


    }, [listing])




    return (
        <div className={` px-[0px] md:px-0 bg-white`}>

            <div className={` w-full md:rounded-xl overflow-hidden `}>

                {/** header */}
                <a href={`/${userId}`}>
                    <div className={`w-full h-[150px] bg-black bg-no-repeat bg-cover relative bg-center`}
                        style={{ backgroundImage: `url('${bgimgsrc}')` }}
                    >
                        <div className={`w-full h-full top-0 left-0 bg-black/0 absolute flex place-items-center place-content-center  `}>
                            {
                                !bgimgsrc &&
                                <div className={`flex place-items-center mt-16 font-poppins mr-2 mb-4 place-content-center w-full h-full font-light text-white/70 text-[12px]`}>
                                    {listing?.title}.
                                </div>
                            }
                        </div>
                        <div className={` flex absolute mt-[30px] ml-[20px] gap-2`}>

                            <RatingStarCenter averageRating={listing?.average_rating} />
                            <RatingCount averageRating={listing?.average_rating} />
                            <ShowEmail />
                        </div>
                    </div>
                </a>



                {/** body */}
                <a href={`/${userId}`}>
                    <div className={`relative h-[140px]`}>
                        {/** logo image */}
                        <div className={`w-[70px] h-[70px] bg-black rounded-full absolute -top-[20px] left-[15px] overflow-hidden`}>
                            <img
                                src={imgsrc}
                                alt=""
                                className={` bg-white object-cover w-full h-full`}
                            />
                        </div>


                        {/** business name and category */}

                        <div className={` absolute left-[100px] top-[6px] -space-y-1 block`}>
                            <div className={`font-semibold text-xl font-poppins line-clamp-1 `}>
                                {listing?.title}
                            </div>
                            <div className={`text-sm capitalize`}>

                                {searchCategories(listing?.category || "")?.name}
                            </div>
                        </div>

                        <div className={`absolute top-[60px]  block w-full `}>
                            <div className={`line-clamp-2 mx-[20px]`}>
                                {listing?.short_description}
                            </div>

                            <div className={` mx-[20px] mt-3 flex gap-2 place-items-center leading-[1.2em] `}>
                                <MdLocationPin className={`text-[25px] text-gray-700 bg-blue-50 relative -left-2`} />

                                <div>
                                    {
                                        `${listing?.address_one}, ${listing?.city_name !== null ? listing?.city_name + ', ' : ''} ${listing?.country_code}`
                                    }

                                </div>
                            </div>
                        </div>



                    </div>
                </a>

                {/** footer */}
                <div className={`border-t pt-2 pb-2 mt-5 `}>
                    <div className={`flex place-content-between mx-[20px] place-items-center mt-[4px] mb-[5px]`}>
                        <div className={` flex place-items-center gap-3 text-[13px] mt-[2px]`}>
                            <a href={`mailto:${listing?.email_address}`} key={34}>
                                <MdEmail size={20} />
                            </a>
                            <a href={`${listing?.phone ? `tel:${listing?.phone}` : `#${index}`}`} key={30}>
                                {
                                    !listing?.phone ?
                                        <BiPhone size={18} className={`text-gray-400`} /> :
                                        <BiPhoneCall size={18} />
                                }


                            </a>
                            {
                                socialMedia !== null &&
                                socialMedia?.map((media: any, index: number) => {
                                    return (
                                        <a href={`${media?.baseUrl}${media?.mediaHandle}`} key={index}>
                                            {getCardIcon(media?.mediaName)}
                                        </a>)
                                })}
                        </div>
                        <div>
                            <a
                                className={`font-normal bg-blue-600 text-white py-[3px] px-[5px] rounded-md hover:shadow-md hover:shadow-gray-400`}
                                href={`${listing?.website ? listing?.website : `#${index}`}`}>
                                Website
                            </a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CardAlt


const DollarTab = ({ currency }: any) => {
    return (
        <div className={`border-none h-[39px] w-[39px] bg-yellow-200/90 text-white rounded-md flex place-content-center place-items-center`}>
            <BsHeartFill className={`text-[30px] text-red-600 relative top-[2px]`} />
        </div>
    )
}

const RatingStarCenter = ({ averageRating }: any) => {
    const [avgRating, setAvgRating] = useState(0)
    useEffect(() => {
        if (averageRating !== null) {
            setAvgRating(averageRating)
        }
    }, [averageRating])

    return (
        <div className={`border border-white/50 flex place-items-center place-content-center rounded-lg px-2 gap-1 bg-black/50 h-[40px]`}>

            <RatingBoxAlt rating={avgRating} />
        </div>
    )
}

const RatingCount = ({ averageRating }: any) => {
    const [avgRating, setAvgRating] = useState(0)
    useEffect(() => {
        if (averageRating !== null) {
            setAvgRating(averageRating)
        }
    }, [averageRating])
    return (
        <div className={`border border-white/40 bg-black/30 w-[40px] h-[40px] rounded-md text-white flex place-items-center place-content-center text-[20px] font-light`}>
            {formatNumber(Number(avgRating))}
        </div>
    )
}

const ShowEmail = ({ }: any) => {
    return (
        <div className={`border border-white/40 bg-black/30 flex place-content-center place-items-center text-white px-2 rounded-md h-[40px]`}>
            View Page
        </div>
    )
}