import React, { useEffect, useState } from 'react'
import AccountLayout from '../assets/AccountLayout'
import ContentLayout from '../assets/ContentLayout'
import ImgComponent from './assets/ImgComponent'
import ProfileForm from './assets/ProfileForm'
import { LoaderFunction } from '@remix-run/node'
import { useAuth } from '~/context/AuthContext'
import { getCategories, getCities, getCountries, getStates, getUserProfile, getUserProfileImageData } from '~/lib/lib'
import CardTitle from '../assets/CardTitle'




const index = () => {

    useEffect(() => {
        const tokens = localStorage.getItem("authTokens")
        if (tokens === null) {
            window.location.href = "/web/signin"
        }
    }, [])

    const auth = useAuth()
    if (!auth) { return null }

    const { user } = auth




    const [userProfile, setUserProfile] = useState<any | null>(null)
    const [states, setStates] = useState<any | null>(null)
    const [countries, setCountries] = useState<any | null>(null)
    const [cities, setCities] = useState<any | null>(null)
    const [userProfileImageData, setUserProfileImageData] = useState<any | null>(null)
    const [categories, setCategories] = useState<any | null>(null)
    const [data, setData] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getAllData(guid: string) {
            const userProfileData = await getUserProfile(guid || "")
            const countries = await getCountries()
            const userObject: any = userProfileData
            const states = await getStates(userObject.country_code || "")
            const cities = await getCities(userObject.country_code || "", userObject.state_code || "")
            const categories = await getCategories()
            const userProfileImageData = await getUserProfileImageData(guid || "")
            setUserProfile(userProfileData)
            setCountries(countries)
            setStates(states)
            setCities(cities)
            setUserProfileImageData(userProfileImageData)
            setCategories(categories)
        }

        if (user?.guid) {
            getAllData(user?.guid)
        }
    }, [user?.guid])

    useEffect(() => {
        if (userProfile && countries && states && cities && userProfileImageData && categories) {
            const data = {
                userProfile,
                countries,
                states,
                cities,
                userProfileImageData,
                categories
            }

            setData(data)
        }
    }, [
        categories,
        countries,
        states,
        cities,
        userProfileImageData,
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
                <div className="text-lg">Garssete</div>
            </div>
        )
    }




    return (
        <AccountLayout>
            <ContentLayout title={'Account Profile'}>
                {
                    userProfile && data && user && !loading ?
                        <div>


                            <CardTitle
                                baseUrl='/web/account/profile'
                                guid={''}>
                                {userProfile?.first_name} {userProfile?.lastname}
                            </CardTitle>

                            <ProfileForm
                                loaderData={data}
                                user={user}
                                userProfileData={data.userProfile}
                            />
                        </div> :
                        <div>
                            Loading...
                        </div>
                }
            </ContentLayout>
        </AccountLayout>
    )
}

export default index
