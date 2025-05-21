import React, { useState } from 'react'
import ResponsiveNav from '~/components/header/account/ResponsiveNav'
import LeftNav from './LeftNav'
import { FaTimes } from 'react-icons/fa'
import Sidebar from './Sidebar'
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg'
import { BiChevronLeft, BiChevronRight, BiMenu, BiX } from 'react-icons/bi'

const AccountLayout = ({ children }: any) => {
    const [show, setShow] = useState(true)

    const handleShow = () => {
        if (show === false) {
            setShow(true)
        } else {
            setShow(false)
        }

    }

    return (
        <div className={`h-screen flex flex-col relative`}>


            {/** top navbar */}
            <ResponsiveNav theme={"dark"} />

            <button
                onClick={handleShow}
                className={`text-2xl text-white bg-red-700 p-2 
                rounded-full hover:bg-gray-700 shadow-lg top-[72px]
                ${show ? 'left-[295px]' : 'left-[15px]'}
                focus:outline-none fixed z-50 top-[60px]
                transition-all duration-300 ease-in-out
                hidden md:block`}
            >
                <CgChevronRight className={`${show ? 'rotate-180 transition-all duration-300 ease-in-out' : 'rotate-0 transition-all duration-300 ease-in-out'}`} />
            </button>

            {/** layout */}
            <div className={`flex flex-1 pt-[60px] h-full
                overflow-hidden`}>
                {/** sidebar */}
                <aside
                    className={`bg-gray-50 text-gray-900 
                        h-full overflow-y-auto transition-all z-30
                        duration-300 ease-in-out border-r shadow-md
                        hidden md:block
                        ${show ? 'w-[350px] min-w-[350px]' : 'w-0 min-w-0 overflow-hidden'}`}
                >
                    <div className={`mt-[20px]`}></div>
                    <LeftNav />
                    <div className={`h-[20px]`}></div>
                </aside>


                {/* Main Content */}
                <div className={`flex-1 overflow-y-auto bg-gray-100 py-6 px-[15px]`}>
                    <div className={`max-w-[100%] md:max-w-[80%] mx-auto w-full  
                        `}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountLayout
