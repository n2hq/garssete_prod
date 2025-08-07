import React from 'react'
import { ComponentProp } from '~/lib/types'



const ComponentTitle = ({ title }: ComponentProp) => {
    return (
        <div className={`text-[19px] font-bold
                border-b mb-6`}>
            {title}
        </div>
    )
}

export default ComponentTitle
