import React, { useEffect } from 'react'
import SearchPagination from './PortfolioPagination'
import PortfolioPagination from './PortfolioPagination'

const Portfolio = ({ user, portfolio }: any) => {


    return (
        <div className={` h-fit`}>
            {
                portfolio?.length > 0 ?
                    <PortfolioPagination
                        data={portfolio}
                        itemsPerPage={10}
                    /> :
                    <div className={`flex place-items-center rounded
                            place-content-center p-5 border capitalize`}>
                        <span>no record</span>
                    </div>
            }
        </div>
    )
}

export default Portfolio
