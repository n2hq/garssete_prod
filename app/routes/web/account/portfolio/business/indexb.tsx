import React, { useEffect, useState } from 'react'
import AccountLayout from '../../assets/AccountLayout'
import ContentLayout from '../../assets/ContentLayout'
import { useAuth } from '~/context/AuthContext'
import { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getBusinessProfile, getBusinessProfileBgData, getBusinessProfileImageData, getCategories, getCities, getCountries, getStates, getUserProfile, getUserProfileImageData, IsAuthenticated } from '~/lib/lib'
import BusinessProfileForm from './assets/BusinessProfileForm'
import BusinessMenu from './assets/BusinessMenu'
import CardTitle from '../../assets/CardTitle'
import BusinessHeader from './assets/BusinessHeader'


export const loader: LoaderFunction = async ({ request, params }) => {
    const business_guid = params.business_guid

    const data = {
        business_guid
    }
    return data
}
const indexb = () => {
    useEffect(() => {

        IsAuthenticated(localStorage)
    }, [])

    const loaderData: any = useLoaderData()
    const auth = useAuth();
    if (!auth) { return null }

    const businessGuid = loaderData.business_guid
    const userGuid = auth?.user?.guid

    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile] = useState<any | null>(null)
    const [businessProfile, setBusinessProfile] = useState<any | null>(null)
    const [states, setStates] = useState<any | null>(null)
    const [countries, setCountries] = useState<any | null>(null)
    const [cities, setCities] = useState<any | null>(null)
    const [userProfileImageData, setUserProfileImageData] = useState<any | null>(null)
    const [businessProfileImageData, setBusinessProfileImageData] = useState<any | null>(null)
    const [businessProfileBgData, setBusinessProfileBgData] = useState<any | null>(null)
    const [categories, setCategories] = useState<any | null>(null)
    const [data, setData] = useState<any | null>(null)


    useEffect(() => {
        async function getAllData(userGuid: string, businessGuid: string) {
            const userProfile = await getUserProfile(userGuid || "")
            const businessProfile = await getBusinessProfile(businessGuid || "")
            const countries = await getCountries()
            const businessObject: any = businessProfile
            const states = await getStates(businessObject.country_code || "")
            const cities = await getCities(businessObject.country_code || "", businessObject.state_code || "")
            const categories = await getCategories()
            const userProfileImageData = await getUserProfileImageData(userGuid || "")
            const businessProfileImageData = await getBusinessProfileImageData(businessGuid || "")
            const businessProfileBgData = await getBusinessProfileBgData(businessGuid || "")

            setUserProfile(userProfile)
            setBusinessProfile(businessProfile)
            setCountries(countries)
            setStates(states)
            setCities(cities)
            setUserProfileImageData(userProfileImageData)
            setBusinessProfileImageData(businessProfileImageData)
            setCategories(categories)
            setBusinessProfileBgData(businessProfileBgData)

            //console.log(businessProfileBgData)
        }

        try {
            if (userGuid && businessGuid) {
                getAllData(userGuid, businessGuid)
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }, [userGuid, businessGuid])

    useEffect(() => {
        if (userProfile && businessProfile &&
            countries && states && cities &&
            userProfileImageData && categories &&
            businessProfileImageData && businessProfileBgData) {

            const data = {

                userProfile,
                businessProfile,
                countries,
                states,
                cities,
                userProfileImageData,
                businessProfileImageData,
                businessProfileBgData,
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
        businessProfileImageData,
        userProfile,
        businessProfile,
        businessProfileBgData
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
            <ContentLayout
                title={'Update Business'}
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
                    data && <div>

                        {
                            businessGuid && userGuid &&
                            <BusinessMenu guid={businessGuid} userGuid={userGuid} />
                        }

                        <BusinessProfileForm
                            data={data}
                        />
                    </div>
                }
            </ContentLayout>
        </AccountLayout>
    )
}

export default indexb
