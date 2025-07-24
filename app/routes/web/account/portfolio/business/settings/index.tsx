import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getBusinessProfile, getOperatingHours } from '~/lib/lib'
import { BusinessHours } from '~/lib/types'
import SettingsSchema from './assets/SettingsSchema'
import AccountLayout from '../../../assets/AccountLayout'
import ContentLayout from '../../../assets/ContentLayout'
import BusinessWorkingHours from './assets/BusinessWorkingHours'
import BusinessMenu from '../assets/BusinessMenu'
import { useAuth } from '~/context/AuthContext'
import CardTitle from '../../../assets/CardTitle'

const index = () => {
    const [loading, setLoading] = useState(true)
    const [businessGuid, setBusinessGuid] = useState('')
    const [userGuid, setUserGuid] = useState('')
    const [operatingHours, setOperatingHours] = useState<any | []>()
    const [workingHours, setWorkingHours] = useState<BusinessHours[]>([]);
    const options = [
        { value: "no_hours", label: "No Hours Available", more: "Visitors won't see business hours on this Page" },
        { value: "always_open", label: "Always Open", more: "e.g. Parks, beaches, roads" },
        { value: "permanently_closed", label: "Permanently Closed", more: "Permantently closed" },
        { value: "temporarily_closed", label: "Temporarily Closed", more: "Temporarily closed" },
        { value: "selected_hours", label: "Open During Selected Hours", more: "Open during selected hours" },
    ];
    const [data, setData] = useState<any | null>(null)
    const [businessProfile, setBusinessProfile] = useState<any | null>(null)

    const { business_guid, user_guid } = useParams();

    const auth = useAuth()

    useEffect(() => {
        const getAllData = async (businessGuid: string, userGuid: string) => {
            setBusinessGuid(businessGuid)
            setUserGuid(userGuid)
            const operatingHours = await getOperatingHours(businessGuid, userGuid)
            setOperatingHours(operatingHours)
            const businessProfile = await getBusinessProfile(businessGuid || "")
            setBusinessProfile(businessProfile)
        }

        if (business_guid && user_guid) {
            getAllData(business_guid, user_guid)
        }


    }, [business_guid, user_guid])

    useEffect(() => {


        if (businessGuid && userGuid && operatingHours && businessProfile) {
            const data = {
                businessGuid: businessGuid,
                userGuid: userGuid,
                operatingHours: operatingHours,
                businessProfile: businessProfile
            }
            setData(data)
            setLoading(false)
        }
    }, [businessGuid, userGuid, operatingHours, businessProfile])

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<any>({
        defaultValues: ({}),
        resolver: zodResolver(SettingsSchema)
    })



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        )
    }


    return (
        <AccountLayout>
            <ContentLayout title={'Settings'}>
                <CardTitle
                    baseUrl='/web/account/portfolio/'
                    guid={businessGuid}
                >
                    {data?.businessProfile?.title}
                </CardTitle>
                {
                    businessGuid && userGuid &&
                    <BusinessMenu guid={businessGuid} userGuid={userGuid} />
                }
                {
                    data &&
                    <div className={`mt-6`}>
                        <BusinessWorkingHours
                            data={data}
                            onChange={setWorkingHours}
                            options={options}
                        />
                    </div>
                }
            </ContentLayout>

        </AccountLayout>
    )
}

export default index
