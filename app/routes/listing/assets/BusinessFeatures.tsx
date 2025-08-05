import React, { useEffect, useState } from 'react'
import { ListingType } from '~/lib/types'
import { getBusinessFeatures } from '~/lib/lib'
import ComponentTitle from './ComponentTitle'

const BusinessFeatures = ({ listing }: any) => {
    const [features, setFeatures] = useState<any>(undefined)

    useEffect(() => {
        getBusinessFeatures(listing.gid).then((data) => {
            setFeatures(data)
        })

    }, [listing.business_guid])
    return (
        <div className=' mt-12'>
            <ComponentTitle title='Features' />

            <div className={`grid grid-cols-2 gap-4 mt-3`}>
                {
                    features?.map((feature: any, index: any) => {
                        return (
                            <div key={index} className={`flex flex-col`}>
                                <div className={`font-bold`}>
                                    {feature.name}
                                </div>
                                <div className={` mt-[-2px] text-black tracking-normal leading-snug`}>
                                    {feature.user_description || feature.description}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BusinessFeatures
