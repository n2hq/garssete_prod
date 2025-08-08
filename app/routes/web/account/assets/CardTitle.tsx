import { Link } from '@remix-run/react'
import React, { ReactNode } from 'react'
import { CardTitleProp } from '~/lib/types'


const CardTitle = (cardTitle: CardTitleProp) => {
    return (

        <div className={`font-semibold text-[19px]
        `}>
            <Link to={`${cardTitle.baseUrl}${cardTitle.guid}`}>
                {cardTitle.children}
            </Link>

        </div>
    )
}

export default CardTitle
