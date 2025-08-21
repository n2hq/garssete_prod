import React from 'react'
import SrchNavbar from '~/components/header/new/SrchNavbar'

const Browse = () => {
    return (
        <div>
            <SrchNavbar />


            <div className={`grid grid-cols-12 gap-4 h-screen`}>
                <div className={`col-span-3 block h-full`}>
                    <div className={`sticky top-[80px] bg-red-50 h-screen overflow-y-auto`}>
                        Left
                    </div>
                </div>
                <div className={`col-span-6 bg-blue-200`}>
                    <div className={`h-[1000px]`}>
                        Center
                    </div>
                </div>
                <div className={`col-span-3 block`}>
                    <div className={`w-full sticky top-[80px]`}>
                        Right
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Browse
