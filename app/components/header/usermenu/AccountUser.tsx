import { Link } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { BiImage, BiUser } from 'react-icons/bi'
import { IoImage } from 'react-icons/io5'
import { useAuth } from '~/context/AuthContext'
import { config, getUserProfile, getUserProfileImageData } from '~/lib/lib'

const AccountUser = () => {
    const auth = useAuth()
    if (!auth) { return null }
    const { user } = auth
    const [name, setName] = useState('')
    const [userProfileImgData, setUserProfileImgData] = useState<any | null>(null)

    useEffect(() => {
        setName(user?.first_name + ' ' + user?.last_name)

    }, [user])

    useEffect(() => {

        const getUserImageData = async (guid: string) => {
            const userProfile: any = await getUserProfileImageData(guid)
            setUserProfileImgData(userProfile)
            //console.log(userProfile?.image_url)
        }

        if (user?.guid !== null) {

            getUserImageData(user?.guid)
        }
    }, [user])
    return (
        <Link to={`/web/account/profile`}>
            <div className={`flex hover:bg-gray-100 px-[10px] py-[5px] 
        hover:cursor-pointer gap-2 place-items-center`}>
                <div className={` relative h-[30px] w-[30px] rounded-full
                    overflow-hidden flex place-content-center place-items-center
                    bg-white`}>
                    {
                        userProfileImgData?.image_url ?
                            <img
                                className={`object-cover w-full h-full`}
                                src={
                                    config.IMG_BASE_URL + userProfileImgData?.image_url
                                }
                                alt=""
                            /> :
                            <BiUser className={`object-cover w-[70%] h-[70%]`} />
                    }

                </div>
                <div className={`truncate text-[13px] inline-block
                    text-gray-500`}>
                    {name}
                </div>
            </div>
        </Link>

    )
}

export default AccountUser
