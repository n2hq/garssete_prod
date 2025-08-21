import React from 'react'
import CardTitle from '../../../assets/CardTitle'
import { Link } from '@remix-run/react'
import { PortfolioSearchBox } from './PortfolioSearchBox'

const CardHeaderWithSearch = ({ base_url, title, q }: any) => {
    return (
        <div>
            <div className={`bg-blue-100 w-full px-3 
                            flex place-content-between rounded-lg
                            place-items-center h-auto py-3 gap-[5px]
                            leading-[1.5em]`}>
                <div className={`h-full`}>
                    <CardTitle
                        baseUrl={base_url}
                        guid={''}>
                        {title}
                    </CardTitle>
                </div>
                <div className={`grow flex place-content-end`}>
                    <PortfolioSearchBox query={q} />
                </div>

            </div>
        </div>
    )
}

export default CardHeaderWithSearch
