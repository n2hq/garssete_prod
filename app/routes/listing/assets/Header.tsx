import React, { useEffect, useState } from 'react'
import StarRatingAlt from './StarRatingAlt'
import { config } from '~/lib/lib'
import FormattedAddress from './FormattedAddress'

const Header = ({ listing, profileImageData, operatingHoursStatus, ratingsData }: any) => {
    const [profileImg, setProfileImg] = useState('')
    const [placeholder, setPlaceholder] = useState('/images/placeholder22.png')
    useEffect(() => {
        if (profileImageData?.image_url) {

            setProfileImg(config.IMG_BASE_URL + profileImageData?.image_url)
        } else {
            setProfileImg(placeholder)
        }
    }, [profileImageData])

    return (
        <div>
            {/* <div className={`h-[5px] bg-gradient-to-r from-black to-blue-500 w-full mt-2 `}>

            </div> */}
            <div className={`flex gap-2 mt-2 w-full  p-3 md:p-3 md:shadow-md md:rounded-xl  border border-blue-100 bg-gray-50`}>

                <div className={`bg-white w-[60px] min-w-[60px] md:w-[95px] md:min-w-[95px] h-[60px] md:h-[95px] rounded-none relative overflow-hidden  `}>
                    <img
                        src={profileImg}
                        alt=""
                        className={` object-cover w-full h-full border-[1px]  border-gray-200`}
                    />
                </div>
                <div className={`w-full`}>
                    <div className={`text-[19px] md:text-[24px]
                font-bold  leading-[1.2em] tracking-tight font-poppins text-blue-800`}>
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
                                                operatingHoursStatus.openStatus === "always_open" &&
                                                <div key={'1'} className={`bg-green-700 px-2 rounded-lg w-fit text-white pt-[2px] pb-[4px]`}>
                                                    Always Open
                                                </div>
                                            }
                                            {
                                                operatingHoursStatus.openStatus === "permanently_closed" &&
                                                <div key={'2'} className={`bg-red-700 px-2 rounded-lg w-fit text-white pt-[2px] pb-[4px]`}>
                                                    Permantently Closed
                                                </div>
                                            }
                                            {
                                                operatingHoursStatus.openStatus === "temporarily_closed" &&
                                                <div key={'3'} className={`bg-orange-400 px-2 rounded-lg w-fit text-white pt-[2px] pb-[4px]`}>
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
        </div>
    )
}

export default Header
