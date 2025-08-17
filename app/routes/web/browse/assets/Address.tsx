import React from 'react'

const Address = ({ listing }: any) => {
    return (
        <div>
            {listing?.address_one}
            {
                listing?.address_two ? `, ${listing?.address_two}` : ''
            }
            {
                listing?.city_name ? `, ${listing?.city_name}` : ''
            }
            {
                listing?.state_name ? `, ${listing?.state_name}` : ''
            }
            {
                listing?.country_name ? `, ${listing?.country_name}` : ''
            }
        </div>
    )
}

export default Address