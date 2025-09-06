import React, { useEffect, useState } from 'react'
import { config, formatNumber, getRandomImage, searchCategories, strToList } from '~/lib/lib';
import { ListingType } from '~/lib/types'
import FormattedAddress from './FormattedAddress';
import RatingBoxRounded from './RatingBoxRounded';
import { BsFillPhoneFill } from 'react-icons/bs';
import { BiPhone } from 'react-icons/bi';



interface CardexProp<T> {
    listing: T;
    index?: number;
}

const Cardex = <T,>({ listing, index }: CardexProp<T>) => {
    const [baseListing, setBaseListing] = useState<ListingType | null>(null)
    const [imgsrc, setImgsrc] = useState('')
    const [bgimgsrc, setBgimgsrc] = useState('')
    const [socialMedia, setSocialMedia] = useState<any | null>(null)
    const [userId, setUserId] = useState('')


    useEffect(() => {
        if (baseListing) {
            if (baseListing?.image_url !== "" && baseListing?.image_url !== null && baseListing?.image_url !== undefined) {
                //console.log(config.IMG_BASE_URL)
                //setImgsrc(config.IMG_BASE_URL + listing?.image_url)
            }

            if (baseListing?.bg_image_url !== "" && baseListing?.bg_image_url !== null && baseListing?.bg_image_url !== undefined) {

                setBgimgsrc(config.IMG_BASE_URL + baseListing?.bg_image_url)
            } else {
                //const img = getRandomImage(defaultBGImages)
                //setBgimgsrc('')
                //setBgimgsrc('https://i.pinimg.com/736x/80/8a/31/808a318aad215c39b4855619b0e87f10.jpg')
            }

            if (baseListing?.username !== "" && baseListing?.username !== null && baseListing?.username !== undefined) {
                setUserId(baseListing?.username)
            } else {
                setUserId(baseListing?.gid)
            }
        }
    }, [baseListing])



    useEffect(() => {
        if (listing) {
            const baseListing: ListingType = listing as unknown as ListingType;
            setBaseListing(baseListing)

            console.log(baseListing)

            setImgsrc(config.IMG_BASE_URL + baseListing?.image_url)
        }
    }, [listing])

    useEffect(() => {
        if (baseListing?.social_media) {
            let socialMedia: any = []
            const separatedMedia = strToList(baseListing?.social_media, ",")

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
    }, [baseListing])

    return (
        <div className={`border py-3 px-3`}>
            <div className={`flex gap-2`}>
                {/** left */}
                <div className={`w-[90px] min-w-[90px] h-[90px] relative`}>
                    <img
                        src={imgsrc}
                        alt=""
                        className={` object-cover w-full h-full border`}
                    />
                </div>

                {/** right */}
                <div className={`flex place-content-between w-full`}>

                    {/** left */}
                    <div className={`w-full  grow block`}>
                        <div className={`text-xl font-normal text-blue-700`}>
                            <a href={`/${userId}`}>
                                {baseListing?.title}
                            </a>
                        </div>

                        <div className={` mt-2 font-bold md:hidden`}>
                            {baseListing?.phone}
                        </div>

                        <div className={`mt-2 md:hidden`}>
                            <FormattedAddress listing={baseListing} />
                        </div>


                        {
                            baseListing?.category !== null && baseListing?.category !== "" &&
                            <div className={`text-[14px] mt-2`}>
                                {searchCategories(baseListing?.category || "")?.name}

                            </div>
                        }
                        {
                            baseListing?.average_rating !== null && baseListing?.average_rating !== "" ?
                                <div className={`mt-2 flex gap-2 place-items-center`}>
                                    <RatingBoxRounded rating={Number(baseListing?.average_rating)} />
                                    <RatingCount averageRating={baseListing?.average_rating} />
                                </div> :
                                <div className={`mt-2 flex gap-2 place-items-center`}>
                                    <RatingBoxRounded rating={Number(3)} />
                                    <RatingCount averageRating={3} />
                                </div>
                        }

                        {
                            baseListing?.website &&
                            <div className={`mt-2`}>
                                <a href={baseListing?.website}
                                    className={`text-blue-700`}
                                >
                                    Website
                                </a>
                            </div>
                        }


                    </div>

                    {/** right */}
                    <div className={`w-[200px] hidden md:block `}>
                        <div className={` text-end font-bold`}>
                            {baseListing?.phone}
                        </div>
                        <div className={` text-end `}>
                            <FormattedAddress listing={baseListing} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={` mt-6`}>
                {
                    baseListing?.short_description &&
                    <div className={`line-clamp-2 mt-2 text-[13px]`}>
                        {baseListing?.short_description}
                    </div>
                }
            </div>

            <div className={`mt-8 max-w-[100%] md:max-w-[50%] w-full`}>

                <div className={` grid grid-cols-2 gap-2 w-full`}>
                    <div className={`w-full`}>
                        <button className={`border border-blue-400 py-[5px] rounded px-2 font-semibold w-full`}>
                            Go to map
                        </button>
                    </div>
                    <div>
                        {
                            baseListing?.phone &&
                            <button className={`bg-blue-700 rounded w-full text-white flex place-items-center place-content-center text-[15px] gap-2 py-[5px]`}>
                                <BiPhone size={20} className={`mt-[2px]`} />
                                <span>Call</span>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cardex


export const RatingCount = ({ averageRating }: any) => {
    const [avgRating, setAvgRating] = useState(0)
    useEffect(() => {
        if (averageRating !== null && averageRating !== undefined) {
            setAvgRating(averageRating)
        }
    }, [averageRating])
    return (
        <div className={`text-blue-700 mt-[3px]`}>
            ({formatNumber(Number(avgRating))})
        </div>
    )
}
