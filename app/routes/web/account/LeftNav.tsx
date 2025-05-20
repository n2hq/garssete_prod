import { Link } from '@remix-run/react'
import React from 'react'
import { BiBriefcase, BiBriefcaseAlt2, BiSolidBriefcase, BiUser, BiUserCheck } from 'react-icons/bi'
import { BsPersonFill, BsPersonFillGear } from 'react-icons/bs'
import { CgChevronDown, CgChevronRight, CgPassword, CgProfile, CgUser, CgUserRemove } from 'react-icons/cg'
import { HiMiniBriefcase } from 'react-icons/hi2'
import { MdEmail, MdOutlineAttachEmail, MdPassword, MdWifiPassword } from 'react-icons/md'
import { RiBriefcase4Line, RiProfileLine } from 'react-icons/ri'

const LeftNav = () => {
    return (
        <div className={`mt-[80px] mx-[15px]`}>
            <div className={`font-bold text-[18px]`}>
                Manage Account
            </div>

            <div className={`mt-[20px] flex place-items-center gap-3`}>
                <div className={`h-[50px] w-[50px] bg-blue-100 rounded-full
                    flex place-items-center place-content-center`}>
                    U
                </div>
                <div>Anderson, Peter</div>
            </div>

            <hr className={`mt-[15px]`} />

            <div className={`mt-[20px]`}>
                <Link to={`/web/account/profile`}>
                    <div className={` flex place-items-center gap-3
                        hover:bg-blue-50 py-1`}>
                        <div className={`w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300`}>
                            <BsPersonFillGear className={`text-[27px]`} />
                        </div>
                        <div>
                            Account Profile
                        </div>
                    </div>
                </Link>
            </div>

            <div className={`mt-[0px]`}>
                <Link to={`/web/account/email_address`}>
                    <div className={` flex place-items-center gap-3
                        hover:bg-blue-50 py-1`}>
                        <div className={`w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300`}>
                            <MdOutlineAttachEmail className={`text-[25px]`} />
                        </div>
                        <div>
                            Email Address
                        </div>
                    </div>
                </Link>
            </div>

            <div className={`mt-[0px]`}>
                <Link to={`/web/account/change_password`}>
                    <div className={` flex place-items-center gap-3
                        hover:bg-blue-50 py-1`}>
                        <div className={`w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300`}>
                            <MdPassword className={`text-[25px]`} />
                        </div>
                        <div>
                            Change Password
                        </div>
                    </div>
                </Link>
            </div>

            <div className={`mt-[0px]`}>
                <Link to={`/web/account/reset_password`}>
                    <div className={` flex place-items-center gap-3
                        hover:bg-blue-50 py-1`}>
                        <div className={`w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300`}>
                            <MdWifiPassword className={`text-[25px]`} />
                        </div>
                        <div>
                            Reset Password
                        </div>
                    </div>
                </Link>
            </div>

            <div className={`mt-[0px]`}>
                <Link to={`/web/account/deactivate_profile`}>
                    <div className={` flex place-items-center gap-3
                        hover:bg-blue-50 py-1`}>
                        <div className={`w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300`}>
                            <BsPersonFill className={`text-[25px]`} />
                        </div>
                        <div>
                            Deactivate Profile
                        </div>
                    </div>
                </Link>
            </div>

            <div className={` text-[17px] mt-[20px]
                flex place-items-center h-[40px] place-content-between`}>
                <div className={`font-[600]`}>
                    More tools
                </div>
                <div className={``}>
                    <CgChevronDown className={`text-[20px]`} />
                </div>
            </div>


            <div className={`mt-[0px]`}>
                <Link to={`/web/account/create_business`}>
                    <div className={` flex place-items-center gap-3
                        hover:bg-blue-50 py-1`}>
                        <div className={`w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300`}>
                            <BiBriefcase className={`text-[25px]`} />
                        </div>
                        <div>
                            Create Business
                        </div>
                    </div>
                </Link>
            </div>

            <div className={`mt-[0px]`}>
                <Link to={`/web/account/portfolio`}>
                    <div className={` flex place-items-center gap-3
                        hover:bg-blue-50 py-1`}>
                        <div className={`w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300`}>
                            <HiMiniBriefcase className={`text-[25px]`} />
                        </div>
                        <div>
                            My Portfolio
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default LeftNav
