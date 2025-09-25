import React, { useEffect, useState } from 'react'
import { config, getBusinessProfileImageData, searchCategories } from '~/lib/lib'
import ComponentTitle from './ComponentTitle'

const Description = ({ listing }: any) => {
    const [img, setImg] = useState('')
    const [placeholder, setPlaceholder] = useState('/images/placeholder22.png')

    useEffect(() => {
        if (listing.gid) {
            //console.log(listing)
            let imgdata = getBusinessProfileImageData(listing.gid)
            imgdata.then((data) => {
                if (data?.image_url === '' || data?.image_url === undefined || data?.image_url === null) {
                    setImg(placeholder)
                } else {
                    setImg(config.IMG_BASE_URL + data.image_url)
                }

            })
        }
    }, [listing])
    return (
        <div className='mt-12'>
            <ComponentTitle title='About this business' />
            <div className={`flex place-items-start place-content-start
                gap-2 mt-4 mb-3`}>
                <div className={`rounded-full bg-white w-[30px] h-[30px]
                    overflow-hidden relative border`}>
                    <img
                        className={`object-cover w-full h-full`}
                        src={img} alt="" />
                </div>
                <div className={`flex flex-col`}>
                    <div className={`text-md font-bold tracking-tight leading-[1.2em]`}>
                        {listing.title}
                    </div>
                    <div className={`text-[12px] capitalize`}>
                        {searchCategories(listing.category)?.name}
                    </div>
                </div>
            </div>

            <div className={`flex flex-col gap-y-5 text-[14px] mt-4 whitespace-pre-wrap`}>
                {listing?.long_description}
            </div>
        </div>
    )
}

export default Description
