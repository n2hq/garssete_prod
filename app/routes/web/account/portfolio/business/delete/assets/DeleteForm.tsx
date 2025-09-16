import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '~/components/content/button/Button'
import Input from '~/components/content/input/Input'
import { useNotification } from '~/context/NotificationContext'
import { config, getBusiness, headers } from '~/lib/lib'
import DeleteSchema from './DeleteSchema'
import { useNavigate } from '@remix-run/react'
import { useOperation } from '~/context/OperationContext'

const DeleteForm = ({
    userGuid,
    businessGuid
}: any) => {
    const [isActive, setIsActive] = useState<boolean | null>(null)
    const [loading, setLoading] = useState(true)
    const notification = useNotification()
    const navigator = useNavigate()
    const [working, setWorking] = useState<boolean>(false)

    const [formdata, setFormdata] = useState<any | null>(null)

    const { showOperation, showError, completeOperation, showSuccess } = useOperation()

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

    const handleDelete = async (data: any) => {
        setWorking(true)
        //notification.notify('Deleting business...')
        showOperation('processing')

        await new Promise((resolve) => setTimeout(resolve, 1000));

        data["user_guid"] = userGuid


        const endpoint = "/api/listing/delete_business/" + businessGuid
        const url = config.BASE_URL + endpoint

        try {

            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (response.status !== 200) {
                const errorData = await response.text();
                const errorObject = JSON.parse(errorData)
                let msg = errorObject.message || errorObject.error
                throw new Error(`${msg}`);

            } else {
                //alert(response.status)
                //notification.cancel()
                try {

                    showSuccess('Success', 'Page Deleted.')
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    completeOperation()

                } finally {
                    navigator("/web/account/portfolio")
                }


            }


        } catch (error: any) {
            console.log(error.message)
            showError('Error', error.message || error.error || 'Delete failed.')
            completeOperation()
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
        defaultValues: ({}),
        resolver: zodResolver(DeleteSchema)
    })

    useEffect(() => {
        try {
            getBusiness(userGuid, businessGuid).then((business) => {
                //alert(JSON.stringify(business))
                setIsActive(business[0].active_status)
                setLoading(false)
            })


        } catch (error: any) {
            alert('Could not fetch business')
        }

    }, [])

    const toggleBusiness = async () => {
        setWorking(true)
        notification.notify()
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newStatus = !isActive
        try {

            const endpoint = `/api/listing/activate/${userGuid}/${businessGuid}`
            const url = config.BASE_URL + endpoint


            const data = {
                user_guid: userGuid,
                business_guid: businessGuid,
                active: newStatus
            }

            const res = await fetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data),
            })


            notification.alertReload('Success', 'Completed!')
            await new Promise((resolve) => setTimeout(resolve, 1000));

        } catch (error: any) {

        } finally {

            setIsActive(newStatus)
        }
        /*  const res = await fetch('/api/business-status', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ userGuid, businessGuid, is_active: newStatus }),
         })
         const data = await res.json()
         if (data.success) {
             setIsActive(newStatus)
         } */

    }

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <form className=' w-full' onSubmit={handleSubmit(handleDelete)}>
                <div className={`p-6  rounded  max-w-2xl
        mx-auto mt-12`}>
                    <h2 className="text-lg mb-4 font-semibold">
                        Delete this Business or Organization
                    </h2>
                    <p className={`mb-4 text-gray-500`}>
                        Once you delete this business, it cannot be undone. Every resource or item entered under this business will be deleted completely and will not be recoverable.
                    </p>
                    <div className={`border-[3px] border-gray-100 pt-5 pl-5 pr-5 rounded-lg shadow`}>
                        <Input
                            controlTitle={"Confirm Delete"}
                            controlPlaceholder={`Type the word "DELETE"`}
                            controlName={"confirm_delete"}
                            register={register}
                            controlType={"text"}
                            changeHandler={changeHandler}
                            error={errors.confirm_delete}
                            controlInformation={`Please enter password to delete this business.`}

                        />

                        <Input
                            controlTitle={"Password"}
                            controlPlaceholder={"Enter password"}
                            controlName={"password"}
                            register={register}
                            controlType={"password"}
                            changeHandler={changeHandler}
                            error={errors.password}
                            controlInformation={`Please enter password to delete this business.`}

                        />
                        <Button
                            value={"Delete Business"}
                            working={false}
                        />

                    </div>
                </div>
            </form>
        </div>
    )
}

export default DeleteForm
