import { useParams } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { getBusinessProfile, getSelectedFacilityFeatures, getSysFacilityFeatures } from '~/lib/lib'
import AccountLayout from '../../../assets/AccountLayout'
import ContentLayout from '../../../assets/ContentLayout'
import BusinessMenu from '../assets/BusinessMenu'
import FacilityFeatures from './assets/FactilityFeatures'

const index = () => {
    const [businessGuid, setBusinessGuid] = useState('')
    const [userGuid, setUserGuid] = useState('')
    const [facilityFeatures, setFacilityFeatures] = useState<any | null>(null)
    const [selectedFacilityFeatures, setSelectedFacilityFeatures] = useState<any | null>(null)
    const [data, setData] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)
    const { business_guid, user_guid } = useParams();
    const [businessProfile, setBusinessProfile] = useState<any | null>(null)

    useEffect(() => {
        const getAllData = async (businessGuid: string, userGuid: string) => {

            setBusinessGuid(businessGuid)
            setUserGuid(userGuid)
            const facilityFeatures = await getSysFacilityFeatures()
            setFacilityFeatures(facilityFeatures)
            const selectedFacilityFeatures = await getSelectedFacilityFeatures(userGuid, businessGuid)
            setSelectedFacilityFeatures(selectedFacilityFeatures)
            const businessProfile = await getBusinessProfile(businessGuid || "")
            setBusinessProfile(businessProfile)
        }
        if (business_guid && user_guid) {
            getAllData(business_guid, user_guid)
        }
    }, [business_guid, user_guid])

    useEffect(() => {


        if (businessGuid && userGuid && facilityFeatures && selectedFacilityFeatures && businessProfile) {

            const data = {
                businessGuid: businessGuid,
                userGuid: userGuid,
                facilityFeatures: facilityFeatures,
                selectedFacilityFeatures: selectedFacilityFeatures,
                businessProfile: businessProfile
            }
            setData(data)
            setLoading(false)
        }
    }, [
        businessGuid,
        userGuid,
        facilityFeatures,
        selectedFacilityFeatures,
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
            <ContentLayout title={'Facility Features'}>
                <div className={`font-semibold mb-2 text-md`}>
                    {data?.businessProfile?.title}
                </div>

                {
                    businessGuid && userGuid &&
                    <BusinessMenu guid={businessGuid} userGuid={userGuid} />
                }

                {
                    data && <FacilityFeatures
                        userGuid={userGuid}
                        businessGuid={businessGuid}
                        facilityFeatures={facilityFeatures}
                        selectedFacilityFeatures={selectedFacilityFeatures}
                    />
                }

            </ContentLayout>
        </AccountLayout>
    )
}

export default index
