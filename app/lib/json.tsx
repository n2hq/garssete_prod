import { BiBriefcase, BiCategory, BiFoodMenu, BiHome, BiHotel, BiSearch } from "react-icons/bi"
import { BsHouseAdd, BsPersonFill, BsPersonFillGear, BsSearchHeart } from "react-icons/bs"
import { CgAirplane, CgChart, CgFeed, CgPrinter, CgShoppingBag, CgShoppingCart } from "react-icons/cg"
import { FaSchool } from "react-icons/fa"
import { FcAutomotive, FcBusiness, FcBusinessman, FcLandscape, FcServices } from "react-icons/fc"
import { GiHealthNormal, GiHumanTarget } from "react-icons/gi"
import { GrCloudComputer, GrLanguage, GrRestaurant } from "react-icons/gr"
import { HiHome } from "react-icons/hi2"
import { MdAdsClick, MdCleaningServices, MdConstruction, MdDashboard, MdElectricalServices, MdMeetingRoom, MdOutlineAttachEmail, MdPassword, MdPlumbing, MdRealEstateAgent, MdRoomService, MdTravelExplore, MdWifiPassword } from "react-icons/md"
import { RiGovernmentFill } from "react-icons/ri"
import { TbTruckDelivery, TbWritingSign } from "react-icons/tb"

export const navlinks = [
    {
        id: 1,
        url: '/web/search?q=entertainment',
        label: "Entertainment"
    },
    {
        id: 2,
        url: '/web/search?q=restaurant',
        label: "Restaurant"
    },
    {
        id: 3,
        url: '/web/search?q=hotels',
        label: "Hotels"
    },
    {
        id: 4,
        url: '/web/search?q=travel',
        label: "Travel"
    },
    {
        id: 5,
        url: `/web/search?q=real estate`,
        label: "Real Estate"
    },
    {
        id: 6,
        url: '/web/search?q=services',
        label: "Services"
    }
]

export const mobileLinks = [
    {
        title: "Home",
        icon: <HiHome />,
        link: '/'
    },
    {
        title: "Search",
        icon: <BiSearch />,
        link: '/web/search'
    },
    {
        title: "Hotels",
        icon: <BiHotel />,
        link: '/web/search?q=hotels'
    },
    {
        title: "Travel",
        icon: <MdTravelExplore />,
        link: '/web/search?q=travel'
    },
    {
        title: "Real Estate",
        icon: <BsHouseAdd />,
        link: '/web/search?q=real estate'
    },
    {
        title: "Services",
        icon: <FcServices />,
        link: '/web/search?q=services'
    }

]

export const adInfo = {
    clientId: "ca-pub-xxxxxxxxxxxxxxxx",
    adslot: "1234567890",
    format: "auto",
    responsive: "true"
}

export const testAdInfo = {
    clientId: "ca-pub-xxxxxxxxxxxxxxxx",
    adslot: "1234567890",
    format: "auto",
    responsive: "true"
}


export const lnks = [
    { title: "Browse", lnk: "/web/browse", icon: <BsSearchHeart /> },
    { title: "Terms", lnk: "/web/terms", icon: <BiBriefcase /> },
    { title: "Privacy", lnk: "/web/privacy", icon: <TbWritingSign /> },
    { title: "Contact", lnk: "/web/contact", icon: <BiCategory /> },
    /* { title: "Shop", lnk: "/web/shop", icon: <FiShoppingCart /> },
    { title: "Buy Now", lnk: "/web/buynow", icon: <FaBuysellads /> } */
]



export const leftNavLinks = [
    {
        name: "Business Consulting",
        id: "business consulting",
        icon: <MdMeetingRoom size={20} />
    },
    {
        name: "Accounting & Bookkeeping",
        id: "accounting",
        icon: <MdAdsClick size={20} />
    },
    {
        name: "Advertising & Marketing",
        id: "advertising marketing",
        icon: <CgChart size={20} />
    },
    {
        name: "Financial Services",
        id: "financial services",
        icon: <MdDashboard size={20} />
    },
    {
        name: "Legal Services",
        id: "legal services",
        icon: <CgFeed size={20} />
    },
    {
        name: "Human Resource & Recruiting",
        id: "human resource recruiting",
        icon: <GiHumanTarget size={20} />
    },
    {
        name: "Printing and Publishing",
        id: "printing publishing",
        icon: <CgPrinter size={20} />
    },
    {
        name: "Translation & Interpretation",
        id: "translation and interpretation",
        icon: <GrLanguage size={20} />
    },
    {
        name: "Cleaning Services",
        id: "cleaning services",
        icon: <MdCleaningServices size={20} />
    },
    {
        name: "Plumbing",
        id: "plumbing",
        icon: <MdPlumbing size={20} />
    },
    {
        name: "Construction & Roofing",
        id: "construction and roofing",
        icon: <MdConstruction size={20} />
    },
    {
        name: "Electrical Services",
        id: "electrical services",
        icon: <MdElectricalServices size={20} />
    },
    {
        name: "Landscaping & Gardening",
        id: "landscaping and gardening",
        icon: <FcLandscape size={20} />
    },
    {
        name: "Interior Design",
        id: "interior design",
        icon: <MdRoomService size={20} />
    },
    {
        name: "Logistics, Moving & Storage",
        id: "logistics moving and storage",
        icon: <TbTruckDelivery size={20} />
    },
    {
        name: "Health & Fitness",
        id: "health and fitness",
        icon: <GiHealthNormal size={20} />
    },
    {
        name: "Restaurants",
        id: "restaurants",
        icon: <GrRestaurant size={20} />
    },
    {
        name: "Supermarkets",
        id: "supermarkets",
        icon: <CgShoppingCart size={20} />
    },
    {
        name: "Food Delivery",
        id: "food delivery",
        icon: <BiFoodMenu size={20} />
    },
    {
        name: "Retail & Shopping",
        id: "retail and shopping",
        icon: <CgShoppingBag size={20} />
    },
    {
        name: "Travel, Hospitality & Rentals",
        id: "travel, hospitality and rentals",
        icon: <CgAirplane size={20} />
    },
    {
        name: "Automotive",
        id: "automative",
        icon: <FcAutomotive size={20} />
    },
    {
        name: "Education",
        id: "education",
        icon: <FaSchool size={20} />
    },
    {
        name: "Technology & IT",
        id: "technology and it",
        icon: <GrCloudComputer size={20} />
    },
    {
        name: "Real Estate",
        id: "real estate",
        icon: <MdRealEstateAgent size={20} />
    },
    {
        name: "Community & Government",
        id: "community and government",
        icon: <RiGovernmentFill size={20} />
    },
    {
        name: "General Trading",
        id: "general trading",
        icon: <FcBusiness size={20} />
    },


]