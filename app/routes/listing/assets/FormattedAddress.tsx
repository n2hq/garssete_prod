import React from 'react'
import { ListingType } from '~/lib/types'

interface FormattedAddressProp {
    listing: ListingType
}

const FormattedAddress = ({ listing }: FormattedAddressProp) => {
    return (
        <div>
            {
                listing?.address_one ? listing?.address_one + ', ' : ''
            }
            {
                listing?.state_code ? listing?.state_name + ', ' : ''
            }
            {
                listing?.country_code ? listing?.country_code : ''
            }
        </div>
    )
}

export default FormattedAddress
