import React from 'react'
import ComponentTitle from './ComponentTitle'

const ShortDescription = ({ listing }: any) => {
    return (
        <div className={`mt-4`}>
            <ComponentTitle title='Intro' />

            <div className={` text-[14px] flex flex-col gap-y-4 whitespace-pre-wrap `}>
                {listing.short_description}
            </div>
        </div>
    )
}

export default ShortDescription
