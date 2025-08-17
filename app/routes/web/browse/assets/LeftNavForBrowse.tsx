import React from 'react'
import { BiFoodMenu, BiLandscape } from 'react-icons/bi'
import { CgAirplane, CgChart, CgFeed, CgPrinter, CgShoppingBag, CgShoppingCart } from 'react-icons/cg'
import { FaSchool } from 'react-icons/fa6'
import { FcAutomotive, FcLandscape } from 'react-icons/fc'
import { GiHealthNormal, GiHumanTarget, GiTravelDress } from 'react-icons/gi'
import { GrCloudComputer, GrLanguage, GrRestaurant } from 'react-icons/gr'
import { MdAdsClick, MdCleaningServices, MdConstruction, MdDashboard, MdElectricalServices, MdMeetingRoom, MdModeOfTravel, MdPlumbing, MdRealEstateAgent, MdRoomService } from 'react-icons/md'
import { RiGovernmentFill, RiLandscapeLine } from 'react-icons/ri'
import { TbTruckDelivery } from 'react-icons/tb'

const leftnav = [
    {
        title: "Business Consulting",
        key: "business consulting",
        icon: <MdMeetingRoom size={20} />
    },
    {
        title: "Accounting & Bookkeeping",
        key: "accounting",
        icon: <MdAdsClick size={20} />
    },
    {
        title: "Advertising & Marketing",
        key: "advertising marketing",
        icon: <CgChart size={20} />
    },
    {
        title: "Financial Services",
        key: "financial services",
        icon: <MdDashboard size={20} />
    },
    {
        title: "Legal Services",
        key: "legal services",
        icon: <CgFeed size={20} />
    },
    {
        title: "Human Resource & Recruiting",
        key: "human resource recruiting",
        icon: <GiHumanTarget size={20} />
    },
    {
        title: "Printing & Publishing",
        key: "printing publishing",
        icon: <CgPrinter size={20} />
    },
    {
        title: "Translation & Interpretation",
        key: "translation and interpretation",
        icon: <GrLanguage size={20} />
    },
    {
        title: "Cleaning Services",
        key: "cleaning services",
        icon: <MdCleaningServices size={20} />
    },
    {
        title: "Plumbing",
        key: "plumbing",
        icon: <MdPlumbing size={20} />
    },
    {
        title: "Construction & Roofing",
        key: "construction and roofing",
        icon: <MdConstruction size={20} />
    },
    {
        title: "Electrical Services",
        key: "electrical services",
        icon: <MdElectricalServices size={20} />
    },
    {
        title: "Landscaping & Gardening",
        key: "landscaping and gardening",
        icon: <FcLandscape size={20} />
    },
    {
        title: "Interior Design",
        key: "interior design",
        icon: <MdRoomService size={20} />
    },
    {
        title: "Logistics, Moving & Storage",
        key: "logistics moving and storage",
        icon: <TbTruckDelivery size={20} />
    },
    {
        title: "Health & Fitness",
        key: "health and fitness",
        icon: <GiHealthNormal size={20} />
    },
    {
        title: "Restaurants",
        key: "restaurants",
        icon: <GrRestaurant size={20} />
    },
    {
        title: "Supermarkets",
        key: "supermarkets",
        icon: <CgShoppingCart size={20} />
    },
    {
        title: "Food Delivery",
        key: "food delivery",
        icon: <BiFoodMenu size={20} />
    },
    {
        title: "Retail & Shopping",
        key: "retail and shopping",
        icon: <CgShoppingBag size={20} />
    },
    {
        title: "Travel, Hospitality & Rentals",
        key: "travel hospitality and rentals",
        icon: <CgAirplane size={20} />
    },
    {
        title: "Automotive",
        key: "automative",
        icon: <FcAutomotive size={20} />
    },
    {
        title: "Education",
        key: "education",
        icon: <FaSchool size={20} />
    },
    {
        title: "Technology & IT",
        key: "technology and it",
        icon: <GrCloudComputer size={20} />
    },
    {
        title: "Real Estate",
        key: "real estate",
        icon: <MdRealEstateAgent size={20} />
    },
    {
        title: "Community & Government",
        key: "community and government",
        icon: <RiGovernmentFill size={20} />
    }


]


const LeftNavForBrowse = () => {
    return (
        <div className={`space-y-5`}>
            {
                leftnav.sort((a, b) =>
                    a.title.localeCompare(b.title)
                )?.map((nav: any, index: number) => {
                    return (
                        <div key={index}>
                            <a href={`/web/browse?q=${nav?.key}`}>
                                <div
                                    key={index}
                                    className={`flex place-content-start place-items-center gap-2 w-full hover:bg-blue-100 pl-5 py-1.5 hover:cursor-pointer`}
                                >

                                    <div className={`w-[30px] h-[30px] flex place-content-center place-items-center bg-blue-100 rounded-full`}>
                                        {nav?.icon}
                                    </div>
                                    <div className={`text-lg`}>
                                        {nav.title}
                                    </div>
                                </div>
                            </a>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LeftNavForBrowse
