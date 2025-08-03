import { Link } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { getUserProfile } from '~/lib/lib'

const ClaimBusiness = ({ listing }: any) => {
    const [ownerRole, setOwnerRole] = useState('user')
    useEffect(() => {
        if (listing?.owner) {

            getUserProfile(listing?.owner).then((data) => {
                let user: any = data
                setOwnerRole(user.role)
            })
        }
    }, [listing])
    return (
        <>
            {
                ownerRole === "admin" &&
                <div className={` mt-8 `}>
                    <Link to={`/`}>
                        <div className={`px-3 text-[14px] text-center border py-[15px] rounded underline underline-offset-2 hover:text-blue-500 bg-blue-50`}>
                            Is this your business? Claim it for free!
                        </div>
                    </Link>
                </div>
            }
        </>
    )
}

export default ClaimBusiness
