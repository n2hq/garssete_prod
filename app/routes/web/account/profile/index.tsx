import React, { useEffect, useState } from 'react'
import AccountLayout from '../assets/AccountLayout'
import ContentLayout from '../assets/ContentLayout'
import ImgComponent from './assets/ImgComponent'
import ProfileForm from './assets/ProfileForm'
import { LoaderFunction } from '@remix-run/node'
import { useAuth } from '~/context/AuthContext'
import { getUserProfile } from '~/lib/lib'


const index = () => {
    const { user } = useAuth()
    const [userProfile, setUserProfile] = useState<any | null>(null)

    useEffect(() => {
        async function getUserProfileData(guid: string) {
            const userProfileData = await getUserProfile(guid || "")
            setUserProfile(userProfileData)
        }
        if (user?.guid) {
            getUserProfileData(user?.guid)
        }
    }, [user?.guid])

    useEffect(() => {
        if (userProfile !== null) {
            alert(JSON.stringify(userProfile))
        }
    }, [userProfile])
    return (
        <AccountLayout>
            <ContentLayout title={'Account Profile'}>
                <div className={`font-semibold mb-2 text-md`}>
                    John Doe
                </div>
                <div className={``}>
                    <ImgComponent
                        user={null}
                        userProfileImageData={null}
                    />
                </div>
                <div>

                </div>
            </ContentLayout>
        </AccountLayout>
    )
}

export default index
