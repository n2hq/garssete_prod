import React, { useEffect, useState } from 'react'
import AccountLayout from '../assets/AccountLayout'
import ContentLayout from '../assets/ContentLayout'
import ImgComponent from './assets/ImgComponent'
import ProfileForm from './assets/ProfileForm'
import { LoaderFunction } from '@remix-run/node'
import { useAuth } from '~/context/AuthContext'
import { getCategories, getCities, getCountries, getStates, getUserProfile, getUserProfileBgData, getUserProfileImageData, IsAuthenticated } from '~/lib/lib'
import CardTitle from '../assets/CardTitle'
import CardHeader from '../assets/CardHeader'
import Profile from './assets/Profile'
import ProfileLayout from '../assets/ProfileLayout'
import { useLoaderData } from '@remix-run/react'
import LoadingMessage from '~/components/content/LoadingMessage'





const index = () => {



    const auth = useAuth()
    if (!auth) { return null }

    const { user } = auth

    IsAuthenticated(localStorage)


    const [userProfile, setUserProfile] = useState<any | null>(null)
    const [states, setStates] = useState<any | null>(null)
    const [countries, setCountries] = useState<any | null>(null)
    const [cities, setCities] = useState<any | null>(null)
    const [userProfileImageData, setUserProfileImageData] = useState<any | null>(null)
    const [userProfileBgData, setUserProfileBgData] = useState<any | null>(null)
    const [categories, setCategories] = useState<any | null>(null)
    const [data, setData] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getAllData(guid: string) {
            try {
                const userProfileData = await getUserProfile(guid || "")
                const countries = await getCountries()
                const userObject: any = userProfileData
                const states = await getStates(userObject.country_code || "")
                const cities = await getCities(userObject.country_code || "", userObject.state_code || "")
                const categories = await getCategories()
                const userProfileImageData = await getUserProfileImageData(guid || "")
                const userProfileBgData = await getUserProfileBgData(guid || "")
                setUserProfile(userProfileData)
                setCountries(countries)
                setStates(states)
                setCities(cities)
                setUserProfileImageData(userProfileImageData)
                setUserProfileBgData(userProfileBgData)
                setCategories(categories)
            } catch (e: any) {
                console.log(e.message)
            }
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




    {/** wait until page loads */ }
    if (loading) {
        return <LoadingMessage loading={loading} />
    }




    return (
        <ProfileLayout>
            {
                userProfile && data && !loading && user &&
                <Profile
                    loaderData={data}
                    user={user}
                    userProfileData={data.userProfile}
                    userProfileBgData={userProfileBgData}
                />
            }
        </ProfileLayout>
    )
}

export default index
