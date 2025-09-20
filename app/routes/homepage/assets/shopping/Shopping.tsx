import { Link } from '@remix-run/react'
import React, { useRef } from 'react'
import { BiHotel } from 'react-icons/bi'
import { BsAirplane, BsHouse } from 'react-icons/bs'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FcHome } from 'react-icons/fc'
import { GiKnifeFork } from 'react-icons/gi'

const hotels = [
    {
        title: "Luxury shopping paradise amid dazzling modern architecture.",
        city: `dubai`,
        category: 'shopping and retail',
        link: '/web/browse?q=&category=shopping and retail&city=dubai',
        bglink: `https://www.vexcolt.com/wp-content/uploads/2018/04/ref_Mall_01.jpg`,

    },
    {
        title: "Historic streets brimming with iconic retail destinations.",
        city: `london`,
        category: 'shopping and retail',
        link: '/web/browse?q=hotel&city=london',
        bglink: `https://www.europetravelguide.co.uk/wp-content/uploads/2020/05/Shopping-in-London.jpg`
    },
    {
        title: "Ultimate urban shopping experience, endless variety.",
        city: `new york city`,
        category: 'shopping and retail',
        link: '/web/browse?q=hotel&city=new york',
        bglink: `https://thetravelexpert.ie/wp-content/uploads/2015/09/new-york-742795_1280_opt.jpg`
    },
    {
        title: "Opulent malls meet rich traditional market culture.",
        city: `doha`,
        category: 'shopping and retail',
        link: '/web/browse?q=hotel&city=doha',
        bglink: `https://visitqatar.com/content/dam/visitqatar/img/things-to-do/shopping-in-qatar/shopping-malls-2.jpg/_jcr_content/renditions/medium-1280px.jpeg`
    },
    {
        title: "Chic fashion capital and style epicenter.",
        city: `paris`,
        category: 'shopping and retail',
        link: '/web/browse?q=hotel&city=paris',
        bglink: `https://hips.hearstapps.com/hmg-prod/images/crowds-of-people-at-rue-montorgueil-pedestrian-royalty-free-image-1576958383.jpg`
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
                        className={`w-full overflow-x-auto bottom-scrollbar-hidden relative rounded-xl`}
                    >
                        <div className={`flex gap-3`}>
                            {
                                hotels?.map((business: HotelType, index: number) => {
                                    const link = `/web/browse?q=&category=${business?.category}&city=${business?.city}`
                                    return (
                                        <div
                                            key={index}
                                        >
                                            <Link to={link}>
                                                <div className={`border-none rounded-xl min-w-[220px] md:min-w-[280px] h-[290px] overflow-hidden relative`}>
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
                                                        <div className={`bg-gray-100 w-fit px-2 rounded capitalize`}>
                                                            {business?.city}
                                                        </div>
                                                    </div>
                                                    <div className={`font-poppins text-xl font-[500] mt-[3px]`}>
                                                        {business?.title}
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
