import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '~/components/content/button/Button'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import { config, headers } from '~/lib/lib'
import ChangePasswordSchema from './ChangePasswordSchema'
import { formWrapperClass, inputWrapperClass } from '~/lib/css'
import { useNotification } from '~/context/NotificationContext'
import { useOperation } from '~/context/OperationContext'


const ChangePasswordForm = ({ loaderData, user }: any) => {
    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()

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

    const handleEmailChangeRequest: SubmitHandler<any> = async (data: any) => {
        setWorking(true)
        //notification.notify('In progress...')
        showOperation('processing')
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const endpoint = "/api/user/change_password/" + loaderData.userProfile?.user_guid
        const url = config.BASE_URL + endpoint
        data["password"] = data?.newpassword

        delete (data["oldpassword"])
        delete (data["newpassword"])
        delete (data["newpassword2"])

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                let error = response.json().then((data) => {

                    //notification.alertCancel('', data.message)
                    showError('Error', data.message)
                    completeOperation()
                })

            } else {
                //notification.alertReload('Success', 'Password Successfully Changed! Use new password on next login')
                showSuccess('Success', 'Password changed. Use new password on next login.')
                completeOperation()
            }

        } catch (error: any) {
            //notification.alertCancel('', error.message)
            console.log(error.message)
            showError('Error', 'Password change failed.')
            completeOperation()
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
        resolver: zodResolver(ChangePasswordSchema)
    })


    return (
        <form onSubmit={handleSubmit(handleEmailChangeRequest)}>
            <div className={`${formWrapperClass} mt-0  
            rounded-lg pt-4 max-w-[500px] w-full mx-auto`}>
                <div className={inputWrapperClass}>
                    <div className=' text-xl text-gray-700 font-semibold border-b pb-1'>
                        Change Password
                    </div>
                    <div className=' pt-3 pb-4 text-[13px] leading-5'>
                        <b>{loaderData.userProfile?.email}</b> is your current email. It will be used be used for password resets or changes.
                    </div>

                    <div className={`mt-[20px]`}></div>

                    <Input
                        controlTitle={"Current Password"}
                        controlPlaceholder={"Enter current password"}
                        controlType={"password"}
                        controlName={"oldpassword"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.oldpassword}
                    />

                    <Input
                        controlTitle={"New Password"}
                        controlType={"password"}
                        controlPlaceholder={"Enter new password"}
                        controlName={"newpassword"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.newpassword}
                    />

                    <Input
                        controlTitle={"Retype New Password"}
                        controlPlaceholder={"Retype new password"}
                        controlName={"newpassword2"}
                        controlType={"password"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.newpassword2}
                    />

                    <Button working={working} />
                </div>
            </div>
        </form>
    )
}

export default ChangePasswordForm
