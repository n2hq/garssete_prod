import React, { useEffect, useState } from 'react'
import AccountLayout from '../../../assets/AccountLayout'
import ContentLayout from '../../../assets/ContentLayout'
import { getBusinessGallery, getBusinessProfile, getGallery, getVideoGallery, IsAuthenticated } from '~/lib/lib'
import { useParams } from '@remix-run/react'
import BusinessMenu from '../assets/BusinessMenu'
import AddPhoto from './videos/AddVideo'
import Gallery from './videos/Gallery'
import { useAuth } from '~/context/AuthContext'
import CardTitle from '../../../assets/CardTitle'
import BusinessHeader from '../assets/BusinessHeader'
import AddVideo from './videos/AddVideo'
import { AddVideoType } from '~/lib/types'
import LoadingMessage from '~/components/content/LoadingMessage'

const index = () => {
    useEffect(() => {
        IsAuthenticated(localStorage)
    }, [])

    const [businessGuid, setBusinessGuid] = useState<string | ''>('')
    const [userGuid, setUserGuid] = useState('')
    const [videoGallery, setVideoGallery] = useState<AddVideoType[] | null>(null)
    const [data, setData] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)
    const { business_guid, user_guid } = useParams();
    const [businessProfile, setBusinessProfile] = useState<any | null>(null)
    const auth = useAuth()
    if (!auth) { return null }

    useEffect(() => {
        const getAllData = async (businessGuid: string, userGuid: string) => {

            setBusinessGuid(businessGuid)
            setUserGuid(userGuid)
            const videoGallery: AddVideoType[] | null = await getVideoGallery(businessGuid, userGuid)
            //console.log(videoGallery)
            setVideoGallery(videoGallery)
            const businessProfile = await getBusinessProfile(businessGuid || "")
            setBusinessProfile(businessProfile)
        }
        try {
            if (business_guid && user_guid) {
                getAllData(business_guid, user_guid)
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }, [business_guid, user_guid])

    useEffect(() => {


        if (businessGuid && userGuid && videoGallery && businessProfile) {

            const data = {
                businessGuid: businessGuid,
                userGuid: userGuid,
                videoGallery: videoGallery,
                businessProfile: businessProfile
            }
            setData(data)
            setLoading(false)
        }
    }, [businessGuid, userGuid, videoGallery, businessProfile])



    if (loading) {
        return <LoadingMessage />
    }

    return (
        <AccountLayout>
            <ContentLayout title={'Videos Settings'}
                businessGuid={businessGuid}
                data={data}
                businessProfile={businessProfile}
            >



                {
                    businessGuid && userGuid &&
                    <AddVideo userGuid={userGuid} businessGuid={businessGuid} />
                }

                {
                    videoGallery !== null &&
                        videoGallery?.length > 0 ?
                        <div className='z-0'>
                            <Gallery
                                videoGallery={videoGallery}
                                userGuid={userGuid}
                                businessGuid={businessGuid}
                                listing={businessProfile}
                            />
                        </div> :
                        (<div className=' mt-2 border-[1px] rounded-lg p-3 mb-6'>
                            Video Gallery is empty.
                        </div>)
                }



            </ContentLayout>
        </AccountLayout>
    )
}

export default index
