import { useParams } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { getBusinessProfile, getSelectedFacilityFeatures, getSelectedSocialMedia, getSysFacilityFeatures, getSysSocialMedia, IsAuthenticated, logError } from '~/lib/lib'
import AccountLayout from '../../../assets/AccountLayout'
import ContentLayout from '../../../assets/ContentLayout'
import BusinessMenu from '../assets/BusinessMenu'
import SocialMedia from './assets/SocialMedia'
import CardTitle from '../../../assets/CardTitle'
import BusinessHeader from '../assets/BusinessHeader'
import LoadingMessage from '~/components/content/LoadingMessage'

const index = () => {
    useEffect(() => {
        IsAuthenticated(localStorage)
    }, [])

    const [businessGuid, setBusinessGuid] = useState('')
    const [userGuid, setUserGuid] = useState('')
    const [socialMedia, setSocialMedia] = useState<any | null>(null)
    const [selectedSocialMedia, setSelectedSocialMedia] = useState<any | null>(null)
    const [data, setData] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)
    const { business_guid, user_guid } = useParams();
    const [businessProfile, setBusinessProfile] = useState<any | null>(null)

    useEffect(() => {
        const getAllData = async (businessGuid: string, userGuid: string) => {

            setBusinessGuid(businessGuid)
            setUserGuid(userGuid)
            const socialMedia = await getSysSocialMedia()
            setSocialMedia(socialMedia)
            const selectedSocialMedia = await getSelectedSocialMedia(userGuid, businessGuid)
            setSelectedSocialMedia(selectedSocialMedia)
            const businessProfile = await getBusinessProfile(businessGuid || "")
            setBusinessProfile(businessProfile)
        }
        try {
            if (business_guid && user_guid) {
                getAllData(business_guid, user_guid)
            }
        } catch (e: any) {
            logError(e)
        }
    }, [business_guid, user_guid])

    useEffect(() => {


        if (businessGuid && userGuid && socialMedia && selectedSocialMedia && businessProfile) {

            const data = {
                businessGuid: businessGuid,
                userGuid: userGuid,
                facilityFeatures: socialMedia,
                selectedFacilityFeatures: selectedSocialMedia,
                businessProfile: businessProfile
            }
            setData(data)
            setLoading(false)
        }
    }, [
        businessGuid,
        userGuid,
        socialMedia,
        selectedSocialMedia,
        businessProfile
    ])

    if (loading) {
        return <LoadingMessage />
    }

    return (
        <AccountLayout>
            <ContentLayout title={'Social Media'}
                businessGuid={businessGuid}
                data={data}
                businessProfile={businessProfile}
            >



                {
                    data && <SocialMedia
                        userGuid={userGuid}
                        businessGuid={businessGuid}
                        allSocialMedia={socialMedia}
                        allSelectedSocialMedia={selectedSocialMedia}
                    />
                }

            </ContentLayout>
        </AccountLayout>
    )
}

export default index
