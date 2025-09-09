import React from 'react'
import CardTitle from '../../../assets/CardTitle'
import { Link, NavLink } from '@remix-run/react'
import { CgChevronDoubleRight } from 'react-icons/cg'

const BusinessHeader = ({ businessGuid, data, businessProfile }: any) => {
    return (
        <div className={``}>
            <div className={`bg-blue-100 w-full px-3 
                            flex place-content-between rounded-lg
                            place-items-center h-auto py-2 gap-[5px]
                            leading-[1.5em]`}>
                <div className="flex items-center text-blue-800 text-[17px] font-sans tracking-tight font-bold hover:underline">
                    <CgChevronDoubleRight className="mr-1 flex-shrink-0" size={25} />
                    <span className="line-clamp-1 overflow-hidden">
                        {data?.businessProfile?.title}
                    </span>
                </div>

                <div className={`space-x-2   flex place-content-end`}>
                    <NavLink to={`/web/account/portfolio`}
                        className={``}
                    >
                        <div className={` py-2 rounded-full hover:bg-white border border-gray-600 w-[120px] text-center`}>
                            Back to Portfolio
                        </div>
                    </NavLink>
                    <Link to={`/${businessProfile?.gid}`}

                    >
                        <button className={``}>
                            <div className={`py-2 border border-black rounded-full hover:bg-white w-[90px]`}>
                                Preview
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BusinessHeader
