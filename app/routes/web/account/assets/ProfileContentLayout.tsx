import React from 'react'
import BusinessHeader from '../portfolio/business/assets/BusinessHeader'
import BusinessMenu from '../portfolio/business/assets/BusinessMenu'

const ProfileContentLayout = ({ children, businessGuid, data, businessProfile, title }: any) => {
    //console.log(data)
    return (
        <div>


            <div className={`mt-4 bg-white 
                rounded-lg shadow-md pb-8 `}>
                <div className={`font-semibold text-[17px] border-b-[1px] p-3 flex place-content-between place-items-center`}>
                    <div>
                        {title}
                    </div>
                    <div className={`text-[13px] flex place-items-center gap-2`}>
                        <a href={`/web/account/profile`}
                            className={`border py-[5px] px-[15px] rounded-full bg-blue-50`}
                        >
                            Back
                        </a>


                    </div>
                </div>
                <div className={`px-[15px]  pt-4 `}>
                    <div>
                        {
                            businessGuid && data.userGuid &&
                            <BusinessMenu guid={businessGuid} userGuid={data.userGuid} />
                        }
                    </div>
                    {children}
                    <div className={`h-[40px]`}></div>
                </div>
            </div>
        </div>
    )
}

export default ProfileContentLayout
