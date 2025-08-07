import { Link } from '@remix-run/react'
import React from 'react'
import { BiLocationPlus } from 'react-icons/bi'
import { CgWebsite } from 'react-icons/cg'
import { FaInternetExplorer } from 'react-icons/fa'
import { FaLocationPin } from 'react-icons/fa6'
import { GrLocation, GrMapLocation } from 'react-icons/gr'
import { IoMdGlobe } from 'react-icons/io'
import { MdEmail, MdLocationPin, MdOutline3gMobiledata, MdPhone, MdWeb } from 'react-icons/md'
import Review from './Review'
import ClaimBusiness from './ClaimBusiness'

const Address = ({ businessProfile }: any) => {
    return (
        <div className={`w-full`}>

            <div className='  md:bg-white
            md:rounded overflow-hidden pt-[30px]
            pb-[15px] bg-[blue]/0 text-black md:black
            md:text-black  border-[1px] border-gray-300/70'>
                <div className={`font-normal text-[19px] 
                   px-[10px] tracking-tight w-fit border rounded-md
                   ml-[20px] bg-blue-900 text-white`}>
                    Business Contact
                </div>
                <div className='h-[25px]'></div>

                <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 
                text-[14px]  tracking-tight
                md:space-x-4 lg:space-x-0 md:text-black/80 font-sans
                `}
                >

                    <div className={`px-[20px] space-y-4 lg:space-y-4`}>
                        <div className={` w-full`}>

                            <div className={`grid grid-cols-12`}>
                                <div className={`col-span-1 `}>
                                    <MdLocationPin className={`text-[20px]`} />
                                </div>
                                <div className={`col-span-11 leading-[1.4em] ml-2
                            text-[12px]`}>
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
                        </div>

                        <div className={`  w-full`}>

                            <Link to={`tel:${businessProfile?.phone}`}>
                                <div className={`grid grid-cols-12`}>
                                    <div className={`col-span-1`}>
                                        <MdPhone className={`text-[20px]`} />
                                    </div>
                                    <div className={`col-span-11 leading-[1.2em] ml-2
                                    text-[12px]`}>
                                        {businessProfile?.phone}
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className={`  w-full`}>
                            <Link to={`${businessProfile?.website}`}>
                                <div className={`grid grid-cols-12`}>
                                    <div className={`col-span-1 relative top-0
                            `}>
                                        <MdOutline3gMobiledata className={`text-[22px]`} />
                                    </div>
                                    <div className={`col-span-11 leading-[1.2em] ml-2 top-0
                            flex place-items-center text-[12px]`}>

                                        Website

                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className={`  w-full`}>
                            <Link to={`mailto:${businessProfile?.email_address}`}>
                                <div className={`grid grid-cols-12`}>
                                    <div className={`col-span-1 relative top-0
                            `}>
                                        <MdEmail className={`text-[20px]`} />
                                    </div>
                                    <div className={`col-span-11 leading-[1.2em] ml-2 top-0
                            flex place-items-center text-[12px]`}>

                                        Email Address

                                    </div>
                                </div>
                            </Link>
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
