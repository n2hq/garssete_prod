import React from 'react'
import ResponsiveNav from '~/components/header/account/ResponsiveNav'
import LeftNav from './LeftNav'

const AccountLayout = ({ children }: any) => {
    return (
        <div>
            <ResponsiveNav theme={"dark"} />
            <div className={`flex`}>
                <div className={`w-[350px] min-w-[350px] border-r h-screen
                    `}>
                    <LeftNav />
                </div>
                <div className={`h-screen bg-gray-50 w-full`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AccountLayout
