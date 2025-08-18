import { BiBriefcase, BiCategory, BiHome, BiHotel, BiSearch } from "react-icons/bi"
import { BsHouseAdd, BsPersonFill, BsPersonFillGear, BsSearchHeart } from "react-icons/bs"
import { FcServices } from "react-icons/fc"
import { HiHome } from "react-icons/hi2"
import { MdOutlineAttachEmail, MdPassword, MdTravelExplore, MdWifiPassword } from "react-icons/md"
import { TbWritingSign } from "react-icons/tb"

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