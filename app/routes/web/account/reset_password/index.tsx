import React, { useEffect, useState } from 'react'
import AccountLayout from '../assets/AccountLayout'
import ContentLayout from '../assets/ContentLayout'
import { useAuth } from '~/context/AuthContext'
import { getUserProfile, IsAuthenticated } from '~/lib/lib'
import ResetPasswordForm from './assets/ResetPasswordForm'
import CardTitle from '../assets/CardTitle'
import CardHeader from '../assets/CardHeader'
import ProfileContentLayout from '../assets/ProfileContentLayout'

const index = () => {
    useEffect(() => {
        IsAuthenticated(localStorage)
    }, [])

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

        try {
            if (user?.guid) {
                getAllData(user?.guid)
            }
        } catch (e: any) {
            console.log(e.message)
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
            <ProfileContentLayout title={'Reset Password'}>
                {userProfile === null ? 'Loading...' : ''}





                {
                    data && <ResetPasswordForm loaderData={data} user={user} />
                }
            </ProfileContentLayout>
        </AccountLayout>
    )
}

export default index
