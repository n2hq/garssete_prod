import { Link } from '@remix-run/react'
import React from 'react'
import { BsBank } from 'react-icons/bs'
import { FiArrowRight } from 'react-icons/fi'
import { RiDoubleQuotesL } from 'react-icons/ri'
import { config } from '~/lib/lib'

const ResultItem = ({ listing, index }: any) => {
    function isOdd(num: number): boolean {
        return num % 2 !== 0;
    }

    let url = config.IMG_BASE_URL + listing.image_url

    if (listing?.image_url === "" || listing?.image_url === null) {
        url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKSPXOSoC8KuJCf_1dyELpZOsYINbk51FqA&s"
    }



    return (

        <div className={` cursor-pointer my-2`}>
            <div className={`flex rounded  gap-x-2 p-2
             hover:bg-blue-700 hover:text-white  
             ${isOdd(index) ? 'bg-blue-50' : ''}
                `}>
                {/** left */}
                <div className={`relative min-w-[50px] w-[50px] h-[50px]
                    rounded-full overflow-hidden border`}>
                    <img
                        src={url}
                        alt={listing.title}
                        className={`object-cover w-full h-full text-sm
                             `}
                    />
                </div>

                {/** right */}
                <div className=' w-full'>
                    <Link to={`/web/account/portfolio/${listing.gid}`}>
                        <div className={`md:flex md:place-content-between 
                w-full md:gap-x-[4px]`}>
                            {/** left */}
                            <div className={`w-full md:w-[60%]`}>
                                <div className={`font-semibold text-[15px] text-brown-800
                    leading-[1.1em]  mt-[2px]`}>
                                    {listing.title}
                                </div>

                                <div className={`font-normal text-[13px] 
                                    flex place-items-center gap-1 mt-[0px]`}>

                                    <div className={`capitalize flex place-items-center gap-1`}>
                                        {listing.category}
                                    </div>
                                </div>


                            </div>

                            {/** right */}
                            <div className={`w-full lg:w-[40%] hidden 
                                sm:block`}>
                                <div className={`flex flex-col 
                    place-items-end place-content-end
                        font-semibold text-[15px] tracking-tighter`}>
                                    {listing.phone}
                                </div>
                                <div className={`flex flex-col text-end text-[12px]
                                leading-[1.2em]`}>
                                    {listing?.address_one}
                                    {
                                        listing?.address_two ? `, ${listing?.address_two}` : ''
                                    }
                                    {
                                        listing?.city_name ? `, ${listing?.city_name}` : ''
                                    }
                                    {
                                        listing?.state_name ? `, ${listing?.state_name}` : ''
                                    }
                                    {
                                        listing?.country_name ? `, ${listing?.country_name}` : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>

        </div>
    )
}




export default ResultItem
