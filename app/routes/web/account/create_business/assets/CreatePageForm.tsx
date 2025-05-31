import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { config, getCities, getStates, headers } from '~/lib/lib'
import AddBusinessSchema from './CreatePageSchema.js'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import Button from '~/components/content/button/Button'
import Textarea from '~/components/content/textarea/Textarea'
import { formWrapperClass } from '~/lib/css.js'
import TextareaWithWordLimit from '~/components/content/textarea/TextareaWithWordLimit.js'
import CreatePageSchema from './CreatePageSchema.js'
import { useNotification } from '~/context/NotificationContext.js'
import { useNavigate, useNavigation } from '@remix-run/react'

const CreatePageForm = ({ data, user }: any) => {
    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()
    const navigator = useNavigate()

    const countries = data.countries
    let [states, setStates] = useState(data.states)
    let [cities, setCities] = useState(data.cities)
    const categories = data.categories.data

    const [countryCode, setCountryCode] = useState('')
    const [stateCode, setStateCode] = useState('')

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

    const handleAddBusiness = async (datar: any) => {
        setWorking(true)
        notification.notify('Creating page...')
        await new Promise((resolve) => setTimeout(resolve, 1000));
        datar["owner"] = user.guid
        //alert(JSON.stringify(datar))
        //return false

        const endpoint = "/api/listing"
        const url = config.BASE_URL + endpoint

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(datar)
            })



            if (!response.ok) {
                var respObj = await response.json()
                throw new Error(`Error Code: ${response.status} - ${respObj.message}`)
            } else {
                //alert('Successfully added!')
                const handleOption = async (value: boolean) => {
                    if (value) {
                        notification.cancel()
                    } else {
                        window.location.href = ("/web/account/portfolio")
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                        notification.cancel()

                    }
                }

                if (notification.confirm('Page Created. Do you wish to create another page?', handleOption)) {

                }

            }
        } catch (e: any) {

            notification.alertCancel('Error!', e.message)
        } finally {
            setWorking(false)
        }
    }

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setValue,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<any>({
        resolver: zodResolver(CreatePageSchema)
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
        <form onSubmit={handleSubmit(handleAddBusiness)}>
            <div className={`${formWrapperClass} mt-0  rounded-lg pt-4
                             max-w-[500px] w-full mx-auto `}>
                <Input
                    controlTitle={"Business Name"}
                    controlPlaceholder={"Enter business name"}
                    controlName={"title"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.title}
                    width={80}
                    controlInformation={`Business name is compulsory.`}
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

                <Select
                    controlTitle={"Business Category"}
                    controlName={"category"}
                    controlPlaceholder={"Select business category"}
                    selectJson={categories}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.category}
                    controlInformation={`Select business category.`}
                />

                <Input
                    controlTitle={"Year established"}
                    controlPlaceholder={"Enter year established"}
                    controlName={"established"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.established}
                    controlInformation={`Year registered is compulsory.`}
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
                />

                <Select
                    controlTitle={"City"}
                    controlName={"city_id"}
                    controlPlaceholder={"Select city"}
                    selectJson={cities}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.city_id}

                />

                <Input
                    controlTitle={"Address 1"}
                    controlPlaceholder={"Enter address"}
                    controlName={"address_one"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.address_one}
                    width={100}
                />

                <Input
                    controlTitle={"Address 2"}
                    controlPlaceholder={"Enter address"}
                    controlName={"address_two"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.address_two}
                    width={100}
                />

                <Input
                    controlTitle={"Zipcode"}
                    controlPlaceholder={"Enter zipcode"}
                    controlName={"zipcode"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.zipcode}
                />

                <Input
                    controlTitle={"Phone number"}
                    controlPlaceholder={"Enter phone number"}
                    controlName={"phone"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.phone}
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

                <Button working={working} />
            </div>
        </form>
    )
}

export default CreatePageForm
