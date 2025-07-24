import { Link } from '@remix-run/react'
import React from 'react'

const Feature = ({ feature }: any) => {

    return (
        <div id={feature.gid} className={`pb-4 pt-3`}>
            <Link to={`/${feature?.username ? feature?.username : feature?.gid}`}>
                <div className={`text-[15px] tracking-normal 
                text-blue-700 font-normal`}>
                    {feature.title}
                </div>
            </Link>
            <div className={`text-md font-semibold 
                tracking-tight mt-[2px]`}>
                {feature.phone}
            </div>
            <div className={`font-normal  
                tracking-normal mt-[2px] leading-[1.3em]
                text-black`}>
                {feature.short_description.substring(0, 80)}
            </div>
            <div className={`text-[12px] font-normal 
                tracking-tight mt-[5px] leading-[1.4em]
                text-brown-700`}>
                {feature.address_one}
            </div>
            <div className={` font-semibold  
                tracking-tight mt-[8px] text-blue-800`}>
                <Link to={feature.website ? feature.website : `#${feature.gid}`}>
                    Website
                </Link>
            </div>
        </div>
    )
}

export default Feature
