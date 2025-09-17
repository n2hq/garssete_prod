import React from 'react'
import BusinessHeader from '../portfolio/business/assets/BusinessHeader'
import BusinessMenu from '../portfolio/business/assets/BusinessMenu'

const PortfolioLayout = ({ children, businessGuid, data, businessProfile, title }: any) => {
    return (
        <div>


            <div className={`mt-4 bg-white 
                rounded-lg shadow-md pb-8 `}>
                <div className={`font-semibold text-[17px] border-b-[1px] p-3 flex place-content-between place-items-center`}>
                    <div>
                        {title}
                    </div>
                    <div className={`text-[13px] flex place-items-center gap-2`}>


                        <a href={`/web/account/portfolio`}
                            className={`border py-[5px] px-[10px] rounded-full bg-blue-50`}
                        >
                            Portfolio Home
                        </a>

                    </div>
                </div>
                <div className={`  pt-0 `}>
                    <div className={`w-full flex place-content-end`}>

                    </div>
                    {children}
                    <div className={`h-[40px]`}></div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioLayout
