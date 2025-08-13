import React from 'react'
import CardTitle from '../../../assets/CardTitle'
import { Link } from '@remix-run/react'

const BusinessHeader = ({ businessGuid, data, businessProfile }: any) => {
    return (
        <div>
            <div className={`bg-blue-100 w-full px-3 
                            flex place-content-between rounded-lg
                            place-items-center h-auto py-2 gap-[5px]
                            leading-[1.5em]`}>
                <div className={`h-full`}>
                    <CardTitle
                        baseUrl='/web/account/portfolio/'
                        guid={businessGuid}>
                        {data?.businessProfile?.title}
                    </CardTitle>
                </div>

                <Link to={`/${businessProfile?.gid}`}

                >
                    <button className={`px-3 border border-black
                                    py-2 rounded-full hover:bg-white`}>
                        Preview
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default BusinessHeader
