import React from 'react'
import BusinessHeader from '../portfolio/business/assets/BusinessHeader'

const ContentLayout = ({ children, businessGuid, data, businessProfile, title }: any) => {
    return (
        <div>
            <div className={`font-semibold text-lg`}>
                {title}
            </div>

            <div className={`mt-4 bg-white px-[15px] pt-4 
                rounded-lg shadow-md pb-8 `}>
                <BusinessHeader
                    businessGuid={businessGuid}
                    data={data}
                    businessProfile={businessProfile}
                />
                {children}
            </div>
        </div>
    )
}

export default ContentLayout
