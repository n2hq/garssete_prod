import React from 'react'
import { ComponentProp, SectionProp } from '~/lib/types'



const SectionTitle = ({ title, subtitle }: SectionProp) => {
    return (
        <div className={`mb-6 border-b pb-4 -space-y-1`}>
            <div className={`text-[19px] font-bold
                `}>
                {title}
            </div>
            <div className='text-sm '>
                {subtitle}
            </div>
        </div>
    )
}

export default SectionTitle
