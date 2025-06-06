import { Link } from '@remix-run/react'
import { list } from 'postcss'
import React, { useEffect, useState } from 'react'
import { BsFacebook, BsLinkedin, BsPhone, BsTwitterX } from 'react-icons/bs'
import { CgWebsite } from 'react-icons/cg'
import { FaFacebook, FaFacebookSquare } from 'react-icons/fa'
import { MdEmail, MdFacebook } from 'react-icons/md'
import { config, getBusinessProfileImageData } from '~/lib/lib'

const SocialMedia = ({ listing }: any) => {
    const [img, setImg] = useState('')
    const [social, setSocial] = useState<any | null>(null)

    useEffect(() => {
        const getSocialMedia = (listing: any) => {

            const socialData = [
                {
                    media: listing?.fbsocial,
                    icon: <FaFacebookSquare />,
                    name: 'Facebook',
                    link: `https://facebook.com/${listing?.fbsocial}`
                },
                {
                    media: listing?.xsocial,
                    icon: <BsTwitterX />,
                    name: 'Twitter',
                    link: `https://facebook.com/${listing?.xsocial}`
                },
                {
                    media: listing?.linksocial,
                    icon: <BsLinkedin />,
                    name: 'LinkedIn',
                    link: `${listing?.linksocial}`
                },
                {
                    media: listing?.website,
                    icon: <CgWebsite />,
                    name: 'Website',
                    link: `${listing?.website}`
                },
                {
                    media: listing?.email_address,
                    icon: <MdEmail />,
                    name: 'Email Address',
                    link: `mailto:${listing?.email_address}`
                },
                {
                    media: listing?.phone,
                    icon: <BsPhone />,
                    name: 'Phone',
                    link: `tel:${listing?.phone}`
                }
            ]

            setSocial(socialData)
        }

        if (listing !== null) {

            getSocialMedia(listing)
        }
    }, [listing])

    return (
        <div className='mt-12'>
            <div className={`font-bold text-lg`}>
                Social Media
            </div>


            <div className={`flex flex-col gap-y-5 text-[14px] mt-4 whitespace-pre-wrap`}>
                <div className={`flex gap-3 flex-wrap`}>
                    {
                        social !== null &&
                        social?.map((socialMedia: any, index: number) => {
                            return (
                                <Link to={socialMedia?.link}>
                                    <div key={index}
                                        className={`border px-[5px] py-[2px] rounded
                                    cursor-pointer flex place-items-center
                                    gap-1 border-gray-400 
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
