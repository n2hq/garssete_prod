import React, { useEffect, useState } from 'react'
import AccountLayout from '../assets/AccountLayout'
import ContentLayout from '../assets/ContentLayout'
import { useAuth } from '~/context/AuthContext'
import { getUserProfile } from '~/lib/lib'
import EmailForm from './assets/EmailForm'
import CardTitle from '../assets/CardTitle'
import { redirect } from '@remix-run/react'

const index = () => {
    const auth = useAuth()
    if (!auth) { return null }

    const { user } = auth



    const [userProfile, setUserProfile] = useState<any | null>(null)
    const [data, setData] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

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

    useEffect(() => {
        if (data) {
            setLoading(false)
        }
    }, [data])



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        )
    }

    return (
        <AccountLayout>
            <ContentLayout title={'Email Address'}>

                {userProfile === null ? 'Loading...' : ''}

                <CardTitle
                    baseUrl='/web/account/profile'
                    guid={''}>
                    {userProfile?.email}
                </CardTitle>

                <div className={`font-semibold mb-2 text-md`}>

                </div>

                {
                    data && <EmailForm loaderData={data} user={user} />
                }
            </ContentLayout>
        </AccountLayout>
    )
}

export default index
