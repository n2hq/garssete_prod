import { Link } from '@remix-run/react'
import React, { useRef } from 'react'
import { BiHotel } from 'react-icons/bi'
import { BsAirplane, BsHouse } from 'react-icons/bs'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FcHome } from 'react-icons/fc'
import { GiKnifeFork } from 'react-icons/gi'

const topcat = [
    {
        title: "Find Real Estate Businesses",
        category: 'real estate',
        link: '/web/browse?q=real estate',
        bglink: `/images/home/realest.png`
    },
    {
        title: "Discover IT and Tech Firms",
        category: 'technology and it',
        link: '/web/browse?q=technology and it',
        bglink: `/images/home/techr.jpg`
    },
    {
        title: "Browse Cleaning Services Companies",
        category: 'cleaning services',
        link: '/web/browse?q=&category=cleaning services',
        bglink: `/images/home/cleaning.jpg`
    },
    {
        title: "Explore Advertising and Marketing Agencies",
        category: 'advertising & marketing',
        link: '/web/browse?q=&category=advertising marketing',
        bglink: `/images/home/advert.jpg`
    },
    {
        title: "Autmotive Manufacturing and Sales",
        category: 'automotive',
        link: '/web/browse?q=&category=automotive',
        bglink: `/images/home/autom.jpeg`
    },
    {
        title: "Communities and Government Agencies",
        category: 'community and government',
        link: '/web/browse?q=&category=community and government',
        bglink: `/images/home/gov.jpg`
    },

    // Added more categories to demonstrate overflow

]

export type LatestBusinessesType = {
    title: string
    category?: string
    link: string
    bglink?: string
}


const Inspire = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };
    return (
        <div className={`px-[15px] mt-24 pt-[40px] pb-[60px] bg-gray-100`}>
            <div className={`max-w-[1100px] mx-auto w-full`}>

                {/** section title and sub title */}
                <div>
                    <div className={`text-[19px] font-poppins font-bold`}>
                        Get inspired to do more
                    </div>

                    <div className={`text-[15px] font-poppins mt-1 mb-6`}>
                        Whatever you're into, we've got it
                    </div>
                </div>


                {/** scroller */}
                <div className={`relative`}>
                    <div
                        ref={scrollRef}
                        className={`w-full overflow-x-auto bottom-scrollbar-hidden relative rounded-xl`}
                    >
                        <div className={`flex gap-3 place-content-between`}>
                            {
                                topcat?.map((business: LatestBusinessesType, index: number) => {
                                    const lnk = `/web/browse?q=&category=${business?.category}`
                                    return (
                                        <div
                                            key={index}
                                        >
                                            <Link to={lnk}>
                                                <div className={`border-none rounded-xl min-w-[220px] md:min-w-[280px] h-[250px] overflow-hidden relative`}>
                                                    <img
                                                        src={business?.bglink}
                                                        alt=""
                                                        className={`object-cover w-full h-full`}
                                                    />

                                                    <div className={`absolute bottom-0 text-white h-[40%] w-full flex items-end content-start`}>

                                                    </div>
                                                </div>

                                                <div className={`mt-3 `}>
                                                    <div className={`font-poppins text-xl font-[500] text-center capitalize`}>
                                                        {business?.title}
                                                    </div>
                                                    <div className={`mt-2 font-poppins text-[13px] font-[500] text-gray-500 text-center capitalize`}>
                                                        {business?.category}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/** navlinks */}
                    {/** left arrow */}
                    <div className={`absolute text-white top-1/2 -translate-y-1/2 left-2 w-[50px] min-w-[50px] h-[50px] bg-black/50 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[50]`}
                        onClick={() => { scrollLeft() }}
                    >
                        <FaChevronLeft />
                    </div>


                    {/** right arrow */}
                    <div className={`absolute text-white top-1/2 -translate-y-1/2 right-2 w-[50px] min-w-[50px] h-[50px] bg-black/70 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[50]`}
                        onClick={() => { scrollRight() }}
                    >
                        <FaChevronRight />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Inspire
