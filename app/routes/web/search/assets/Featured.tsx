import React, { useEffect, useState } from 'react'

import Feature from './Feature'

import { get } from 'http'
import { getFeaturedListing } from '~/lib/lib'

const featuredData = [
    {
        title: "Jonathan B Lafrance Law OFC",
        phone: `(661) 257-8883`,
        short_description: `Attorneys, Child Support Collections, Automoous`,
        website: '',
        address_one: '3456 Upper Manhattan Avenue Stanford, Santa Clarita, CA 91355',
        gid: 'dfasfdasdfasfasdfsdasdf'
    },
    {
        title: "Jonathan B Lafrance Law OFC",
        phone: `(661) 257-8883`,
        short_description: `Attorneys, Child Support Collections, Automoous`,
        website: 'http://google.com',
        address_one: '3456 Upper Manhattan Avenue Stanford, Santa Clarita, CA 91355',
        gid: 'dfasfdasdfasfasdfsdasmf'
    },
    {
        title: "Jonathan B Lafrance Law OFC",
        phone: `(661) 257-8883`,
        short_description: `Attorneys, Child Support Collections, Automoous`,
        website: 'http://google.com',
        address_one: '3456 Upper Manhattan Avenue Stanford, Santa Clarita, CA 91355',
        gid: 'dfasfdasdfasfasdfsdasdg'
    },
    {
        title: "Jonathan B Lafrance Law OFC",
        phone: `(661) 257-8883`,
        short_description: `Attorneys, Child Support Collections, Automoous`,
        website: '',
        address_one: '3456 Upper Manhattan Avenue Stanford, Santa Clarita, CA 91355',
        gid: 'dfasfdasdfasfasdfsdasd8'
    },


]


const Featured = () => {
    const [featured, setFeatured] = useState<any[]>([])
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const getFeatured = async () => {
            const data = await getFeaturedListing()
            //console.log(data)
            setFeatured(data)
        }

        getFeatured()
    }, [])

    return (
        <div className={`border-[1px] px-4 pt-4 pb-4
        rounded-xl border-gray-200`}>
            <div className={`font-bold text-lg`}>Featured</div>
            <div className={`divide-y divide-gray-200`}>
                {
                    featured?.length > 0 ?
                        featured?.map((feature: any, index: number) => {
                            if (index > 2) {
                                return null
                            }
                            return (
                                <Feature key={index} feature={feature} />
                            )

                        }) :
                        <div className={`text-[15px] mt-4`}>Loading...</div>
                }
            </div>
        </div>
    )
}

export default Featured
