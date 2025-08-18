import { Link } from '@remix-run/react'
import React from 'react'
import { BiLocationPlus } from 'react-icons/bi'
import { CgWebsite } from 'react-icons/cg'
import { FaInternetExplorer } from 'react-icons/fa'
import { FaLocationPin } from 'react-icons/fa6'
import { GrLocation, GrLocationPin, GrMapLocation } from 'react-icons/gr'
import { IoMdGlobe } from 'react-icons/io'
import { MdEmail, MdLocationPin, MdOutline3gMobiledata, MdPhone, MdWeb } from 'react-icons/md'
import Review from './Review'
import ClaimBusiness from './ClaimBusiness'

const Address = ({ businessProfile }: any) => {
    return (
        <div className={`w-full`}>

            <div className={`md:bg-white
            md:rounded-b overflow-hidden pt-[0px]
            pb-[15px] bg-[blue]/0 text-black md:black
            md:text-black  border-[1px] border-gray-300/70 border-t-0 rounded-t-none`}>

                <div className={`font-normal text-[19px] 
                   px-[10px] tracking-tight w-fit rounded-md
                   ml-[20px] mt-[25px] bg-blue-900 text-white
                   shadow-md shadow-gray-100`}>
                    Business Contact
                </div>
                <div className='mt-[20px]'></div>

                <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 
                text-[14px]  tracking-tight md:space-x-4 lg:space-x-0 md:text-black/80 font-sans`}
                >

                    <div className={`mx-[0px] divide-y-[1px] `}>

                        {/** location */}
                        <div className={`flex w-full gap-3 py-3 px-3`}>
                            <div className={`bg-blue-200/50 h-[30px] min-w-[30px] w-[30px] flex place-content-center place-items-center rounded-md border-[1px]`}>
                                <MdLocationPin className={`text-[20px]`} />
                            </div>
                            <div className={`text-[15px] md:text-[13px] leading-[1.3em]`}>
                                {
                                    businessProfile?.address_one + ", "
                                }
                                {
                                    businessProfile?.address_two !== null ?
                                        businessProfile?.address_two + ", " :
                                        ""
                                }
                                {
                                    businessProfile?.city_name !== null ?
                                        businessProfile?.city_name + ", " :
                                        ""
                                }
                                {
                                    businessProfile?.state_name !== null ?
                                        businessProfile?.state_name + ", " :
                                        ""
                                }
                                {
                                    businessProfile?.zipcode !== null ?
                                        businessProfile?.zipcode + ", " :
                                        ""
                                }
                                {
                                    businessProfile?.country_name
                                }
                            </div>

                        </div>

                        {/** phone */}
                        <div className={`flex w-full gap-3 py-2.5 px-3`}>
                            <div className={`bg-blue-200/50 h-[30px] min-w-[30px] w-[30px] flex place-content-center place-items-center rounded-md`}>
                                <MdPhone className={`text-[20px] h-fit`} />
                            </div>
                            <div className={` text-[15px] md:text-[13px] leading-[1.3em]
                                flex place-items-center font-semibold`}>
                                {businessProfile?.phone}
                            </div>

                        </div>

                        {/** website */}
                        <div className={`flex w-full gap-3 py-2.5 px-3`}>
                            <div className={`bg-blue-200/50 h-[30px] min-w-[30px] w-[30px] flex place-content-center place-items-center rounded-md`}>
                                <CgWebsite className={`text-[20px] h-fit`} />
                            </div>
                            <div className={` text-[15px] md:text-[13px] leading-[1.3em]
                                flex place-items-center font-semibold
                                line-clamp-1`}>

                                <a href={businessProfile?.website}>
                                    {businessProfile?.website || 'No website'}
                                </a>
                            </div>

                        </div>

                        {/** email */}
                        <div className={`flex w-full gap-3 py-2.5 px-3`}>
                            <div className={`bg-blue-200/50 h-[30px] min-w-[30px] w-[30px] flex place-content-center place-items-center rounded-md`}>
                                <MdEmail className={`text-[20px]`} />
                            </div>
                            <div className={` text-[15px] md:text-[13px] leading-[1.3em]
                                flex place-items-center font-semibold
                                line-clamp-1`}>
                                <a href={`mailto:${businessProfile.email_address}`}>
                                    {businessProfile.email_address}
                                </a>
                            </div>

                        </div>


                    </div>
                    <div>

                        <div className={`bg-blue-500 mt-[30px] mx-[15px]
                        text-white text-center py-2 rounded`}>
                            {
                                businessProfile &&
                                <Review listing={businessProfile} />
                            }


                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default Address
