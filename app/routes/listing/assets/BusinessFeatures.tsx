import React, { useEffect, useState } from 'react'
import { ListingType } from '~/lib/types'
import { getBusinessFeatures } from '~/lib/lib'
import ComponentTitle from './ComponentTitle'
import { facilityFeatures } from '~/lib/json/facility_features'

const BusinessFeatures = ({ listing }: any) => {
    const [features, setFeatures] = useState<any>(undefined)

    useEffect(() => {
        getBusinessFeatures(listing?.gid).then((data) => {
            const mergedFeatures = data?.map((dbF: any) => {
                const facility = facilityFeatures.find(f => f.feature_id === dbF.feature_id);

                return {
                    ...facility, // take default info (name, description, icon)
                    user_description: dbF.user_description || null, // add user description if any
                    business_guid: dbF.business_guid
                }
            });

            setFeatures(mergedFeatures)
        })

    }, [listing.business_guid])
    return (
        <div className=' mt-12'>
            <ComponentTitle title='Facility Features' />

            <div className={`grid grid-cols-2 gap-x-4 gap-y-8 mt-3`}>
                {
                    features?.map((feature: any, index: any) => {
                        return (
                            <div key={index} className={`flex flex-col`}>
                                <div className={`font-bold flex place-items-center gap-2 `}>
                                    <span className={`text-lg`}>
                                        {feature.icon}
                                    </span>
                                    <span className={`text-lg leading-[1.2em]`}>
                                        {feature.name}
                                    </span>
                                </div>
                                <div className={` mt-[5px] text-black tracking-normal leading-snug`}>
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
