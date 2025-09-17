import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '~/components/content/button/Button'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import { config, headers } from '~/lib/lib'
import EmailSchema from './EmailSchema'
import { formWrapperClass, inputWrapperClass } from '~/lib/css'
import { useNotification } from '~/context/NotificationContext'
import { useOperation } from '~/context/OperationContext'

const EmailForm = ({ loaderData, user }: any) => {

    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()
    const [loading, setLoading] = useState(true)
    const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();

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

    const handleEmailChangeRequest: SubmitHandler<any> = async (data: any) => {
        setWorking(true)
        //notification.notify('', 'Updating email...')
        showOperation('processing')

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (data["email"] === loaderData.userProfile?.email) {
            //notification.alertCancel('Email is the same.', 'Enter a different email to continue.')
            showError('Error', 'Email is in use. Enter a new email.')
            completeOperation()
            setWorking(false)
            return false;
        }

        const endpoint = "/api/user/change_email_request"
        const url = config.BASE_URL + endpoint
        data["guid"] = loaderData.userProfile?.user_guid



        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                let error = response.json().then((data) => {
                    //throw new Error('Error', data.message)
                    showError('Error', data.message)
                    completeOperation()
                })

            } else {
                //notification.alertCancel('Email Change Request', 'Email Change Request Successfully Sent!')
                showSuccess('Success', 'Please check your new email to continue.')
                completeOperation()
            }

        } catch (error: any) {
            //console.log(error[0].error)
            //let msg = error?.error || 'Change request failed.'
            showError('Error', 'Change request failed')
            completeOperation()
            //return undefined
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
        defaultValues: (loaderData.listing),
        resolver: zodResolver(EmailSchema)
    })


    { loading ? 'Loading...' : '' }

    return (
        <form onSubmit={handleSubmit(handleEmailChangeRequest)}>
            <div className={`${formWrapperClass} mt-0  rounded-lg pt-4
                             max-w-[500px] w-full mx-auto`}>
                <div className={inputWrapperClass}>
                    <div className=' text-xl text-gray-700 font-semibold border-b pb-1'>
                        Current email
                    </div>
                    <div className=' pt-3 pb-4 text-[13px] leading-5'>
                        <span className=' font-semibold'>[{loaderData.userProfile?.email}]</span> will be used for account-related notifications and can be used for password resets.
                    </div>
                    <div className='border-[1px] rounded-full px-3 py-3 bg-gray-50'>
                        {loaderData.userProfile?.email} &nbsp;
                    </div>

                    <div className={`mt-[20px]`}></div>
                    <Input
                        controlTitle={"Update Email"}
                        controlPlaceholder={"Enter new email address"}
                        controlName={"email"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.email}
                        width={100}
                        controlInformation={`Enter a new email address.`}
                    />

                    <Button working={working} />

                </div>




            </div>
        </form>
    )
}

export default EmailForm
