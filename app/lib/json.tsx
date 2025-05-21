import { BiHome, BiHotel, BiSearch } from "react-icons/bi"
import { BsHouseAdd, BsPersonFill, BsPersonFillGear } from "react-icons/bs"
import { FcServices } from "react-icons/fc"
import { HiHome } from "react-icons/hi2"
import { MdOutlineAttachEmail, MdPassword, MdTravelExplore, MdWifiPassword } from "react-icons/md"

export const navlinks = [
    {
        id: 1,
        url: '/',
        label: "Home"
    },
    {
        id: 2,
        url: '/web/search',
        label: "Search"
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