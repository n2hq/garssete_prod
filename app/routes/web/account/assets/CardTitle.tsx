import { Link } from '@remix-run/react'
import React, { ReactNode } from 'react'
import { BiLeftArrow, BiRightArrow, BiRightArrowCircle, BiSolidRightArrowAlt } from 'react-icons/bi'
import { CgChevronDoubleRight } from 'react-icons/cg'
import { CardTitleProp } from '~/lib/types'


const CardTitle = (cardTitle: CardTitleProp) => {
    return (

        <div className={` text-[15px] md:text-[19px]
        font-sans tracking-tight font-bold text-blue-900 hover:underline`}>
            <Link to={`${cardTitle.baseUrl}${cardTitle.guid}`}>
                <div className={`flex place-items-center`}>
                    <CgChevronDoubleRight className={`font-bold`} size={25} />{cardTitle.children}
                </div>
            </Link>

        </div>
    )
}

export default CardTitle
