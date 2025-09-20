import { Link } from '@remix-run/react'
import React, { useRef } from 'react'
import { BiHotel } from 'react-icons/bi'
import { BsAirplane, BsHouse } from 'react-icons/bs'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FcHome } from 'react-icons/fc'
import { GiKnifeFork } from 'react-icons/gi'

const topcat = [
    {
        title: "Hotels",
        category: "hotel",
        icon: <BiHotel size={20} />,
        link: '/web/browse?q=hotel',
        bglink: '/images/home/hotels-img.jpg'
    },
    {
        title: "Entertainment",
        category: "entertainment",
        icon: <BsHouse size={17} />,
        link: '/web/browse?q=hotel',
        bglink: `/images/home/ent-img.webp`
    },
    {
        title: "Restaurant",
        category: 'restaurant',
        icon: <GiKnifeFork size={17} />,
        link: '/web/browse?q=hotel',
        bglink: `/images/home/rest-img.webp`
    },
    {
        title: "Travels",
        category: "travel",
        icon: <BsAirplane size={17} />,
        link: '/web/browse?q=travel',
        bglink: `/images/home/travel.jpg`
    },
    {
        title: "Real Estate",
        category: "real estate",
        icon: <FcHome size={17} />,
        link: '/web/browse?q=realestate',
        bglink: `/images/home/real-img.jpg`
    },
    // Added more categories to demonstrate overflow

]

export type TopCategoryType = {
    title: string
    icon: any
    link: string
    bglink?: string
    category?: string
}

const TopCategories = () => {
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
                        Find businesses by interest
                    </div>

                    <div className={`text-[15px] font-poppins mt-1 mb-6`}>
                        Whatever you're into, we've got you covered.
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
                                topcat?.map((category: TopCategoryType, index: number) => {
                                    const lnk = `/web/browse?q=&category=${category.category}`
                                    return (
                                        <Link key={index}
                                            to={lnk}
                                        >
                                            <div
                                                key={index}
                                                className={`border-none rounded-xl min-w-[220px] md:min-w-[220px] h-[400px] overflow-hidden relative`}>
                                                <img
                                                    src={category?.bglink}
                                                    alt=""
                                                    className={`object-cover w-full h-full`}
                                                />

                                                <div className={`absolute bottom-0 text-white h-[40%] bg-gradient-to-t from-black to-gray-200/0 w-full flex items-end content-start`}>
                                                    <div className={`mx-3 mb-6 text-2xl font-poppins leading-[1.3em] font-bold`}>
                                                        {category?.title}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
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

export default TopCategories
