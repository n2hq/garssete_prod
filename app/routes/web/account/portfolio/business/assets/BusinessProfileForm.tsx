import React, { useEffect, useState } from 'react'
import { config, getCities, getStates, headers } from '~/lib/lib'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import BusinessProfileSchema from './BusinessProfileSchema'
import ImgComponent from './image/ImgComponent'
import { formWrapperClass, inputHeadingClass, inputWrapperClass } from '~/lib/css'
import Input from '~/components/content/input/Input'
import TextareaWithWordLimit from '~/components/content/textarea/TextareaWithWordLimit'
import Select from '~/components/content/select/Select'
import Button from '~/components/content/button/Button'
import { useNotification } from '~/context/NotificationContext'
import { leftNavLinks } from '~/lib/json'

const BusinessProfileForm = ({ data }: any) => {
    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()

    const countries = data.countries
    let [states, setStates] = useState(data.states)
    let [cities, setCities] = useState(data.cities)
    //const categories = data.categories.data
    const categories = leftNavLinks?.sort((a, b) =>
        a.name.localeCompare(b.name)
    )

    const [countryCode, setCountryCode] = useState(data.businessProfile.country_code)
    const [stateCode, setStateCode] = useState(data.businessProfile.state_code)

    const [newCountryCode, setNewCountryCode] = useState('')
    const [newStateCode, setNewStateCode] = useState('')

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

    const handleAddBusiness: SubmitHandler<any> = async (datar: any) => {
        setWorking(true)
        notification.notify('Updating business profile...')
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const endpoint = "/api/listing/" + data.businessProfile.gid
        const url = config.BASE_URL + endpoint

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(datar)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                notification.alertReload('Success!', 'Successfully updated!')
            }

        } catch (error: any) {
            notification.alertCancel('Error!', error.message)
        } finally {
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
        defaultValues: (data.businessProfile),
        resolver: zodResolver(BusinessProfileSchema)
    })


    useEffect(() => {
        if (data.businessProfile) {
            setValue("state_code", data.businessProfile.state_code)
            setValue("city_id", data.businessProfile.city_id)
        }
    }, [data.businessProfile])

    useEffect(() => {
        if (newCountryCode) {
            setValue("state_code", "")
            setValue("city_id", "")
        }

    }, [newCountryCode, data])

    useEffect(() => {
        if (newStateCode) {
            setValue("city_id", "")
        }
    }, [newStateCode])




    return (
        <div>
            <div className={formWrapperClass}>
                <div className={`${inputWrapperClass} flex flex-col place-items-center`}>
                    <div className={inputHeadingClass}>
                        Add/Change Photo
                    </div>
                    <div className='mt-4'>

                        <ImgComponent
                            listing={data.businessProfile}
                            user={data.userProfile}
                            businessProfileImageData={data.businessProfileImageData}
                        />
                    </div>
                </div>

                <hr className={`w-full`} />
                <form className=' w-full' onSubmit={handleSubmit(handleAddBusiness)}>

                    <div className={`${formWrapperClass} mt-0  rounded-lg pt-4
                                lg:max-w-[500px] w-full mx-auto  `}>

                        <Input
                            controlTitle={"Username"}
                            controlPlaceholder={"Enter username"}
                            controlName={"username"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.username}
                            controlInformation={`Choose a username. `}

                        />

                        <Input
                            controlTitle={"Email Address"}
                            controlPlaceholder={"Enter email address"}
                            controlName={"email_address"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.email_address}
                            controlInformation={`Email address is compulsory.`}
                        />

                        <Input
                            controlTitle={"Business name"}
                            controlPlaceholder={"Enter business name"}
                            controlName={"title"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.title}
                            controlInformation={`Please enter page name. Page name is compulsory. `}

                        />

                        <Input
                            controlTitle={"Year established"}
                            controlPlaceholder={"Enter year established"}
                            controlName={"established"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.established}
                            controlInformation={`This is the name the business was registered or started `}

                        />

                        <Select
                            controlTitle={"Country"}
                            controlName={"country_code"}
                            controlPlaceholder={"Select country"}
                            selectJson={countries}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.country_code}
                            setCode={resetStates}
                            controlInformation={`This is the country the business was registered. `}

                        />

                        <Select
                            controlTitle={"State"}
                            controlName={"state_code"}
                            controlPlaceholder={"Select state"}
                            selectJson={states}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.state_code}
                            setCode={resetCities}
                            controlInformation={`This is the state the business was registered. `}
                        />

                        <Select
                            controlTitle={"City"}
                            controlName={"city_id"}
                            controlPlaceholder={"Select city"}
                            selectJson={cities}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.city_id}
                            controlInformation={`This is the city the business was registered. `}
                        />

                        <Input
                            controlTitle={"Address 1"}
                            controlPlaceholder={"Enter address"}
                            controlName={"address_one"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.address_one}
                            width={100}
                            controlInformation={`Contact address for the business. `}
                        />

                        <Input
                            controlTitle={"Address 2"}
                            controlPlaceholder={"Enter address"}
                            controlName={"address_two"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.address_two}
                            width={100}
                            controlInformation={`E.g. Off North Central Boulevard or North Central Road. `}
                        />

                        <Input
                            controlTitle={"Zipcode"}
                            controlPlaceholder={"Enter zipcode"}
                            controlName={"zipcode"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.zipcode}
                            controlInformation={`Enter the zipcode. `}
                        />

                        <Input
                            controlTitle={"Phone number"}
                            controlPlaceholder={"Enter phone number"}
                            controlName={"phone"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.phone}
                            controlInformation={`Mobile number or phoone number. `}
                        />



                        <Select
                            controlTitle={"Category"}
                            controlName={"category"}
                            controlPlaceholder={"Select category"}
                            selectJson={categories}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.category}
                        />

                        <Input
                            controlTitle={"Business Phrases"}
                            controlPlaceholder={"E.g. Advocates, Software Developers, Architect"}
                            controlName={"business_phrases"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.business_phrases}
                        />

                        <Input
                            controlTitle={"Products"}
                            controlPlaceholder={"Enter products"}
                            controlName={"products"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.products}
                        />

                        <Input
                            controlTitle={"Services"}
                            controlPlaceholder={"Enter services"}
                            controlName={"services"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.services}
                        />

                        <TextareaWithWordLimit
                            controlTitle={"Short Description"}
                            controlPlaceholder={"Short description"}
                            controlName={"short_description"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.short_description}
                            setValue={setValue}
                            getValues={getValues}
                            watch={watch}
                        />

                        <TextareaWithWordLimit
                            controlTitle={"Long Description"}
                            controlPlaceholder={"Long description"}
                            controlName={"long_description"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.long_description}
                            setValue={setValue}
                            getValues={getValues}
                            watch={watch}
                        />

                        {/* <Input
                            controlTitle={"Twitter"}
                            controlPlaceholder={"@handle"}
                            controlName={"xsocial"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.address}
                        />

                        <Input
                            controlTitle={"Facebook"}
                            controlPlaceholder={"@handle"}
                            controlName={"fbsocial"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.fbsocial}
                        />

                        <Input
                            controlTitle={"LinkedIn"}
                            controlPlaceholder={"https://linkedin.com/company/username"}
                            controlName={"linksocial"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.linksocial}
                        />
 */}
                        <Input
                            controlTitle={"Website"}
                            controlPlaceholder={"Enter website"}
                            controlName={"website"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.website}
                        />

                        <Button working={working} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BusinessProfileForm
