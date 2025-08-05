import React, { useEffect, useState } from 'react'
import ComponentTitle from './ComponentTitle';
import { getOperatingHours } from '~/lib/lib';
import { UserProfile } from '~/lib/types';


const hours = [
    {
        day: "Mon",
        hours: "7:00am - 5:00pm"
    },
    {
        day: "Tue",
        hours: "7:00am - 5:00pm"
    },
    {
        day: "Wed",
        hours: "7:00am - 5:00pm"
    },
    {
        day: "Thu",
        hours: "7:00am - 5:00pm"
    },
    {
        day: "Fri",
        hours: "7:00am - 5:00pm"
    },
    {
        day: "Sat",
        hours: "7:00am - 5:00pm",
        status: "Closed"
    },
    {
        day: "Sun",
        hours: "7:00am - 5:00pm"
    },
]



const LocationWithHours = ({ listing }: any) => {
    const [dense, setDense] = React.useState(true);
    const [secondary, setSecondary] = React.useState(false);
    const [businessGuid, setBusinessGuid] = useState('')
    const [userGuid, setUserGuid] = useState('')
    const [operatingHours, setOperatingHours] = useState<any | undefined>(undefined)
    const [opHours, setOpHours] = useState<any>(null)
    const [openStatus, setopenStatus] = useState('')


    useEffect(() => {
        if (listing) {
            setBusinessGuid(listing?.gid)
            setUserGuid(listing?.owner)
        }
    }, [listing])

    const constructHours = (operatingHours: any) => {
        const opHours = []
        setopenStatus(operatingHours?.open_status)

        opHours.push({
            day: "Mon",
            hours: `${operatingHours.monday_from} - ${operatingHours.monday_to}`
        })
        opHours.push({
            day: "Tue",
            hours: `${operatingHours.tuesday_from} - ${operatingHours.tuesday_to}`
        })
        opHours.push({
            day: "Wed",
            hours: `${operatingHours.wednesday_from} - ${operatingHours.wednesday_to}`
        })
        opHours.push({
            day: "Thu",
            hours: `${operatingHours.thursday_from} - ${operatingHours.thursday_to}`
        })
        opHours.push({
            day: "Fri",
            hours: `${operatingHours.friday_from} - ${operatingHours.friday_to}`
        })
        opHours.push({
            day: "Sat",
            hours: `${operatingHours.saturday_from} - ${operatingHours.saturday_to}`
        })

        opHours.push({
            day: "Sun",
            hours: `${operatingHours.sunday_from} - ${operatingHours.sunday_to}`
        })
        setOpHours(opHours)
    }

    useEffect(() => {
        const getOpHours = async (businessGuid: string, userGuid: string) => {
            const operatingHours = await getOperatingHours(businessGuid, userGuid)
            return operatingHours
        }
        if (businessGuid && userGuid) {
            getOpHours(businessGuid, userGuid).then((data) => {

                console.log(data)
                constructHours(data)
                //setOperatingHours(data)
            })

        }
    }, [businessGuid, userGuid])
    return (
        <div className='mt-12'>
            <ComponentTitle title='Location and Hours' />

            <div className=' '>
                <div className={`grid grid-cols-1 md:grid-cols-12 gap-5
                    `}>
                    <div className='col-span-6'>
                        <div className=' relative w-full h-[150px] border-[1px] border-gray-300'>
                            <img
                                className=' object-cover w-full h-full'
                                src="/images/mapicon.jpeg" alt=""
                            />
                        </div>
                        <div className=' grid grid-cols-2 gap-6 mt-3'>
                            <div>
                                1919 Mission St
                                San Francisco, CA 94103
                                16th St & 15th St
                                Mission
                            </div>
                            <div>
                                <button className='w-[100%] bg-gray-100 border-[1px] border-gray-300'>
                                    <div className='text-[14px]  font-sans font-bold text-black  py-1 '>
                                        Get Directions
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`col-span-6`}>
                        <div className={``}>
                            {
                                openStatus === "no_hours" || openStatus === "" &&
                                <div>
                                    No hours selected.
                                </div>
                            }
                            {
                                openStatus === "always_open" &&
                                <div>
                                    Business is always open
                                </div>
                            }
                            {
                                openStatus === "permanently_closed" &&
                                <div>
                                    Permanently Closed
                                </div>
                            }
                            {
                                openStatus === "temporarily_closed" &&
                                <div>
                                    Temporarily Closed
                                </div>
                            }
                            {
                                opHours !== null && openStatus === "selected_hours" &&
                                <ul className={`w-full divide-y-[1px] md:divide-none`}>
                                    {
                                        opHours?.map((item: any, index: number) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className={`w-full`}
                                                >
                                                    <div className={`grid grid-cols-12 py-2 `}>
                                                        <div className={` col-span-2 flex flex-col
                                                        place-items-start`}>
                                                            {item?.day}
                                                        </div>
                                                        <div className={`flex flex-row col-span-10
                                                    place-items-end place-content-end md:place-content-start gap-3`}
                                                        >
                                                            <span>
                                                                {item?.hours}
                                                            </span>
                                                            <span>
                                                                {/* {item?.status} */}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationWithHours

