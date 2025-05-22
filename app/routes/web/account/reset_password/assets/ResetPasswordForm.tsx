import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '~/components/content/button/Button'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import { config, headers } from '~/lib/lib'
import ResetPasswordSchema from './ResetPasswordSchema'
import { formWrapperClass, inputWrapperClass } from '~/lib/css'
import { useNotification } from '~/context/NotificationContext'



const ResetPasswordForm = ({ loaderData, user }: any) => {
    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()

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

    const handleSendResetEmail: SubmitHandler<any> = async (data: any) => {

        setWorking(true)
        notification.notify('Sending reset password request.')
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const endpoint = "/api/user/reset_password_request"
        const url = config.BASE_URL + endpoint
        data["owner"] = loaderData.userProfile.user_guid

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                let error = response.json().then((data) => {
                    notification.alertCancel('Error handling request', data.message)

                })

            } else {
                notification.alertReload('Success!', 'Request Initiated. Please check your email to continue.')
            }

        } catch (error: any) {
            notification.alertCancel('Error handling request', error.message)
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
        defaultValues: (loaderData.userProfile),
        resolver: zodResolver(ResetPasswordSchema)
    })


    return (
        <form onSubmit={handleSubmit(handleSendResetEmail)}>
            <div className={`${formWrapperClass} mt-0  
                        rounded-lg pt-4 max-w-[500px] w-full mx-auto`}>
                <div className={inputWrapperClass}>
                    <div className=' text-xl text-gray-700 font-semibold border-b pb-1'>
                        Reset Password
                    </div>
                    <div className=' pt-3 pb-4 text-[13px] leading-5'>
                        <b>{loaderData.userProfile?.email}</b> is your current email. It will be used be used for password resets or changes.
                    </div>

                    <div className={`mt-[20px]`}></div>
                    <Input
                        controlTitle={"Your Email Address"}
                        controlPlaceholder={"Retype new password"}
                        controlName={"email"}
                        controlType={"text"}
                        disabled={true}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.email}
                    />

                    <Button working={working} value={"Send Reset Email"} />
                </div>
            </div>
        </form>
    )
}

export default ResetPasswordForm
