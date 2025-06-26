import React, { useEffect, useState } from 'react'
import AccountLayout from '../assets/AccountLayout'
import ContentLayout from '../assets/ContentLayout'
import { useAuth } from '~/context/AuthContext'
import { getUserProfile } from '~/lib/lib'
import ChangePasswordForm from './assets/ChangePasswordForm'

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
            <ContentLayout title={'Change Password'}>
                {userProfile === null ? 'Loading...' : ''}

                <div className={`font-semibold mb-2 text-md`}>
                    {userProfile?.email}
                </div>

                {
                    data && <ChangePasswordForm loaderData={data} user={user} />
                }
            </ContentLayout>
        </AccountLayout>
    )
}

export default index
