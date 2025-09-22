import { useLocation } from '@remix-run/react'
import React, { useEffect } from 'react'



const settingsLinks = [
    {
        title: "Business Hours",
        link: "/settings"
    },
    {
        title: "Gallery",
        link: "/gallery"
    },
    {
        title: "Videos",
        link: "/videos"
    },
    {
        title: "Products",
        link: "/products"
    },
    {
        title: "Facilities",
        link: "/facilities"
    },
    {
        title: "Socials Media",
        link: "/social_media"
    },
    {
        title: "Activate",
        link: "/activate"
    },
    {
        title: "Delete",
        link: "/delete"
    },
    {
        title: "Reassign Business",
        link: "/reassign"
    },
]

const BusinessDrawer = ({ isOpen, userGuid, businessGuid }: any) => {
    const navOpen = isOpen ? "translate-x-0 " : "-translate-x-[110%]"
    const location = useLocation()
    const pathname = `/web/account/portfolio/${businessGuid}/${userGuid}`
    const businesspath = `/web/account/portfolio/${businessGuid}`

    useEffect(() => {
        if (userGuid && businessGuid) {

        }
    }, [userGuid, businessGuid])

    return (
        <div className={`relative`}>
            <div className={` fixed ${navOpen}   w-[250px] h-screen bg-white shadow-lg transform transition-transform ease-in-out duration-500 z-[10] `}>
                <div className={`p-5 border-b font-bold text-lg`}>
                    Settings
                </div>
                <div className={``}>

                    <div className='group'>
                        <a href={`/web/account/portfolio/${businessGuid}`}>
                            <div className={`py-4 hover:bg-gray-100 ${location.pathname === businesspath && 'bg-gray-300/30'}`}>
                                <div className={`mx-5 group-hover:underline`}>
                                    Page Home
                                </div>
                            </div>
                        </a>
                    </div>

                    {
                        settingsLinks?.map((setting: any, index: number) => {
                            const url = pathname + setting.link

                            return (
                                <div className={` group  `} key={index}>
                                    <a href={`/web/account/portfolio/${businessGuid}/${userGuid}${setting?.link}`}>
                                        <div className={`py-4 hover:bg-gray-200 ${location.pathname === url && 'bg-gray-300/30'}`}>
                                            <div className={`mx-5 group-hover:underline`}>
                                                {
                                                    setting?.title
                                                }
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BusinessDrawer
