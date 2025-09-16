import React, { useEffect, useState } from 'react'
import { config, getCities, getStates, headers } from '~/lib/lib'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import BusinessProfileSchema from './BusinessProfileSchema'
import ImgComponent from './image/ImgComponent'
import { controlInformationClass, formWrapperClass, inputHeadingClass, inputWrapperClass } from '~/lib/css'
import Input from '~/components/content/input/Input'
import TextareaWithWordLimit from '~/components/content/textarea/TextareaWithWordLimit'
import Select from '~/components/content/select/Select'
import Button from '~/components/content/button/Button'
import { useNotification } from '~/context/NotificationContext'
import { leftNavLinks } from '~/lib/json'
import { categories as category } from '~/lib/json/categories'
import BgComponent from './image/BgComponent'
import { useOperation } from '~/context/OperationContext'

const BusinessProfileForm = ({ data }: any) => {

    const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();

    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()
    const [errorMsg, setErrorMsg] = useState<any>(null)

    const countries = data.countries
    let [states, setStates] = useState(data.states)
    let [cities, setCities] = useState(data.cities)
    //const categories = data.categories.data
    const categories = category?.sort((a, b) =>
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

    const handleUpdateBusiness: SubmitHandler<any> = async (datar: any) => {
        setWorking(true)
        //notification.notify('Updating business profile...')
        showOperation('processing', 'Updating business profile')
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
                const errorData = await response.text();
                const errorObject = JSON.parse(errorData)
                throw new Error(`${errorObject.error}`);

            } else {
                //notification.alertReload('Success!', 'Successfully updated!')
                showSuccess('success', 'Profile updated.')
                completeOperation()
            }

        } catch (error: any) {
            notification.alertCancel('Unsuccessful', error.message)
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
            <div className={`formWrapperClass mt-[15px]`}>
                <div className={`${inputWrapperClass} flex flex-col place-items-center`}>

                    <div className={`z-[50] w-full  h-[150px]`}>
                        <BgComponent
                            listing={data.businessProfile}
                            user={data.userProfile}
                            businessProfileBgData={data.businessProfileBgData}
                        />
                    </div>
                    <div className={`-mt-10 z-[100]`}>

                        <ImgComponent
                            listing={data.businessProfile}
                            user={data.userProfile}
                            businessProfileImageData={data.businessProfileImageData}
                        />
                    </div>
                </div>

                <hr className={`w-full`} />
                <form className=' w-full' onSubmit={handleSubmit(handleUpdateBusiness)}>

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

                        <Select
                            controlTitle={"Country"}
                            controlName={"country_code"}
                            controlPlaceholder={"Select country"}
                            selectJson={countries}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.country_code}
                            setCode={resetStates}
                            controlInformation={`Country the business was registered. `}

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
                            controlInformation={`State the business was registered. `}
                        />

                        <Select
                            controlTitle={"City"}
                            controlName={"city_id"}
                            controlPlaceholder={"Select city"}
                            selectJson={cities}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.city_id}
                            controlInformation={`City the business was registered. `}
                        />



                        <Input
                            controlTitle={"Zipcode"}
                            controlPlaceholder={"Enter zipcode"}
                            controlName={"zipcode"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.zipcode}
                            controlInformation={`Enter the zipcode. E.g.: 51234 or 845219 `}
                        />

                        <Input
                            controlTitle={"Phone number"}
                            controlPlaceholder={"Enter phone number"}
                            controlName={"phone"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.phone}
                            controlInformation={`Mobile number or phone number. `}
                        />



                        <Select
                            controlTitle={"Category"}
                            controlName={"category"}
                            controlPlaceholder={"Select category"}
                            selectJson={categories}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.category}
                            controlInformation={`Select business category.`}
                        />

                        <Input
                            controlTitle={"Business Phrases"}
                            controlPlaceholder={"E.g. Advocates, Software Developers, Architect"}
                            controlName={"business_phrases"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.business_phrases}
                            controlInformation={`Enter business phrases like: Solicitor, Advocate, Plumber, Business Analyst, Mechanical Engineers.`}
                        />

                        <Input
                            controlTitle={"Products"}
                            controlPlaceholder={"E.g.: Publications, Accessories, Shoes, Subscriptions, Magazines, Cars"}
                            controlName={"products"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.products}
                            controlInformation={`Enter your products name like: Magazines, Generators, Accessories, Perfumes, Publications etc.`}
                        />

                        <Input
                            controlTitle={"Services"}
                            controlPlaceholder={"E.g.: Consulting Services, Project Management, Outsourcing or BPO, Training and Development. etc."}
                            controlName={"services"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.services}
                            controlInformation={`Enter your services E.g.: Consulting Services, Project Management, Outsourcing or BPO, Training and Development. etc.`}
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
                            controlInformationClass={controlInformationClass}
                            controlInformation={`Short description of business activities`}
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
                            controlInformationClass={controlInformationClass}
                            controlInformation={`More description about the business.`}
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
                            controlInformation={`Your website should look like this: http://example.com `}
                        />

                        <Button working={working} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BusinessProfileForm
