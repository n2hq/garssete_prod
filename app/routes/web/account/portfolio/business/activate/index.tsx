
import { useEffect, useState } from 'react'
import Activate from './Activate'
import { useParams } from '@remix-run/react'
import { getBusinessProfile, IsAuthenticated } from '~/lib/lib'
import AccountLayout from '../../../assets/AccountLayout'
import ContentLayout from '../../../assets/ContentLayout'
import BusinessMenu from '../assets/BusinessMenu'
import { useAuth } from '~/context/AuthContext'
import CardTitle from '../../../assets/CardTitle'
import BusinessHeader from '../assets/BusinessHeader'


const index = () => {
    useEffect(() => {
        IsAuthenticated(localStorage)
    }, [])

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any | null>(null)
    const [businessGuid, setBusinessGuid] = useState('')
    const [userGuid, setUserGuid] = useState('')
    const { business_guid, user_guid } = useParams();
    const [businessProfile, setBusinessProfile] = useState<any | null>(null)
    const auth = useAuth()
    if (!auth) { return null }

    useEffect(() => {
        const getAllData = async (businessGuid: string, userGuid: string) => {

            setBusinessGuid(businessGuid)
            setUserGuid(userGuid)
            const businessProfile = await getBusinessProfile(businessGuid || "")
            setBusinessProfile(businessProfile)
        }
        if (business_guid && user_guid) {

            getAllData(business_guid, user_guid)
        }
    }, [business_guid, user_guid])

    useEffect(() => {


        if (businessGuid && userGuid && businessProfile) {

            const data = {
                businessGuid: businessGuid,
                userGuid: userGuid,
                businessProfile: businessProfile
            }
            setData(data)
            setLoading(false)
        }
    }, [
        businessGuid,
        userGuid,
        businessProfile
    ])



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        )
    }

    return (
        <AccountLayout>
            <ContentLayout title={`${Boolean(businessProfile.active_status) ? 'Deactivate' : 'Activate'} Business Profile`}
                businessGuid={businessGuid}
                data={data}
                businessProfile={businessProfile}
            >
                <BusinessHeader
                    businessGuid={businessGuid}
                    data={data}
                    businessProfile={businessProfile}
                />
                {
                    businessGuid && userGuid &&
                    <BusinessMenu guid={businessGuid} userGuid={userGuid} />
                }
                {
                    data && <Activate
                        userGuid={userGuid}
                        businessGuid={businessGuid}
                    />
                }
            </ContentLayout>
        </AccountLayout>
    )
}

export default index
