import React, { useEffect, useState } from 'react'
import StarRatingAlt from './StarRatingAlt'
import { config } from '~/lib/lib'
import FormattedAddress from './FormattedAddress'

const Header = ({ listing, profileImageData, operatingHoursStatus, ratingsData }: any) => {
    const [profileImg, setProfileImg] = useState('')
    useEffect(() => {
        if (profileImageData) {

            setProfileImg(config.IMG_BASE_URL + profileImageData?.image_url)
        }
    }, [profileImageData])

    return (
        <div className={`flex gap-2 mt-2 w-full`}>
            <div className={`bg-white w-[95px] min-w-[95px] h-[90px] rounded-none relative overflow-hidden hidden md:block border border-gray-200 p-1 shadow-sm`}>
                <img
                    src={profileImg}
                    alt=""
                    className={` object-cover w-full h-full border-[1px]  border-gray-200`}
                />
            </div>
            <div className={`w-full`}>
                <div className={`text-[19px] md:text-[24px]
                font-bold  leading-[1.2em] tracking-tight font-poppins`}>
                    {listing?.title}

                </div>

                <div>

                    <FormattedAddress listing={listing} />
                </div>

                <div className={` leading-[1.3em] space-x-1 mt-1`}>
                    {
                        operatingHoursStatus !== undefined &&
                        <div className={` leading-[1.2em]`}>
                            {
                                operatingHoursStatus.openStatus === "selected_hours" ?
                                    <div>
                                        {operatingHoursStatus.todayHoursFormatted}
                                    </div> :
                                    <div>
                                        {
                                            operatingHoursStatus.openStatus === "always_open" && <div className={`bg-green-700 px-1 rounded-sm w-fit text-white pt-[2px] pb-[4px]`}>
                                                Always Open
                                            </div>
                                        }
                                        {
                                            operatingHoursStatus.openStatus === "permanently_closed" && <div className={`bg-red-700 px-1 rounded-sm w-fit text-white pt-[2px] pb-[4px]`}>
                                                Permantently Closed
                                            </div>
                                        }
                                        {
                                            operatingHoursStatus.openStatus === "temporarily_closed" && <div className={`bg-orange-400 px-1 rounded-sm w-fit text-white pt-[2px] pb-[4px]`}>
                                                Temporarily Closed
                                            </div>
                                        }
                                    </div>
                            }

                            <div className={` w-full mx-auto mt-1.5`}>
                                {operatingHoursStatus?.localTimeText}
                            </div>
                        </div>

                    }


                </div>
            </div>
        </div>
    )
}

export default Header
