import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '~/components/content/button/Button'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import { config, headers, toSentenceCase } from '~/lib/lib'
import ResetPasswordSchema from './ResetPasswordSchema'
import { formWrapperClass, inputWrapperClass } from '~/lib/css'
import { useNotification } from '~/context/NotificationContext'
import { useAuth } from '~/context/AuthContext'
import { useOperation } from '~/context/OperationContext'



const ResetPasswordForm = ({ loaderData, user }: any) => {
    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()
    const auth = useAuth()
    if (!auth) { return null }

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

    const handleSendResetEmail: SubmitHandler<any> = async (data: any) => {

        setWorking(true)
        //notification.notify('Sending reset password request.')
        showOperation('processing', 'Sending reset password email')
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const email = auth?.user?.email.trim()

        const datr = {
            email: email,

        }


        try {
            const res = await auth.resetpw(datr)

            if (JSON.stringify(res).includes('Error')) {
                setWorking(false)
                showError('Error', toSentenceCase(res))
                completeOperation()
                //notification.alertCancel('', toSentenceCase(res))
            } else {
                //notification.alertCancel('', toSentenceCase(res))
                showSuccess('Success', toSentenceCase(res))
                completeOperation()
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setWorking(false)
                //setRecoverySent(true)
            }
        } catch (error: any) {
            showError('Error', 'Password reset failed. Wait for a minute and retry.')
            completeOperation()
        }

        /* const endpoint = "/api/user/reset_password_request"
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
        } */
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
