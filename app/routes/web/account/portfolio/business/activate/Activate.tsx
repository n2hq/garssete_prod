import React, { useEffect, useState } from 'react'
import { useNotification } from '~/context/NotificationContext'
import { useOperation } from '~/context/OperationContext'
import { config, getBusiness, headers } from '~/lib/lib'

const Activate = ({
    userGuid,
    businessGuid
}: any) => {
    const [isActive, setIsActive] = useState<boolean | null>(null)
    const [loading, setLoading] = useState(true)
    const notification = useNotification()
    const [working, setWorking] = useState<boolean>(false)
    const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();

    useEffect(() => {
        try {
            getBusiness(userGuid, businessGuid).then((business) => {
                //alert(JSON.stringify(business))
                setIsActive(business[0].active_status)
                setLoading(false)
            })


        } catch (error: any) {
            console.log('Could not fetch business')
        }

    }, [])

    const toggleBusiness = async () => {
        setWorking(true)
        //notification.notify()
        showOperation('processing', '')

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


            //notification.alertReload('Success', 'Completed!')
            showSuccess('success', 'Operation completed successfully')
            completeOperation()
            await new Promise((resolve) => setTimeout(resolve, 1000));

        } catch (error: any) {
            showError('error', `Error processing: ${error.message}`)
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

            <div className={`p-6  rounded  max-w-2xl
        mx-auto mt-12`}>
                <div className={`mb-6 text-[13.5px] border-b pb-3`}>
                    If you deactivate your data all your data will still be intact, however, it will no longer be visible across all Garssete.com platforms.
                </div>
                <h2 className="text-lg mb-1 font-semibold">
                    {
                        isActive ? 'Deactivate' : 'Activate'
                    }
                    &nbsp;Business or Organization
                </h2>
                <div className={`mb-5`}>
                    {
                        isActive ?
                            'Your data is active. It will be visible across all Garssete.com platforms.' :
                            'Your data is deactivated, it will no longer be visible. However, all your data will still be intact.'
                    }
                </div>
                <div className={`border-[3px] border-gray-100 p-5 rounded-lg shadow`}>
                    <label className={`flex items-center space-x-4 hover:cursor-pointer
                        `}>
                        <input
                            type="checkbox"
                            checked={isActive ?? false}
                            onChange={toggleBusiness}
                            className="w-8 h-8"
                        />

                        <div>
                            <div className={`font-semibold`}>
                                {isActive ? 'Active' : 'Inactive'}</div>
                            <div className={`font-normal text-sm`}>
                                Click to {isActive ? 'deactivate' : 'activate'} this business profile.
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Activate
