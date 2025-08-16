import React from 'react'
import StarRatingAlt from './StarRatingAlt'

const Header = ({ listing }: any) => {

    return (
        <>
            <div className={`text-[19px] md:text-[24px]
                font-bold mt-[5px] leading-[1.2em] border-b pb-1`}>
                {listing?.title}

            </div>

            <div className={`mt-1.5 leading-[1.3em] space-x-1`}>
                <span className={`underline font-bold`}>Address:</span>
                <span className={``}>
                    {listing?.address_one ? `${listing?.address_one}, ` : ''}
                    {listing?.address_two ? `${listing?.address_two}, ` : ''}
                    {listing?.city_name ? `${listing?.city_name}, ` : ''}
                    {listing?.state_name ? `${listing?.state_name}, ` : ''}
                    {listing?.country_name}
                </span>
            </div>
        </>
    )
}

export default Header
