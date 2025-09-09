import React, { useEffect, useState } from 'react'
import { config, getBusinessProfileImageData } from '~/lib/lib'
import ComponentTitle from './ComponentTitle'
import StringToListMaker from '~/components/content/StringToListMaker'

const Services = ({ listing }: any) => {
    const [serviceList, setServiceList] = useState<any[]>([])

    useEffect(() => {
        const convertToList = (phrases: string) => {

            if (phrases !== null && phrases !== "") {
                const serviceList = phrases?.split(",").map(item => item.trim());
                setServiceList(serviceList)
            }
        }
        if (listing !== null) {
            convertToList(listing?.services)
        }
    }, [listing])
    return (
        <div className='mt-12'>
            <ComponentTitle title='Services' />


            <div className={`flex gap-3 flex-wrap`}>
                {
                    listing?.services &&
                    <StringToListMaker useGrid phrasesString={listing?.services} />
                }
            </div>
        </div>
    )
}

export default Services
