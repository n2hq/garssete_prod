import React, { useState } from 'react'
import ResponsiveNav from '~/components/header/account/ResponsiveNav'
import LeftNav from './LeftNav'
import { FaTimes } from 'react-icons/fa'
import Sidebar from './Sidebar'
import { CgChevronRight } from 'react-icons/cg'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

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
        <div className={`relative`}>
            <ResponsiveNav theme={"dark"} />

            <div
                onClick={() => handleShow()}
                className={`
                ${show ? 'left-[280px]' : 'left-[30px] top-[90px]'}
                absolute top-[70px] z-40
                bg-red-500 text-[white] h-[40px] w-[50px]
                text-[27px] shadow-md shadow-gray-500
                flex place-items-center place-content-center
                transition-all duration-500 ease-in-out cursor-pointer
                
                `}>
                <BiChevronRight className={`transform 
                            transition-transform duration-800
                        ${show ? 'rotate-0' : 'rotate-180'}`}
                />

            </div>
            {/** layout */}
            <div className={`flex h-screen`}>
                {/** left */}
                <div className={`transition-all duration-500 ease-in-out 
                h-screen overflow-y-auto bg-gray-50 shadow-md shadow-gray-400/70
                    ${show ? 'w-[350px] min-w-[350px]' : 'w-[0px] min-w-0'}
                    overflow-hidden z-10 relative border-r
                    `}>

                    <div className={`
                    transition-all duration-500 ease-in-out
                    ${show ? 'opacity-100 translate-x-0' : ' opacity-0 -translate-x-full'}
                    `}>
                        <LeftNav />
                    </div>
                </div>

                {/** right */}
                <div className={`bg-blue-100 h-screen w-full overflow-y-auto`}>
                    <div className={`h-[2000px] bg-gray-100 mx-[15px] mt-[75px] mb-[15px]`}>
                        {children}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AccountLayout
