import { Link } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { getUserProfile } from '~/lib/lib'

const ClaimBusiness = ({ listing }: any) => {
    const [ownerRole, setOwnerRole] = useState('user')
    useEffect(() => {
        const getOwnerRole = async (owner: string) => {
            await getUserProfile(owner).then((data) => {
                let user: any = data
                setOwnerRole(user.role)
                console.log(user.role)
            })

        }

        if (listing?.owner) {
            getOwnerRole(listing?.owner)
        }

    }, [listing])
    return (
        <>
            {
                ownerRole === "admin" &&
                <div className={` md:mt-4 `}>
                    <Link to={`/web/contact`}>
                        <div className={`px-3 text-[14px] text-center border py-[15px] rounded underline underline-offset-2 hover:text-blue-500 bg-blue-50 mx-[0px] md:mx-[0px]
                            mb-[40px] md:mb-[40px]`}>
                            Is this your business? Claim it for free!
                        </div>
                    </Link>
                </div>
            }
        </>
    )
}

export default ClaimBusiness
