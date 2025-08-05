import React, { useEffect, useState } from 'react'
import { config, getBusinessProfileImageData } from '~/lib/lib'
import ComponentTitle from './ComponentTitle'

const Description = ({ listing }: any) => {
    const [img, setImg] = useState('')

    useEffect(() => {
        if (listing.gid) {
            let imgdata = getBusinessProfileImageData(listing.gid)
            imgdata.then((data) => {

                setImg(config.IMG_BASE_URL + data.image_url)
            })
        }
    }, [listing])
    return (
        <div className='mt-12'>
            <ComponentTitle title='About this business' />
            <div className={`flex place-items-start place-content-start
                gap-2 mt-4 mb-3`}>
                <div className={`rounded-full bg-black w-[30px] h-[30px]
                    overflow-hidden relative`}>
                    <img
                        className={`object-cover w-full h-full`}
                        src={img} alt="" />
                </div>
                <div className={`flex flex-col`}>
                    <div className={`text-md font-bold tracking-tight leading-[1.2em]`}>
                        {listing.title}
                    </div>
                    <div className={`text-[12px] capitalize`}>
                        {listing.category}
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
