import React, { useEffect, useState } from 'react'
import AccountLayout from '../assets/AccountLayout'
import ContentLayout from '../assets/ContentLayout'
import { useAuth } from '~/context/AuthContext'
import { getPortfolio, getUserProfile } from '~/lib/lib'
import Portfolio from './assets/Portfolio'


const index = () => {
    const { user } = useAuth()
    const [userProfile, setUserProfile] = useState<any | null>(null)
    const [portfolio, setPortfolio] = useState<any | null>(null)
    const [data, setData] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getAllData(guid: string) {
            const userProfile: any = await getUserProfile(guid || "")
            const portfolio: any = await getPortfolio(guid || "")
            setUserProfile(userProfile)
            setPortfolio(portfolio)
        }

        if (user?.guid) {
            getAllData(user?.guid)
        }
    }, [user?.guid])

    useEffect(() => {
        if (userProfile && portfolio) {
            const data = {
                userProfile: userProfile,
                portfolio: portfolio.data
            }
            setData(data)
            //alert(JSON.stringify(data.portfolio.data))
        }
    }, [
        userProfile,
        portfolio
    ])

    useEffect(() => {
        if (data !== null) {
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

                <div className={`font-semibold mb-2 text-md`}>
                    {userProfile?.email}
                </div>

                <div className={`mt-[20px]`}></div>
                {
                    data !== null &&
                    <Portfolio user={data.userProfile} portfolio={data.portfolio} />
                }
                {/*  {
                    data && <EmailForm loaderData={data} user={user} />
                } */}
            </ContentLayout>
        </AccountLayout>
    )
}

export default index
