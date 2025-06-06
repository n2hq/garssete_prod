import { Link } from "@remix-run/react"
import { BiBullseye, BiHome, BiSpa } from "react-icons/bi"
import { CgShoppingCart } from "react-icons/cg"
import { FaCarSide } from "react-icons/fa"
import { GiStarGate } from "react-icons/gi"
import { MdMusicNote, MdRealEstateAgent } from "react-icons/md"
import { RiRestaurantFill } from "react-icons/ri"
import { getCategories } from "~/lib/lib"

const categories = [
    {
        title: "Restaurants",
        link: "/web/search?q=restaurant",
        icon: <RiRestaurantFill />
    },
    {
        title: "Shopping",
        link: "/web/search?q=shopping",
        icon: <CgShoppingCart />
    },
    {
        title: "Nightlife",
        link: "/web/search?q=nightlife",
        icon: <GiStarGate />
    },
    {
        title: "Entertainment",
        link: "/web/search?q=entertainment",
        icon: <MdMusicNote />
    },
    {
        title: "Beauty & Spa",
        link: "/web/search?q=beauty and spa",
        icon: <BiSpa />
    },
    {
        title: "Automotive",
        link: "/web/search?q=automotive",
        icon: <FaCarSide />
    },
    {
        title: "Home Services",
        link: "/web/search?q=home service",
        icon: <BiHome />
    },
    {
        title: "Real Estate",
        link: "/web/search?q=real estate",
        icon: <MdRealEstateAgent />
    }
]

export const FrontPageCategories = () => {
    return (
        <div className={`w-full relative mt-[50px] px-[15px]`}>
            <div className={`max-w-[1100px] mx-auto w-full`}>
                <div className={`relative font-sans text-2xl
        text-center font-black mb-8 border-b pb-5
        tracking-tight`}>
                    Categories
                </div>

                <div className={`grid grid-cols-2 gap-5
          sm:grid-cols-3 sm:gap-8
          lg:grid-cols-4 lg:gap-10`}>
                    {categories.map((category: any, index: any) => {
                        return (
                            <div key={index}>
                                <Link to={`${category.link}`}>
                                    <div className={`border-[1px] h-[140px] md:h-[200px]
                rounded hover:cursor-pointer border-gray-300
                hover:shadow-none flex flex-col
               place-items-center place-content-center
               gap-y-0 shadow-lg`}>
                                        <div className={`text-[30px] w-12 h-12 rounded-full
                  flex place-items-center place-content-center
                  bg-gray-100`}>
                                            {
                                                category.icon
                                            }
                                        </div>
                                        <div className={`text-base font-semibold
                  text-gray-500`}>
                                            {
                                                category.title
                                            }
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}