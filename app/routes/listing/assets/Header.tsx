import React, { useEffect, useState } from 'react'
import StarRatingAlt from './StarRatingAlt'
import { config } from '~/lib/lib'

const Header = ({ listing, profileImageData, operatingHoursStatus, ratingsData }: any) => {
    const [profileImg, setProfileImg] = useState('')
    useEffect(() => {
        if (profileImageData) {

            setProfileImg(config.IMG_BASE_URL + profileImageData?.image_url)
        }
    }, [profileImageData])

    return (
        <div className={`flex gap-2 mt-2`}>
            <div className={`bg-white w-[90px] min-w-[90px] h-[90px] rounded-none relative overflow-hidden`}>
                <img
                    src={profileImg}
                    alt=""
                    className={` object-cover w-full h-full border border-gray-500 p-1`}
                />
            </div>
            <div className={`w-full`}>
                <div className={`text-[19px] md:text-[24px]
                font-bold mt-[5px] leading-[1.2em]`}>
                    {listing?.title}

                </div>

                <div className={` leading-[1.3em] space-x-1`}>
                    <span className={`underline font-bold`}>Address:</span>
                    <span className={``}>
                        {listing?.address_one ? `${listing?.address_one}, ` : ''}
                        {listing?.address_two ? `${listing?.address_two}, ` : ''}
                        {listing?.city_name ? `${listing?.city_name}, ` : ''}
                        {listing?.state_name ? `${listing?.state_name}, ` : ''}
                        {listing?.country_name}
                    </span>


                </div>
            </div>
        </div>
    )
}

export default Header
