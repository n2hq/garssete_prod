import { Link } from '@remix-run/react'
import React, { useState } from 'react'
import { BiBriefcase, BiBriefcaseAlt2, BiSolidBriefcase, BiUser, BiUserCheck } from 'react-icons/bi'
import { BsPersonFill, BsPersonFillGear } from 'react-icons/bs'
import { CgChevronDown, CgChevronRight, CgMoreVertical, CgPassword, CgProfile, CgUser, CgUserRemove } from 'react-icons/cg'
import { FaTimes } from 'react-icons/fa'
import { HiMiniBriefcase } from 'react-icons/hi2'
import { MdCancel, MdEmail, MdOutlineAttachEmail, MdPassword, MdWifiPassword } from 'react-icons/md'
import { RiBriefcase4Line, RiProfileLine } from 'react-icons/ri'

const mainLink = [
    {
        title: "Account Profile",
        icon: <BsPersonFillGear />,
        link: '/web/account/profile'
    },
    {
        title: "Email Address",
        icon: <MdOutlineAttachEmail />,
        link: '/web/account/email_address'
    },
    {
        title: "Change Password",
        icon: <MdPassword />,
        link: '/web/account/change_password'
    },
    {
        title: "Reset Password",
        icon: <MdWifiPassword />,
        link: '/web/account/reset_password'
    },
    {
        title: "Deactivate Profile",
        icon: <BsPersonFill />,
        link: '/web/account/deactivate_profile'
    }

]

const moreTools = [
    {
        title: "Create Business",
        icon: <BiBriefcase />,
        link: '/web/account/create_business'
    },
    {
        title: "My Portfolio",
        icon: <HiMiniBriefcase />,
        link: '/web/account/portfolio'
    }
]

const LeftNav = () => {
    const [expanded, setExpanded] = useState(true)
    return (
        <div className={`mt-[80px] mx-[15px] relative`}>
            <div className={`font-bold text-[18px]`}>
                Manage Account
            </div>

            <div className={` flex mt-8 pt-3`}>
                <img
                    src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                    alt=""
                    className="w-10 h-10 rounded-md"
                />
                <div
                    className={`
                          flex justify-between items-center
                          overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
                      `}
                >
                    <div className="leading-4">
                        <h4 className="font-semibold">John Doe</h4>
                        <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                    </div>
                    <CgMoreVertical size={20} />
                </div>
            </div>

            <hr className={`mt-[15px]`} />

            <div className={`mt-[20px]`}>

            </div>

            {
                mainLink.map((link, index) => {
                    return (
                        <div className={`mt-[0px]`}>
                            <Link to={link.link}>
                                <div className={` flex place-items-center gap-3
                        hover:bg-gray-200/60 py-1 rounded`}>
                                    <div className={`w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300 text-[25px]`}>
                                        {link.icon}
                                    </div>
                                    <div>
                                        {link.title}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })
            }




            <div className={` text-[17px] mt-[20px]
                flex place-items-center h-[40px] place-content-between`}>
                <div className={`font-[600]`}>
                    More tools
                </div>
                <div className={``}>
                    <CgChevronDown className={`text-[20px]`} />
                </div>
            </div>

            {
                moreTools.map((link, index) => {
                    return (
                        <div className={`mt-[0px]`}>
                            <Link to={link.link}>
                                <div className={` flex place-items-center gap-3
                        hover:bg-gray-200/60 py-1 rounded`}>
                                    <div className={`w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300 text-[25px]`}>
                                        {link.icon}
                                    </div>
                                    <div>
                                        {link.title}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default LeftNav
