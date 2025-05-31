import React, { useEffect, useState } from 'react'
import { useNotification } from '~/context/NotificationContext'
import { config, getBusiness, headers } from '~/lib/lib'

const Activate = ({
    userGuid,
    businessGuid
}: any) => {
    const [isActive, setIsActive] = useState<boolean | null>(null)
    const [loading, setLoading] = useState(true)
    const notification = useNotification()
    const [working, setWorking] = useState<boolean>(false)

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

            <div className={`p-6  rounded  max-w-lg
        mx-auto mt-12`}>
                <h2 className="text-lg mb-4 font-semibold">
                    {
                        isActive ? 'Deactivate' : 'Activate'
                    }
                    &nbsp;Business
                </h2>
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
                                Click to {isActive ? 'deactivate' : 'activate'} the business profile. Once deactivated, it will no longer be visible
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Activate
