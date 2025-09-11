import { Link } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { BsBank } from 'react-icons/bs'
import { FiArrowRight } from 'react-icons/fi'
import { RiDoubleQuotesL } from 'react-icons/ri'
import { config } from '~/lib/lib'

const ResultItem = ({ listing, index }: any) => {
    const [placeholder, setPlaceholder] = useState('/images/placeholder-icon.webp')
    const [imgsrc, setImgsrc] = useState('')
    function isOdd(num: number): boolean {
        return num % 2 !== 0;
    }



    useEffect(() => {
        if (listing && listing?.image_url !== null) {
            let imgsrc = config.IMG_BASE_URL + listing?.image_url
            setImgsrc(imgsrc)
        } else {
            setImgsrc(placeholder)
        }
    }, [listing])





    return (

        <div className={` cursor-pointer my-0`}>
            <div className={`flex rounded  gap-x-2 py-2 px-1
             hover:bg-blue-50  
             ${isOdd(index) ? '' : ''}
                `}>
                {/** left */}
                <div className={`relative min-w-[46px] w-[46px] h-[45px]
                    rounded-md overflow-hidden border bg-transparent bg-cover bg-center`}
                    style={{ backgroundImage: `url(${placeholder})` }}
                >
                    {
                        imgsrc !== null &&
                        <img
                            src={imgsrc}
                            alt={listing.title}
                            className={`object-cover w-full h-full text-sm bg-white
                             `}
                        />
                    }
                    {/* <div className={`w-full h-[50%]
                            absolute z-[10] bottom-0 
                            bg-gradient-to-t from-black/40
                            to-transparent
                            `}></div> */}
                </div>

                {/** right */}
                <div className=' w-full'>
                    <Link to={`/web/account/portfolio/${listing.gid}`}>
                        <div className={`md:flex md:place-content-between 
                w-full md:gap-x-[4px]`}>
                            {/** left */}
                            <div className={`w-full md:w-[60%] -space-y-1 block`}>
                                <div className={`font-bold text-[14px] text-brown-800 line-clamp-1`}>
                                    {listing.title}
                                </div>

                                <div className={`font-normal text-[11.5px] flex place-items-center gap-1`}>

                                    <div className={`capitalize flex place-items-center `}>
                                        {listing.category}
                                    </div>

                                </div>

                                <div className={`font-normal text-[11px] 
                                    flex place-items-center gap-1 `}>
                                    {Boolean(listing?.active_status) ? 'Active' : 'Inactive'}
                                </div>


                            </div>

                            {/** right */}
                            <div className={`w-full lg:w-[40%] hidden 
                                sm:block`}>
                                <div className={`flex flex-col place-items-end place-content-end font-bold text-black tracking-tighter`}>
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
