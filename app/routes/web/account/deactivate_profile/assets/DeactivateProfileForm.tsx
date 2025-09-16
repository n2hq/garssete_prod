import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '~/components/content/button/Button'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import { config, headers } from '~/lib/lib'
import ResetPasswordSchema from './DeactivateProfileSchema'
import DeactivateUserSchema from './DeactivateProfileSchema'
import { formWrapperClass, inputWrapperClass } from '~/lib/css'
import { useNotification } from '~/context/NotificationContext'
import { useOperation } from '~/context/OperationContext'



const DeactivateProfileForm = ({ loaderData, user }: any) => {
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

    const handleDeactivateUser: SubmitHandler<any> = async (data: any) => {
        setWorking(true)
        let msg = ''
        if (loaderData.userProfile.active) {
            msg = 'Deactivating...'
        } else {
            msg = 'Activating...'
        }
        //notification.notify(msg)
        showOperation('processing', msg)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let guid = loaderData.userProfile.user_guid as string

        const endpoint = "/api/user/activate_deactivate/" + guid
        const url = config.BASE_URL + endpoint

        data["active"] = loaderData.userProfile?.active ? false : true as boolean



        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                let error = response.json().then((data) => {

                    //notification.alertCancel('Error!', data.message)
                    showError('Error', data.message)
                    completeOperation()
                })

            } else {
                //notification.alertReload('Success!', `You are now ${data["active"] ? 'activated' : 'deactivated'}`)
                let message = Boolean(data["active"]) ? 'Activated.' : 'Deactivated.'
                showSuccess('Success', message)

                await new Promise((resolve) => setTimeout(resolve, 1000));
                showOperation('processing', 'Refreshing...')
                await new Promise((resolve) => setTimeout(resolve, 4000));
                window.location.reload()
                completeOperation()

            }

        } catch (error: any) {
            //notification.alertCancel('Error!', error.message)
            console.log(error.message)
            showError('Error', 'Process not completed.')
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
        resolver: zodResolver(DeactivateUserSchema)
    })


    return (
        <form onSubmit={handleSubmit(handleDeactivateUser)}>
            <div className={`${formWrapperClass} mt-0  
                        rounded-lg pt-4 max-w-[500px] w-full mx-auto`}>
                <div className={inputWrapperClass}>
                    <div className=' text-xl text-gray-700 font-semibold border-b pb-1'>
                        {loaderData.userProfile?.active ? 'Deactivate User' : 'Activate User'}

                    </div>
                    <div className=' pt-3 pb-4 text-[13px] leading-5'>
                        <b>{loaderData.userProfile?.email}</b> is your current email. It will be used for password resets or changes.
                    </div>

                    <div className={`mt-[10px]`}></div>

                    <Input
                        controlTitle={"Your Email Address"}
                        controlPlaceholder={"Retype new password"}
                        controlName={"email"}
                        controlType={"text"}
                        disabled={true}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors?.email}
                    />

                    <Button working={working} value={`${loaderData.userProfile?.active ? 'Deactivate' : 'Activate'} Profile`} />
                </div>





            </div>
        </form>
    )
}

export default DeactivateProfileForm
