import React from 'react'
import Featured from './Featured'

const ResultLayout = ({ children }: any) => {
    return (
        <div className={`w-full h-auto px-[15px] mt-5 z-0`}>
            <div className={`max-w-[1100px] mx-auto w-full
                    grid grid-cols-12 gap-8`}>
                <div className={`col-span-12 lg:col-span-8 `}>
                    {children}
                </div>
                <div className={`col-span-12 lg:col-span-4 lg:block `}>
                    <div className={`sticky top-[80px]`}>
                        <Featured />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultLayout
