import { Link } from '@remix-run/react'
import { list } from 'postcss'
import React, { useEffect, useState } from 'react'
import { BsFacebook, BsInstagram, BsLinkedin, BsPhone, BsPinterest, BsTwitterX } from 'react-icons/bs'
import { CgWebsite } from 'react-icons/cg'
import { FaFacebook, FaFacebookSquare, FaPinterestSquare, FaVimeoSquare, FaYoutubeSquare } from 'react-icons/fa'
import { MdEmail, MdFacebook } from 'react-icons/md'
import { config, getBusinessProfileImageData, getSocialMediaByBusinessGuid } from '~/lib/lib'
import ComponentTitle from './ComponentTitle'

const SocialMedia = ({ listing }: any) => {
    const [img, setImg] = useState('')
    const [social, setSocial] = useState<any | null>(null)

    function getIcon(media: any) {
        let icon = null

        switch (media?.media_id) {
            case "facebook":
                icon = <FaFacebookSquare />
                break;
            case "twitterx":
                icon = <BsTwitterX />
                break;
            case "linkedin":
                icon = <BsLinkedin />
                break;
            case "instagram":
                icon = <BsInstagram />
                break;
            case "pinterest":
                icon = <FaPinterestSquare />
                break;
            case "youtube":
                icon = <FaYoutubeSquare />
                break;
            case "vimeo":
                icon = <FaVimeoSquare />
                break;


        }
        return icon
    }
    useEffect(() => {
        const getSocialMedia = async (listing: any) => {
            const socials = []

            const socialMedia = await getSocialMediaByBusinessGuid(listing.gid)
            socialMedia.map((media: any, index: number) => {

                socials.push({
                    media: media?.name,
                    icon: getIcon(media),
                    name: media?.name,
                    link: `${media?.base_url}${media?.user_description}`
                })
            })



            if (listing?.website) {
                socials.push({
                    media: listing?.website,
                    icon: <CgWebsite />,
                    name: 'Website',
                    link: `${listing?.website}`
                })
            }

            if (listing?.email_address) {
                socials.push({
                    media: listing?.email_address,
                    icon: <MdEmail />,
                    name: 'Email Address',
                    link: `mailto:${listing?.email_address}`
                })
            }

            if (listing?.phone) {
                socials.push({
                    media: listing?.phone,
                    icon: <BsPhone />,
                    name: 'Phone',
                    link: `tel:${listing?.phone}`
                })
            }
            setSocial(socials)
        }

        if (listing !== null) {

            getSocialMedia(listing)
        }
    }, [listing])

    return (
        <div className='mt-12'>
            <ComponentTitle title='Social Media' />


            <div className={`flex flex-col gap-y-5 text-[14px] mt-4 whitespace-pre-wrap`}>
                <div className={`flex gap-3 flex-wrap`}>
                    {
                        social !== null &&
                        social?.map((socialMedia: any, index: number) => {
                            return (
                                <Link key={index} to={socialMedia?.link}>
                                    <div key={index}
                                        className={`border px-[8px] py-[2px] 
                                    cursor-pointer flex place-items-center rounded-full
                                    gap-1 border-gray-400 bg-white hover:bg-black
                                    text-black hover:text-white
                                    hover:shadow-md`}
                                    >
                                        <span className={`text-[12px]`}>
                                            {socialMedia?.icon}
                                        </span>
                                        {socialMedia?.name}
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SocialMedia
