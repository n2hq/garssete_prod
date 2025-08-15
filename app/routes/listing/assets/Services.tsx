import React, { useEffect, useState } from 'react'
import { config, getBusinessProfileImageData } from '~/lib/lib'
import ComponentTitle from './ComponentTitle'

const Services = ({ listing }: any) => {
    const [serviceList, setServiceList] = useState<any[]>([])

    useEffect(() => {
        const convertToList = (phrases: string) => {

            if (phrases !== null && phrases !== "") {
                const serviceList = phrases.split(",").map(item => item.trim());
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
                    serviceList.map((service: any, index: number) => {
                        return (
                            <span className={`bg-blue-50 px-2 border py-1 border-gray-300 hover:shadow-md cursor-move`}>
                                {service}
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Services
