import React, { useEffect, useState } from 'react'
import { BiBuilding, BiPhone, BiSolidStar, BiStar } from 'react-icons/bi'
import { BsBank, BsInstagram, BsLinkedin, BsPinterest, BsTwitterX, BsYoutube } from 'react-icons/bs'
import { CgFacebook, CgTwitter, CgWebsite } from 'react-icons/cg'
import { FaFacebook, FaLinkedinIn, FaYoutubeSquare } from 'react-icons/fa'
import { GrYoutube } from 'react-icons/gr'
import RatingBox from './RatingBox'
import RatingText from './RatingText'
import Address from './Address'
import { config, getCardIcon, strToList } from '~/lib/lib'
import { MdEmail } from 'react-icons/md'


const Card = ({ listing }: any) => {

    const [placeholder, setPlaceholder] = useState('/images/placeholder-icon.webp')
    const [imgscr, setImgsrc] = useState('')
    const [userId, setUserId] = useState('')
    const [socialMedia, setSocialMedia] = useState<any | null>(null)
    const [listingWebsite, setListingWebsite] = useState('')

    useEffect(() => {
        if (listing?.website) {

            setListingWebsite(listing?.website)
        } else {
            if (listing?.username === "" || listing?.username === null) {
                setListingWebsite('/' + listing?.gid)
            } else {
                setListingWebsite('/' + listing?.username)
            }
        }
    }, [listing])

    useEffect(() => {
        if (listing) {
            if (listing?.image_url !== "" && listing?.image_url !== null && listing?.image_url !== undefined) {
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

    useEffect(() => {
        if (socialMedia !== null) {
            //console.log(socialMedia)
        }
    }, [socialMedia])

    return (
        <div className={`bg-white w-full h-auto md:rounded-md shadow-md overflow-hidden border  hover:bg-blue-50 hover:shadow-lg`}>
            {/** header */}
            <div className={`bg-gray-50/30 py-3 px-4 border-b`}>

                <a href={`/${userId}`}>
                    <div className={`flex place-content-between gap-2`}>
                        {/** left */}
                        <div className={`flex place-items-center gap-2 w-full`}>
                            <div className={`w-[60px] h-[60px] min-w-[60px]   bg-black bg-cover bg-center overflow-hidden relative rounded-md`}
                                style={{ backgroundImage: `url(${placeholder})` }}
                            >
                                {
                                    imgscr !== '' &&
                                    <img
                                        src={imgscr}
                                        alt={""}
                                        className={`object-cover w-full h-full text-sm
                            rounded z-0`}
                                    />

                                }

                            </div>

                            <div className={`-space-y-1 w-full`}>
                                <div className={`text-black text-[16px] font-semibold line-clamp-1 w-full`}>
                                    {listing?.title}

                                </div>
                                <div className={`text-[12px] text-gray-500  capitalize`}>
                                    {listing?.category}
                                </div>
                            </div>
                        </div>

                        {/** right */}
                        <div className={`flex place-items-start`}>
                            <div className={`font-bold rounded-sm border px-3 py-[2px]`}>View</div>
                        </div>
                    </div>
                    <div className={`mt-[8px] text-[14px] md:text-[13px] text-gray-500 leading-[1.3em] line-clamp-3`}>
                        {
                            listing?.short_description
                        }

                    </div>
                </a>
            </div>


            {/** body */}
            <div>
                <a href={`/${userId}`}>
                    <div className={` h-auto flex place-content-between `}>
                        {/** left */}
                        <div className={`flex place-items-start w-[60%] flex-col  pl-4  pt-2 pb-4 space-y-[2px]`}>

                            {/** founded */}
                            <div className={`flex place-items-center gap-x-1`}>
                                <BsBank />
                                <span className={`mt-[1px] text-gray-500 space-x-2`}>
                                    <span className={`font-bold`}>Founded:</span>
                                    <span>{listing?.established}</span>
                                </span>
                            </div>

                            {/** rating */}
                            <div className={`flex place-items-center  w-full gap-x-2 `}>
                                <div className={`text-[19px] flex`}>
                                    <RatingBox rating={listing?.average_rating} />
                                </div>
                                <div className={`text-[13px] pt-[0px] `}>
                                    {
                                        listing &&
                                        <RatingText listing={listing} />
                                    }
                                </div>
                            </div>


                        </div>

                        {/** right */}
                        <div className={`flex place-items-end flex-col w-[40%] text-end pr-4 pt-2 pb-4`}>
                            <div className={`font-[600]`}>{listing?.phone}</div>
                            <div className={`text-[12px] leading-[1.2em] mt-1`}>
                                <Address listing={listing} />
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            {/** footer */}
            <div className={`border-t`}>
                <div className={`flex place-content-between mx-4 my-4`}>

                    {/** left */}
                    <div className={`flex place-items-center gap-4`}>
                        <a href={`mailto:${listing?.email_address}`} key={34}>
                            <MdEmail size={20} />
                        </a>
                        <a href={`tel:${listing?.phone}`} key={30}>
                            <BiPhone size={20} />
                        </a>
                        {
                            socialMedia !== null &&
                            socialMedia?.map((media: any, index: number) => {
                                return (
                                    <a href={`${media?.baseUrl}${media?.mediaHandle}`} key={index}>
                                        {
                                            getCardIcon(media?.mediaName)
                                        }
                                    </a>
                                )
                            })
                        }




                    </div>

                    {/** right */}
                    <div className={`border px-1.5 py-0.5 bg-blue-700 text-white rounded hover:shadow-lg`}>
                        <a href={`${listingWebsite}`}>
                            Website
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
