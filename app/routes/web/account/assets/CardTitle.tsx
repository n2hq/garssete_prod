import { Link } from '@remix-run/react'
import React, { ReactNode } from 'react'
import { CardTitleProp } from '~/lib/types'


const CardTitle = (cardTitle: CardTitleProp) => {
    return (

        <div className={`font-semibold mb-2 text-xl`}>
            <Link to={`${cardTitle.baseUrl}${cardTitle.guid}`}>
                {cardTitle.children}
            </Link>
        </div>
    )
}

export default CardTitle
