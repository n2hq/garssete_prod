import { Link } from '@remix-run/react'
import React, { useRef } from 'react'
import { BiHotel } from 'react-icons/bi'
import { BsAirplane, BsHouse } from 'react-icons/bs'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FcHome } from 'react-icons/fc'
import { GiKnifeFork } from 'react-icons/gi'

const hotels = [
    {
        title: "Costa Brava Coves Towns and Winery Private Tour",
        city: `dubai`,
        category: 'shopping and retail',
        link: '/web/browse?q=&category=shopping and retail&city=dubai',
        bglink: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/f3/b4/2e/caption.jpg?w=600&h=600&s=1`,

    },
    {
        title: "Omani Dhow Coastal and Sunset Cruise",
        city: `london`,
        category: 'shopping and retail',
        link: '/web/browse?q=hotel&city=london',
        bglink: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/20/db/50/caption.jpg?w=600&h=600&s=1`
    },
    {
        title: "Hike The Wonderland Mountain Abuja",
        city: `new york city`,
        category: 'shopping and retail',
        link: '/web/browse?q=hotel&city=new york',
        bglink: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/00/24/f1/caption.jpg?w=600&h=600&s=1`
    },
    {
        title: "Gurara Waterfall",
        city: `doha`,
        category: 'shopping and retail',
        link: '/web/browse?q=hotel&city=doha',
        bglink: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/dc/63/d0/caption.jpg?w=600&h=600&s=1`
    },
    {
        title: "Abuja Nature And Parks Tour",
        city: `paris`,
        category: 'shopping and retail',
        link: '/web/browse?q=hotel&city=paris',
        bglink: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/64/0c/18/caption.jpg?w=600&h=600&s=1`
    },
    // Added more categories to demonstrate overflow

]

export type HotelType = {
    title: string
    category?: string
    link: string
    bglink?: string
    city?: string
}

const Hotel = () => {
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
        <div className={`px-[15px] mt-24`}>
            <div className={`max-w-[1100px] mx-auto w-full`}>

                {/** section title and sub title */}
                <div>
                    <div className={`text-[19px] font-poppins font-bold`}>
                        Explore shops worldwide
                    </div>

                    <div className={`text-[15px] font-poppins mt-1 mb-6`}>
                        Whatever you're into, we've got it
                    </div>
                </div>


                {/** scroller */}
                <div className={`relative`}>
                    <div
                        ref={scrollRef}
                        className={`w-full overflow-hidden relative rounded-xl`}
                    >
                        <div className={`flex gap-6`}>
                            {
                                hotels?.map((business: HotelType, index: number) => {
                                    const link = `/web/browse?q=&category=${business?.category}&city=${business?.city}`
                                    return (
                                        <div
                                            key={index}
                                        >
                                            <Link to={link}>
                                                <div className={`border-none rounded-xl min-w-[280px] h-[290px] overflow-hidden relative`}>
                                                    <img
                                                        src={business?.bglink}
                                                        alt=""
                                                        className={`object-cover w-full h-full`}
                                                    />

                                                    <div className={`absolute bottom-0 text-white h-[40%] w-full flex items-end content-start`}>

                                                    </div>
                                                </div>

                                                <div className={`mt-3 `}>
                                                    <div>
                                                        <div className={`bg-gray-100 w-fit px-2 rounded`}>
                                                            {business?.city}
                                                        </div>
                                                    </div>
                                                    <div className={`font-poppins text-xl font-[500] mt-[3px]`}>
                                                        {business?.title}
                                                    </div>
                                                    <div className={`mt-2 font-poppins text-[13px] font-[500] text-gray-500`}>
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

export default Hotel
