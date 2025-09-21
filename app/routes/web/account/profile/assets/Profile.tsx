import React, { useEffect, useState } from 'react'
import ProfileForm from './ProfileForm'
import ImgComponentAlt from './ImgComponentAlt'
import ImgComponent from './ImgComponent'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import ProfileSchema from './ProfileSchema'
import { getCities, getStates, headers } from '~/lib/lib'
import { useNotification } from '~/context/NotificationContext'
import Button from '~/components/content/button/Button'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import { formWrapperClass } from '~/lib/css'
import ProfileBg from './ProfileBg'
import { useOperation } from '~/context/OperationContext'

const Profile = ({ loaderData, user, userProfileData, userProfileBgData }: any) => {
    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState<boolean>(false)

    const notification = useNotification()

    const countries = loaderData.countries
    let [states, setStates] = useState(loaderData.states)
    let [cities, setCities] = useState(loaderData.cities)
    const categories = loaderData.categories

    const [countryCode, setCountryCode] = useState(loaderData.userProfileData?.country_code)
    const [stateCode, setStateCode] = useState(loaderData.userProfileData?.state_code)

    const [newCountryCode, setNewCountryCode] = useState('')
    const [newStateCode, setNewStateCode] = useState('')

    const { showOperation, showError, completeOperation, showSuccess } = useOperation()


    const resetStates = async (countryCode: string) => {
        setCountryCode(countryCode)
        setNewCountryCode(countryCode)
        const states = await getStates(countryCode)
        setStates(states)
        resetCities('')
    }

    const resetCities = async (stateCode: string) => {
        setStateCode(stateCode)
        setNewStateCode(stateCode)
        const cities = await getCities(countryCode, stateCode)
        setCities(cities)
    }

    const changeHandler = (e: any) => {
        let value = e.target.value
        let name = e.target.name
        setFormdata((previousValue: any) => {
            return (
                {
                    ...previousValue, [name]: value
                }
            )
        })
    }

    const handleUpdateUser: SubmitHandler<any> = async (data: any) => {
        setWorking(true)
        //notification.notify('Updating user profile...')
        showOperation('processing')
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = "/api/user/" + user.guid
        const url = BASE_URL + endpoint

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                var respObj = await response.json()
                throw new Error(`Error Code: ${response.status} - ${respObj.error}`)
            } else {
                //notification.alertReload('Success', 'Update is Successful!')
                showSuccess('Success', 'Updated.')
                completeOperation()
            }
        }
        catch (error: any) {
            //notification.alertCancel('Error', error.message)
            showError('Error', error?.message || error?.error || 'Update failed.')
            completeOperation()
            return undefined
        }
        finally {
            setWorking(false)
        }

    }

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<any>({
        defaultValues: (userProfileData),
        resolver: zodResolver(ProfileSchema)
    })

    useEffect(() => {
        if (newCountryCode) {
            setValue("state_code", "")
            setValue("city_id", "")
        }
    }, [newCountryCode])

    useEffect(() => {
        if (newStateCode) {
            setValue("city_id", "")
        }
    }, [newStateCode])




    return (
        <div>
            <ProfileBg
                user={userProfileData}
                userProfileBgData={userProfileBgData}
            />


            <div className={`px-[15px]  relative w-full flex place-content-center h-[180px]`}>


                <div className={`absolute top-[-50px]`}>
                    <div className={`flex place-items-center place-content-center flex-col`}>
                        <ImgComponentAlt
                            user={userProfileData}
                            userProfileImageData={loaderData.userProfileImageData}
                        />
                    </div>
                </div>
            </div>

            <div className={`px-[15px]`}>
                <hr />
                <form onSubmit={handleSubmit(handleUpdateUser)}>

                    <div className={`${formWrapperClass} mt-0  rounded-lg pt-4
                 md:max-w-[600px] w-full mx-auto `}>

                        <div className={`text-xl font-[600] leading-[1.4em] px-[10px] text-black mb-[32px]`}>
                            {userProfileData?.first_name} {userProfileData?.lastname}
                        </div>

                        <Input
                            controlTitle={"First Name"}
                            controlName={"first_name"}
                            controlPlaceholder={"Enter first name"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.first_name}
                            controlInformation={`Please enter your first name. First name is compulsory. `}
                        />

                        <Input
                            controlTitle={"Last Name"}
                            controlName={"lastname"}
                            controlPlaceholder={"Enter last name"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.lastname}
                            controlInformation={`Please enter your last name. Last name is compulsory. `}
                        />

                        <Select
                            controlTitle={"Country"}
                            controlName={"country_code"}
                            controlPlaceholder={"Select Country"}
                            selectJson={countries}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.country_code}
                            setCode={resetStates}
                            controlInformation={`Please select country. `}
                        />

                        <Select
                            controlTitle={"State"}
                            controlName={"state_code"}
                            controlPlaceholder={"Select State"}
                            selectJson={states}
                            register={register}
                            changeHandler={changeHandler}
                            setCode={resetCities}
                            controlInformation={`Please select state. `}
                        />

                        <Select
                            controlTitle={"City"}
                            controlName={"city_id"}
                            controlPlaceholder={"Select City"}
                            selectJson={cities}
                            register={register}
                            changeHandler={changeHandler}
                            controlInformation={`Please select a city. `}
                        />

                        <Input
                            controlTitle={"Zipcode"}
                            controlName={"zipcode"}
                            controlPlaceholder={"Enter zip code"}
                            register={register}
                            changeHandler={changeHandler}
                            controlInformation={`Please a zipcode. `}
                        />


                        <Input
                            controlTitle={"Phone"}
                            controlName={"phone"}
                            controlPlaceholder={"Enter phone number"}
                            register={register}
                            changeHandler={changeHandler}
                            controlInformation={`Please enter a phone or mobile. `}
                        />


                        <Input
                            controlTitle={"Address Line 1"}
                            controlName={"address_one"}
                            controlPlaceholder={"Enter address"}
                            register={register}
                            changeHandler={changeHandler}
                            controlInformation={`Please enter an address. `}
                        />

                        <Input
                            controlTitle={"Address Line 2"}
                            controlName={"address_two"}
                            controlPlaceholder={"Enter address"}
                            register={register}
                            changeHandler={changeHandler}
                            controlInformation={`E.g. Off Brian's Boulevard or Avenue. `}
                        />

                        <Button working={working} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile
