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
]

const BusinessDrawer = ({ isOpen, userGuid, businessGuid }: any) => {
    const navOpen = isOpen ? "translate-x-0 " : "-translate-x-[110%]"

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
                            <div className={`py-4 hover:bg-gray-100`}>
                                <div className={`mx-5 group-hover:underline`}>
                                    Page Home
                                </div>
                            </div>
                        </a>
                    </div>

                    {
                        settingsLinks?.map((setting: any, index: number) => {
                            return (
                                <div className={` group  `}>
                                    <a href={`/web/account/portfolio/${businessGuid}/${userGuid}${setting?.link}`}>
                                        <div className={`py-4 hover:bg-gray-100`}>
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
