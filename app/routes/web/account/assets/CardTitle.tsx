import { Link } from '@remix-run/react'
import React, { ReactNode } from 'react'
import { CardTitleProp } from '~/lib/types'


const CardTitle = (cardTitle: CardTitleProp) => {
    return (

        <div className={` text-[15px] md:text-[19px]
        font-sans tracking-tight font-bold`}>
            <Link to={`${cardTitle.baseUrl}${cardTitle.guid}`}>
                {cardTitle.children}
            </Link>

        </div>
    )
}

export default CardTitle
