import React, { useEffect, useState } from 'react'
import ResponsiveNav from '~/components/header/account/ResponsiveNav'
import LeftNav from './LeftNav'
import { FaTimes } from 'react-icons/fa'
import Sidebar from './Sidebar'
import { CgChevronLeft, CgChevronRight, CgMenu } from 'react-icons/cg'
import { BiChevronLeft, BiChevronRight, BiMenu, BiMenuAltLeft, BiX } from 'react-icons/bi'
import { BsMenuButton } from 'react-icons/bs'
import { redirect, useLocation, useNavigate } from '@remix-run/react'
import AccountNav from '~/components/header/account/AccountNav'
import HomeNav from '~/routes/assets/header/HomeNav'
import { AuthProvider, useAuth } from '~/context/AuthContext'
import { UserProfile } from '~/lib/types'
import { appConfig, getUserProfile } from '~/lib/lib'
import { FiAlertCircle, FiAlertTriangle } from 'react-icons/fi'
import SearchNavbar from '~/components/header/new/SearchNavbar'
import SrchNavbar from '~/components/header/new/SrchNavbar'
import { AuthContextType } from '~/lib/types'

const BusinessLayout = ({ children }: any) => {
    const [show, setShow] = useState(true)
    const [userProfile, setUserProfile] = useState<any | null>(null)
    const [userActive, setUserActive] = useState<any | false>(true)
    const [inactiveMessage, setInactiveMessage] = useState<any | null>(null)

    //const tokens = localStorage.getItem("authTokens")

    const auth = useAuth()
    if (!auth) { return null }

    //console.log(auth)

    useEffect(() => {
        if (auth.user === null) {

            window.location.href = ("/web/signin")

        }
    }, [auth])


    const [loading, setLoading] = useState(true)

    const handleShow = () => {
        if (show === false) {
            setShow(true)
        } else {
            setShow(false)
        }

    }

    useEffect(() => {
        if (auth?.user?.guid !== null && auth?.user?.guid !== undefined && auth?.user?.guid !== "") {

            setLoading(false)
        } else {

            window.location.href = "/web/signin"
        }
    }, [auth?.user])

    useEffect(() => {
        const getData = async (guid: string) => {
            const userProfile = await getUserProfile(guid || "")
            setUserProfile(userProfile)
        }

        if (auth?.user) {
            getData(auth?.user.guid)
        }

    }, [auth?.user])


    useEffect(() => {
        const tokens = localStorage.getItem("authTokens")

        if (tokens === null || tokens === undefined || tokens === '') {
            window.location.href = '/web/signin'
        }
    }, [])

    useEffect(() => {
        if (Boolean(userProfile)) {
            setUserActive(Boolean(userProfile?.active))
        }
    }, [userProfile])

    useEffect(() => {
        if (userActive === false) {
            const info = 'You are currently deactivated. Some operations like creating new business cannot be performed. Activate your profile to continue.'
            setInactiveMessage(info)
        }
    }, [userActive])



    if (loading) {

        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        )
    }





    return (
        <div className={`h-screen flex flex-col relative`}>


            {/** top navbar */}
            <div className={`h-[${appConfig.NAVBAR_HEIGHT}px] md:h-[0px]`}></div>
            <SrchNavbar />

            <div className={`md:hidden`}>

                <HomeNav />
            </div>


            {/* <div className='hidden md:block'>
                <AccountNav />
            </div> */}

            <button
                onClick={handleShow}
                className={`text-xl text-white bg-blue-700 p-2 
                rounded-full hover:bg-gray-700 shadow-lg top-[72px]
                ${show ? 'left-[295px]' : 'left-[15px]'}
                focus:outline-none fixed z-50 top-[60px] 
                transition-all duration-1000 ease-in-out
                hidden lg:block`}
            >
                <CgMenu className={`${show ? 'rotate-0 transition-all duration-1000 ease-in-out' : 'rotate-90 transition-all duration-1000 ease-in-out'}`} />
            </button>

            {/** layout */}
            <div className={`flex flex-1 md:mt-[${appConfig.NAVBAR_HEIGHT}px] h-full
                overflow-hidden`}>
                {/** sidebar */}
                <aside
                    className={`bg-gray-50 text-gray-900 
                        h-full overflow-y-auto transition-all z-30
                        duration-1000 ease-in-out border-r shadow-md
                        hidden lg:block 
                        ${show ? 'w-[350px] min-w-[350px]' : 'w-0 min-w-0 overflow-hidden'}`}
                >
                    <div className={`mt-[20px]`}></div>
                    <LeftNav userProfile={userProfile} />
                    <div className={`h-[20px]`}></div>
                </aside>


                {/* Main Content */}
                <div className={`flex-1 overflow-y-auto bg-gray-50 pb-6 px-[0px] relative`}>
                    {
                        inactiveMessage &&
                        <div className={`max-w-[100%] mx-auto w-full bg-blue-500 px-3 pt-[10px] pb-[15px] text-white text-center`}>
                            {
                                inactiveMessage
                            }

                        </div>
                    }
                    <div className={`max-w-[100%] mx-auto w-full  `}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessLayout
