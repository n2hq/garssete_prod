import React, { useEffect, useState } from 'react'
import AccountLayout from '../assets/AccountLayout'
import ContentLayout from '../assets/ContentLayout'
import { useAuth } from '~/context/AuthContext'
import { getUserProfile } from '~/lib/lib'
import EmailForm from './assets/EmailForm'

const index = () => {
    const { user } = useAuth()
    const [userProfile, setUserProfile] = useState<any | null>(null)
    const [data, setData] = useState<any | null>(null)

    useEffect(() => {
        async function getAllData(guid: string) {
            const userProfileData = await getUserProfile(guid || "")
            setUserProfile(userProfileData)
        }

        if (user?.guid) {
            getAllData(user?.guid)
        }
    }, [user?.guid])

    useEffect(() => {
        if (userProfile) {
            const data = {
                userProfile,
            }

            setData(data)
        }
    }, [
        userProfile
    ])

    return (
        <AccountLayout>
            <ContentLayout title={'Email Address'}>

                {userProfile === null ? 'Loading...' : ''}

                <div className={`font-semibold mb-2 text-md`}>
                    {userProfile?.email}
                </div>

                {
                    data && <EmailForm loaderData={data} user={user} />
                }
            </ContentLayout>
        </AccountLayout>
    )
}

export default index
